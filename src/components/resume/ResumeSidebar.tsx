import React from "react";
import { SectionHeading } from "./SectionHeading";
import { LanguageItem } from "./LanguageItem";
import { Skills } from "./Skills";
import { Education, Language, Skill, SkillCategory } from "../../types/resume";
import { SkillCategories } from "./SkillCategories";

interface ResumeSidebarProps {
  data: {
    level_of_experience: Skill[];
    education: Education[];
    languages: Language[];
    skills?: SkillCategory[];
  };
}

export const ResumeSidebar: React.FC<ResumeSidebarProps> = ({ data }) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-stretch text-[9px] text-black font-light whitespace-nowrap justify-center py-[11px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d814df40633154ebb9cb633f5106940a46c814d?placeholderIfAbsent=true"
          className="aspect-[3.62] object-contain w-[87px]"
          alt="Company logo"
        />
        <div className="mt-1.5">
          sales@oxagile.com
        </div>
      </div>
      <div className="w-full mt-5">
        <div className="w-full font-normal">
          <SectionHeading>LEVEL OF EXPERIENCE</SectionHeading>
          <Skills skills={data.level_of_experience} />
        </div>
        
        {data.skills && data.skills.length > 0 && (
          <div className="w-full mt-6">
            <SectionHeading>OTHER SKILLS</SectionHeading>
            <div className="w-full text-black mt-2">
              <SkillCategories categories={data.skills} />
            </div>
          </div>
        )}
        
        <div className="w-full mt-6">
          <SectionHeading>EDUCATION</SectionHeading>
          <div className="w-full text-black mt-2">
            {data.education.map((edu, index) => (
              <div key={index} className="mt-2 first:mt-0">
                <div className="text-[9px] font-semibold">
                  {edu.degree}
                </div>
                <div className="text-[8px] font-normal mt-1">
                  {edu.institution}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full whitespace-nowrap mt-6">
          <SectionHeading>LANGUAGES</SectionHeading>
          <div className="w-full text-[8px] text-black mt-2">
            {data.languages.map((lang, index) => (
              <LanguageItem 
                key={index}
                language={lang.language} 
                level={lang.level} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 