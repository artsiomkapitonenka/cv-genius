"use client";

import React, { useState } from "react";
import { ResumeLayout } from "../../components/resume/ResumeLayout";
import { useResumeData } from "../../hooks/useResumeData";
import Link from "next/link";
import { ResumePDFDownloadLink, ResumePDFViewer } from "../../components/pdf/ResumePDF";
import "../../styles/pdf.css";

export default function ResumePage() {
  const { data, loading } = useResumeData();
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:p-0">
      <div className="container mx-auto max-w-6xl px-4 print:px-0 print:max-w-none">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <h1 className="text-2xl font-bold">Резюме - Шаблон</h1>
          <div className="flex gap-4">
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Вернуться на главную
            </Link>
            {showPdfPreview ? (
              <button
                onClick={() => setShowPdfPreview(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Закрыть предпросмотр PDF
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowPdfPreview(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Предпросмотр PDF
                </button>
                <ResumePDFDownloadLink data={data} />
              </>
            )}
          </div>
        </div>
        
        {showPdfPreview ? (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <ResumePDFViewer data={data} />
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden shadow-lg print:shadow-none">
            <ResumeLayout data={data} />
          </div>
        )}
      </div>
    </div>
  );
} 