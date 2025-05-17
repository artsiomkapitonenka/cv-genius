import React from "react";
import { Project } from "../../types/resume";
import { BulletPoint } from "./BulletPoint";

interface ProjectExperienceProps {
  project: Project;
}

export const ProjectExperience: React.FC<ProjectExperienceProps> = ({ project }) => {
  return (
    <article className="w-full text-[8px] text-black break-words leading-[1.5]">
      <h3 className="text-[10px] font-semibold leading-tight">
        {project.title}
      </h3>
      
      <div className="w-full mt-2">
        <h4 className="font-semibold leading-tight">Project Overview</h4>
        <p className="font-normal mt-1 leading-[1.5]">
          {project.description}
        </p>
      </div>
      
      <div className="w-full mt-2">
        <h4 className="font-semibold leading-tight">Position</h4>
        <p className="font-normal mt-1 leading-[1.5]">
          {project.position}
        </p>
      </div>
      
      <div className="w-full mt-2">
        <h4 className="font-semibold leading-tight">Team Size</h4>
        <p className="font-normal mt-1 leading-[1.5]">
          {project.team_size}
        </p>
      </div>
      
      <div className="w-full mt-2">
        <h4 className="font-semibold leading-tight">Responsibilities</h4>
        <div className="w-full font-normal mt-1">
          {project.responsibilities.map((responsibility, index) => (
            <BulletPoint key={index}>
              {responsibility}
            </BulletPoint>
          ))}
        </div>
      </div>
      
      <div className="w-full mt-2">
        <h4 className="font-semibold leading-tight">Key Technologies</h4>
        <p className="font-normal mt-1 leading-[1.5]">
          {project.technologies.join(", ")}
        </p>
      </div>
    </article>
  );
}; 