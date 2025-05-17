import React from "react";

interface LanguageItemProps {
  language: string;
  level: string;
}

export const LanguageItem: React.FC<LanguageItemProps> = ({ 
  language, 
  level 
}) => {
  return (
    <div className="w-full mt-1.5 first:mt-0 flex justify-between items-center">
      <div className="font-normal leading-tight">{language}</div>
      <div className="font-medium leading-tight">{level}</div>
    </div>
  );
}; 