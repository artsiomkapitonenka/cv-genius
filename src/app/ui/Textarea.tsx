export default function Textarea({ placeholder, value, onChange }: any) {
  return (
    <textarea
      className="w-full border px-3 py-2 rounded min-h-[100px]"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
