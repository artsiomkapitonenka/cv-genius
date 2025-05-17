import React from "react";
import { Skill } from "../../types/resume";

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="w-full mt-2">
      {skills.map((skill, index) => (
        <div key={index} className="flex w-full gap-1 justify-center mt-1 items-center">
          <div className="text-black text-[8px] flex-1 shrink basis-[0%] leading-tight">
            {skill.name}
          </div>
          <div className="text-[#c1272d] text-[7px] tracking-[4.2px] leading-tight">
            {Array.from({ length: 5 }).map((_, i) => (
              <span 
                key={i} 
                style={{ color: i < skill.rating ? "rgba(193,39,45,1)" : "rgba(214,214,214,1)" }}
              >
                ●
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 