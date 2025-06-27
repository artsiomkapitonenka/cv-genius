import React from 'react';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function Textarea({ placeholder, value, onChange, className }: TextareaProps) {
  const baseClassName = "w-full border px-3 py-2 rounded min-h-[100px]";
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;
  
  return (
    <textarea
      className={combinedClassName}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
