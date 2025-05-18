"use client";

import React, { useState } from "react";
import { ResumeLayout } from "../../components/resume/ResumeLayout";
import { useResumeData } from "../../hooks/useResumeData";
import Link from "next/link";
import { ResumePDFDownloadLink, ResumePDFViewer } from "../../components/pdf/ResumePDF";
import "../../styles/pdf.css";
import { useSearchParams } from "next/navigation";

// Компонент загрузки с анимацией
const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute w-full h-full border-8 border-gray-200 rounded-full"></div>
      <div className="absolute w-full h-full border-8 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-blue-600 z-10" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
    </div>
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating Resume</h2>
      <p className="text-gray-500 text-center max-w-md mb-4">
        We&apos;re using AI to create a personalized resume based on your profile. This may take a few moments.
      </p>
      <div className="flex space-x-3 mt-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  </div>
);

export default function ResumePage() {
  const { data, loading } = useResumeData();
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const searchParams = useSearchParams();
  
  // Получаем все параметры из URL для сохранения их в localStorage
  const model = searchParams?.get("model") || "openai";
  const ndaSafe = searchParams?.get("ndaSafe") || "true";
  const industry = searchParams?.get("industry") || "";
  const clientFocus = searchParams?.get("clientFocus") || "";
  const language = searchParams?.get("language") || "en";
  const style = searchParams?.get("style") || "Technical";
  
  // Формируем URL возврата с сохранением параметров
  const backUrl = `/?model=${model}&ndaSafe=${ndaSafe}&industry=${industry}&clientFocus=${encodeURIComponent(clientFocus || "")}&language=${language}&style=${style}`;
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:p-0">
      <div className="container mx-auto max-w-6xl px-4 print:px-0 print:max-w-none">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <h1 className="text-2xl font-bold">Resume - Template</h1>
          <div className="flex gap-4">
            <Link 
              href={backUrl} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
            {showPdfPreview ? (
              <button
                onClick={() => setShowPdfPreview(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Close PDF Preview
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowPdfPreview(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  PDF Preview
                </button>
                <ResumePDFDownloadLink />
              </>
            )}
          </div>
        </div>
        
        {showPdfPreview ? (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <ResumePDFViewer data={data} />
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden print:shadow-none">
            <ResumeLayout data={data} />
          </div>
        )}
      </div>
    </div>
  );
} 