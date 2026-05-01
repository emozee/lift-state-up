import { useState, useEffect } from "react";
import { Card } from "./card"; // Ensure your Card component is in src/card.tsx

// 1. Define the Type
export type GmcEvent = Readonly<{ id: number; title: string; date: string }>;

// --- SUB-COMPONENT: SearchBar ---
type SearchBarProps = Readonly<{ value: string; onChange: (v: string) => void }>;

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="w-full bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 px-4 py-3 outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:text-gray-400"
      placeholder="Search GMC events..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// --- MAIN COMPONENT: EventsTracker ---
export function EventsTracker() {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<GmcEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Data from JSONPlaceholder (Class 07)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // We take the first 10 posts and format them to match GmcEvent
        const formatted = data.slice(0, 10).map((p: any) => ({
          id: p.id,
          title: p.title,
          date: "MAY 2026", 
        }));
        setEvents(formatted);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  // 3. Compute Filtered List
  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  const bhutanStyle = {
    backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.9), rgba(20, 20, 20, 0.95)), url('https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed' as const,
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#141414] text-red-600 font-bold">
      FETCHING LIVE DATA...
    </div>
  );

  return (
    <div style={bhutanStyle} className="min-h-screen w-full flex flex-col items-center pt-20 px-4 font-sans">
      <div className="max-w-xl w-full">
        <header className="mb-10">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">
            GMC<span className="text-red-600 not-italic">.</span>CORE
          </h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-2">
            Gelephu Mindfulness City
          </p>
        </header>

        {/* 4. Search Box with Clear Button */}
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <button 
            onClick={() => setQuery("")}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black transition-all uppercase shadow-lg shadow-red-900/20"
          >
            Clear
          </button>
        </div>

        {/* 5. Event Counter */}
        <div className="mt-8 mb-4 px-2 flex justify-between items-center">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            {filtered.length} of {events.length} events found
          </p>
          <div className="h-px flex-1 bg-white/5 mx-4"></div>
        </div>

        {/* 6. Event List using Card Component */}
        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <p className="text-center py-10 text-gray-600 italic">No matches for "{query}"</p>
          ) : (
            filtered.map((e) => (
              <Card key={e.id}>
                <div className="p-6 bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-red-600/50 transition-all cursor-pointer">
                  <span className="text-red-600 text-[10px] font-black tracking-widest">{e.date}</span>
                  <h3 className="text-lg font-bold text-white mt-1 capitalize">{e.title}</h3>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}