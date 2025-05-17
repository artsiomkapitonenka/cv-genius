import React from "react";
import { SkillCategory } from "../../types/resume";

interface SkillCategoriesProps {
  categories: SkillCategory[];
}

export const SkillCategories: React.FC<SkillCategoriesProps> = ({ categories }) => {
  return (
    <div className="w-full">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mt-2 first:mt-0">
          <div className="text-[9px] font-semibold">
            {category.category}
          </div>
          <div className="text-[8px] font-normal mt-1 leading-[1.5]">
            {category.items.join(", ")}
          </div>
        </div>
      ))}
    </div>
  );
}; 