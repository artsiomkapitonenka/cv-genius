"use client";

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
  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [showParameters, setShowParameters] = useState(false);
  
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
      console.error("Error loading parameters:", error);
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

  // Обработчик для создания CV
  const handleCreateCV = (userId: number) => {
    const url = `/resume?userId=${userId}&ndaSafe=${ndaSafe}&industry=${encodeURIComponent(industry)}&clientFocus=${encodeURIComponent(clientFocus)}&language=${language}&style=${style}&model=${model}`;
    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">CVGenius</h1>
          <button 
            onClick={() => setShowParameters(!showParameters)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {showParameters ? "Hide Parameters" : "Show Parameters"}
          </button>
        </header>

        {showParameters && (
          <div className="bg-white border border-blue-200 p-6 rounded-lg shadow-md mb-6 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              AI Model Parameters
            </h2>

            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              <label className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={ndaSafe}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNdaSafe(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>NDA Safe Mode</span>
              </label>

              <label className="block text-gray-700 font-medium">
                Client Industry
                <select
                  value={industry}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIndustry(e.target.value)}
                  className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                >
                  <option value="">Select industry</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-gray-700 font-medium">
                CV Language
                <select
                  value={language}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
                  className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                >
                  <option value="en">English</option>
                  <option value="ru">Russian</option>
                </select>
              </label>

              <label className="block text-gray-700 font-medium">
                Resume Style
                <select
                  value={style}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStyle(e.target.value)}
                  className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                >
                  <option value="Technical">Technical</option>
                  <option value="Sales-Oriented">Sales-Oriented</option>
                </select>
              </label>
              
              <label className="block text-gray-700 font-medium">
                AI Model
                <select
                  value={model}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setModel(e.target.value)}
                  className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                >
                  <option value="openai">OpenAI</option>
                  <option value="deepseek">DeepSeek</option>
                </select>
              </label>

              <label className="block col-span-full text-gray-700 font-medium">
                Client Priorities
                <Textarea
                  value={clientFocus}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setClientFocus(e.target.value)}
                  placeholder="AWS, Team Lead, Healthcare"
                  className="mt-1 w-full transition-colors hover:border-blue-400"
                />
              </label>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Resumes</h2>
            <button 
              disabled
              className="inline-flex items-center justify-center bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed opacity-70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Import from Excel</span>
            </button>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-blue-50 transition-colors ${activeUserId === index + 1 ? 'bg-blue-50' : ''}`}
                    onClick={() => setActiveUserId(index + 1)}
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name || `User #${index + 1}`}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.position}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateCV(index + 1);
                        }}
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Create CV
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
