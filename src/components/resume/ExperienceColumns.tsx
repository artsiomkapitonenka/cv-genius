import React from "react";

interface ExperienceColumnsProps {
  left: string;
  right: string;
}

export const ExperienceColumns: React.FC<ExperienceColumnsProps> = ({ left, right }) => {
  return (
    <div className="flex text-[8px] mb-1 last:mb-0">
      <div className="font-semibold min-w-[60px] sm:min-w-[80px]">
        {left}:
      </div>
      <div className="font-normal">
        {right}
      </div>
    </div>
  );
}; 