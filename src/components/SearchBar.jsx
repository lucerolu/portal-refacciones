// src/components/SearchBar.jsx
export default function SearchBar({ value, onChange, placeholder = "Buscar…" }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:ring-green-200"
    />
  );
}
