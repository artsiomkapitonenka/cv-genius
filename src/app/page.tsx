"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import users from "@/data/users.json";
import Textarea from "@/app/ui/Textarea";
import { useSearchParams } from "next/navigation";

const industryOptions = [
  "Fintech",
  "E-commerce",
  "Healthcare",
  "Education",
  "Media",
  "Travel",
  "Telecom",
  "Real Estate",
  "Government",
];

// Типы параметров для localStorage
interface CustomParameters {
  ndaSafe: boolean;
  industry: string;
  clientFocus: string;
  language: string;
  style: string;
  model: string;
}

// Ключ для хранения в localStorage
const STORAGE_KEY = "cv-genius-parameters";

export default function Home() {
  const searchParams = useSearchParams();

  // Инициализация состояний с дефолтными значениями для избежания проблем с гидрацией
  const [ndaSafe, setNdaSafe] = useState(true);
  const [industry, setIndustry] = useState("");
  const [clientFocus, setClientFocus] = useState("");
  const [language, setLanguage] = useState("en");
  const [style, setStyle] = useState("Technical");
  const [model, setModel] = useState("openai");
  
  // Загрузка сохраненных настроек после монтирования (только на клиенте)
  useEffect(() => {
    // Загрузка из localStorage
    try {
      const savedParams = localStorage.getItem(STORAGE_KEY);
      if (savedParams) {
        const params = JSON.parse(savedParams) as CustomParameters;
        setNdaSafe(params.ndaSafe);
        setIndustry(params.industry);
        setClientFocus(params.clientFocus);
        setLanguage(params.language);
        setStyle(params.style);
        setModel(params.model);
      }
    } catch (error) {
      console.error("Ошибка при загрузке параметров:", error);
    }
    
    // Затем проверяем URL-параметры (они имеют приоритет)
    if (searchParams) {
      const modelParam = searchParams.get("model");
      const ndaSafeParam = searchParams.get("ndaSafe");
      const industryParam = searchParams.get("industry");
      const clientFocusParam = searchParams.get("clientFocus");
      const languageParam = searchParams.get("language");
      const styleParam = searchParams.get("style");

      if (modelParam) setModel(modelParam);
      if (ndaSafeParam) setNdaSafe(ndaSafeParam === "true");
      if (industryParam) setIndustry(industryParam);
      if (clientFocusParam) setClientFocus(clientFocusParam);
      if (languageParam) setLanguage(languageParam);
      if (styleParam) setStyle(styleParam);
    }
  }, [searchParams]); // searchParams как зависимость

  // Сохранение параметров в localStorage при их изменении
  useEffect(() => {
    const params: CustomParameters = {
      ndaSafe,
      industry,
      clientFocus,
      language,
      style,
      model
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  }, [ndaSafe, industry, clientFocus, language, style, model]);

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">CVGenius</h1>

        <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-lg mb-1">
                  {user.name || `User #${index + 1}`}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{user.position}</p>
                <Link
                  href={`/resume?userId=${index + 1}&ndaSafe=${ndaSafe}&industry=${encodeURIComponent(industry)}&clientFocus=${encodeURIComponent(clientFocus)}&language=${language}&style=${style}&model=${model}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Create CV
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-blue-200 p-8 rounded-2xl mt-10 ring-blue-100">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            Custom Parameters
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex items-center gap-3 text-gray-700">
              <input
                type="checkbox"
                checked={ndaSafe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNdaSafe(e.target.checked)}
              />
              NDA Safe Mode
            </label>

            <label className="block text-gray-700 font-medium">
              Client Industry:
              <select
                value={industry}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIndustry(e.target.value)}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select industry</option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block col-span-2 text-gray-700 font-medium">
              Client Priorities:
              <Textarea
                value={clientFocus}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setClientFocus(e.target.value)}
                placeholder="AWS, Team Lead, Healthcare"
                className="mt-1"
              />
            </label>

            <label className="block text-gray-700 font-medium">
              Language:
              <select
                value={language}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="ru">Russian</option>
              </select>
            </label>

            <label className="block text-gray-700 font-medium">
              Resume Style:
              <select
                value={style}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStyle(e.target.value)}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Technical">Technical</option>
                <option value="Sales-Oriented">Sales-Oriented</option>
              </select>
            </label>
            
            <label className="block text-gray-700 font-medium">
              AI Model:
              <select
                value={model}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setModel(e.target.value)}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="openai">OpenAI</option>
                <option value="deepseek">DeepSeek</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
