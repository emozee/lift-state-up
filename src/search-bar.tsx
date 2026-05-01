type SearchBarProps = Readonly<{ value: string; onChange: (v: string) => void }>;

// Added 'export' here to match the { SearchBar } import
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
      placeholder="Search GMC events..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}