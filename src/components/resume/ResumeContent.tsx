import React from "react";
import { SectionHeading } from "./SectionHeading";
import { BulletPoint } from "./BulletPoint";
import { Candidate, Project } from "../../types/resume";
import { ProjectExperience } from "./ProjectExperience";

interface ResumeContentProps {
  data: {
    candidate: Candidate;
    overview: string[];
    projects: Project[];
  };
}

export const ResumeContent: React.FC<ResumeContentProps> = ({ data }) => {
  return (
    <div className="w-full flex-1 shrink basis-[0%] overflow-hidden">
      <header className="flex w-full flex-col items-stretch text-black font-light justify-center">
        <h1 className="text-[32px] leading-[1.2] break-words">
          {data.candidate.name}
        </h1>
        <h2 className="text-[15px] leading-loose mt-1.5 break-words">
          {data.candidate.grade}
        </h2>
      </header>
      
      <section className="w-full mt-[30px]">
        <SectionHeading>CANDIDATE&apos;S OVERVIEW</SectionHeading>
        <div className="w-full text-[8px] text-black font-normal mt-3 break-words leading-[1.5]">
          {data.overview.map((item, index) => (
            <BulletPoint key={index}>
              {item}
            </BulletPoint>
          ))}
        </div>
      </section>
      
      <section className="w-full mt-[30px]">
        <SectionHeading>PROFESSIONAL EXPERIENCE</SectionHeading>
        <div className="mt-3">
          {data.projects.map((project, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <ProjectExperience project={project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}; 