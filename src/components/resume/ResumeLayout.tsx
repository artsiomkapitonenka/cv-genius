import React from "react";
import { ResumeSidebar } from "./ResumeSidebar";
import { ResumeContent } from "./ResumeContent";
import { ResumeData } from "../../types/resume";

interface ResumeLayoutProps {
  data: ResumeData;
}

export const ResumeLayout: React.FC<ResumeLayoutProps> = ({ data }) => {
  return (
    <article className="bg-white relative flex items-stretch gap-2.5 pl-6 pr-10 py-8 shadow-md max-w-[1100px] mx-auto print:shadow-none print:max-w-none print:mx-0 pdf-container">
      {/* Фоновый элемент */}
      <div className="bg-[rgba(248,248,248,1)] absolute z-0 w-[207px] h-full left-0 bottom-0 pdf-sidebar" aria-hidden="true" />
      
      <div className="z-10 flex items-stretch gap-10 h-full w-full pdf-content">
        <aside className="w-[160px] shrink-0">
          <ResumeSidebar 
            data={{
              level_of_experience: data.level_of_experience,
              education: data.education,
              languages: data.languages,
              skills: data.skills
            }} 
          />
        </aside>
        <main className="flex-1 w-full">
          <ResumeContent 
            data={{
              candidate: data.candidate,
              overview: data.overview,
              projects: data.projects
            }} 
          />
        </main>
      </div>
    </article>
  );
}; 