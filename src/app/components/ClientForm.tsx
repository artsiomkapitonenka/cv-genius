"use client";

import { useState } from "react";
import Input from "@/app/ui/Input";
import Textarea from "@/app/ui/Textarea";
import Button from "@/app/ui/Button";

export default function ClientForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSendPrompt = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Тестовый Prompt к GPT</h1>
      <Textarea
        placeholder="Введите ваш запрос к GPT..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleSendPrompt}>Отправить</Button>

      {response && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <h2 className="font-semibold mb-2">Ответ GPT:</h2>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  );
}
