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

  const [data, setData] = useState<ResumeData>(sampleResumeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
        }),
      });

      const raw = (await chatGPTResponse.json())?.result;
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const data = JSON.parse(cleaned);

      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const updateData = (newData: Partial<ResumeData>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return { data, loading, error, updateData };
};
