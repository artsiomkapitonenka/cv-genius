"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "../types/resume";
import { sampleResumeData } from "../data/sampleResumeData";
import { useSearchParams } from "next/navigation";

export const useResumeData = () => {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId");
  const ndaSafe = searchParams?.get("ndaSafe");
  const industry = searchParams?.get("industry");
  const clientFocus = searchParams?.get("clientFocus");
  const language = searchParams?.get("language");
  const style = searchParams?.get("style");
  const model = searchParams?.get("model") || "openai";

  const [data, setData] = useState<ResumeData>(sampleResumeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`/api/user/${userId}`, {
          method: "GET",
        });
        const user = await userResponse.json();

        const chatGPTResponse = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Generate a resume for the following user: ${JSON.stringify(
              user
            )} based on this structure: ${JSON.stringify(
              sampleResumeData
            )}. Include these additional requirements:
              Parameters:
              - NDA Safe Mode: ${
                ndaSafe === "true" ? "Yes" : "No"
              }: with No use Company Name as a project title and for Yes replace company name with NDA.
              - Client Industry: ${industry || "Not specified"}
              - Client Priorities: ${clientFocus || "Not specified"}
              - Language: ${language}
              - Resume Style: ${style}

             Return only valid JSON with all fields`,
            model: model,
          }),
        });

        if (!chatGPTResponse.ok) {
          throw new Error(`API returned an error: ${chatGPTResponse.status}`);
        }

        const apiResponse = await chatGPTResponse.json();
        
        if (!apiResponse?.result) {
          throw new Error("Invalid API response format");
        }
        
        const raw = apiResponse.result;
        const cleaned = raw.replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(cleaned);

        setData(parsedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        
        // Keep sample data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, ndaSafe, industry, clientFocus, language, style, model]);

  const updateData = (newData: Partial<ResumeData>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return { data, loading, error, updateData };
};
