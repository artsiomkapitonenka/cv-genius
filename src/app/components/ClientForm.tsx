"use client";

import { useState, ChangeEvent } from "react";
import Textarea from "@/app/ui/Textarea";
import Button from "@/app/ui/Button";

export default function ClientForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      setError("Пожалуйста, введите запрос");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || `Ошибка: ${res.status} ${res.statusText}`);
        setResponse("");
      } else {
        setResponse(data.result);
      }
    } catch (err) {
      console.error("Error sending prompt:", err);
      setError("Ошибка при отправке запроса. Проверьте консоль для деталей.");
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Тестовый Prompt к GPT</h1>
      <Textarea
        placeholder="Введите ваш запрос к GPT..."
        value={prompt}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
      />
      <Button onClick={handleSendPrompt} disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Отправить"}
      </Button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-xl">
          <h2 className="font-semibold mb-2">Ошибка:</h2>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="font-semibold mb-2">Ответ GPT:</h2>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  );
}
