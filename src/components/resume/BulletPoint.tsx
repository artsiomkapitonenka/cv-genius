import React from "react";

interface BulletPointProps {
  children: React.ReactNode;
}

export const BulletPoint: React.FC<BulletPointProps> = ({ children }) => {
  return (
    <div className="flex w-full items-start gap-1.5 mt-1.5 first:mt-0">
      <div className="flex-shrink-0 text-[8px] text-[rgba(193,39,45,1)]">—</div>
      <div className="flex-1 leading-[1.5]">
        {children}
      </div>
    </div>
  );
}; 