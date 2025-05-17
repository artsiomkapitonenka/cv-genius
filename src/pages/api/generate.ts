import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt } = req.body;

    const deepseekRes = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await deepseekRes.json();

    // Проверка успешности ответа
    if (!deepseekRes.ok) {
      console.error("DeepSeek API error:", data.error || deepseekRes.statusText);
      return res.status(deepseekRes.status).json({
        error: data.error?.message || "Ошибка при обращении к DeepSeek API",
      });
    }

    // Проверка наличия данных
    if (!data.choices || !data.choices[0]) {
      console.error("Unexpected API response structure:", data);
      return res
        .status(500)
        .json({ error: "Неожиданная структура ответа API" });
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("Error in DeepSeek API handler:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
}
