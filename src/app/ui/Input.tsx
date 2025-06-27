import React from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      type="text"
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
