"use client";

import React from "react";
import { ResumeLayout } from "../../components/resume/ResumeLayout";
import { useResumeData } from "../../hooks/useResumeData";
import Link from "next/link";

export default function ResumePage() {
  const { data, loading } = useResumeData();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Резюме - Шаблон</h1>
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <ResumeLayout data={data} />
        </div>
      </div>
    </div>
  );
} 