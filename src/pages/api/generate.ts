import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt, model = "openai" } = req.body;

    if (model === "openai") {
      const openaiRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        }
      );

      const data = await openaiRes.json();

      // Check response success
      if (!openaiRes.ok) {
        console.error("OpenAI API error:", data.error || openaiRes.statusText);
        return res.status(openaiRes.status).json({
          error: data.error?.message || "Error accessing OpenAI API",
        });
      }

      // Check if data exists
      if (!data.choices || !data.choices[0]) {
        console.error("Unexpected API response structure:", data);
        return res
          .status(500)
          .json({ error: "Unexpected API response structure" });
      }

      res.status(200).json({ result: data.choices[0].message.content });
    } else if (model === "deepseek") {
      const deepseekRes = await fetch(
        "https://api.deepseek.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        }
      );

      const data = await deepseekRes.json();

      // Check response success
      if (!deepseekRes.ok) {
        console.error("DeepSeek API error:", data.error || deepseekRes.statusText);
        return res.status(deepseekRes.status).json({
          error: data.error?.message || "Error accessing DeepSeek API",
        });
      }

      // Check if data exists (assuming DeepSeek has similar format)
      if (!data.choices || !data.choices[0]) {
        console.error("Unexpected API response structure:", data);
        return res
          .status(500)
          .json({ error: "Unexpected API response structure" });
      }

      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      return res.status(400).json({ error: "Unsupported model" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
