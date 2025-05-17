import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <div className="w-full text-[7px] text-[rgba(193,39,45,1)] font-bold uppercase tracking-[0.98px] py-[3px] leading-tight">
      {children}
    </div>
  );
}; 