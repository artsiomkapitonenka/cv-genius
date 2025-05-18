"use client";

import React, { useState } from "react";
import { ResumeLayout } from "../../components/resume/ResumeLayout";
import { useResumeData } from "../../hooks/useResumeData";
import Link from "next/link";
import { ResumePDFDownloadLink, ResumePDFViewer } from "../../components/pdf/ResumePDF";
import "../../styles/pdf.css";
import { useSearchParams } from "next/navigation";

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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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