export default function Input({ placeholder, value, onChange }: any) {
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
