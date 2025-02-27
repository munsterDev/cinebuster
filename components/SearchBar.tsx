"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce"; // Debounce function for performance
import Image from "next/image";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // Fetch search results from TMDB API
  const fetchResults = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?query=${searchQuery}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Debounced search function
  const handleSearch = debounce((searchQuery: string) => {
    fetchResults(searchQuery);
  }, 300); // Debounce by 300ms

  useEffect(() => {
    handleSearch(query);
    return () => handleSearch.cancel();
  }, [query]);

  return (
    <div className="relative w-full max-w-lg">
      {/* Search Input */}
      <div className="flex items-center bg-[#33312E] border border-border rounded-md px-4 py-2 text-white focus-within:ring-2 focus-within:ring-primary">
        <input className="h-5 w-5 text-[#C5E03E]" />
        <input
          type="text"
          placeholder="Search movies, TV shows..."
          className="bg-transparent flex-1 outline-none px-3 text-white placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {/* Search Suggestions */}
      {isFocused && results.length > 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-[#33312E] border border-border rounded-md shadow-lg">
            <div className="max-h-[50vh] overflow-y-auto">
            <div className="p-2">
                {results.map((item: any) => (
                <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#44413D] cursor-pointer"
                    onMouseDown={() => router.push(`/details/${item.id}`)}
                >
                    <Image
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-12 h-18 rounded-md"
                    fill
                    />
                    <p className="text-white text-sm">{item.title || item.name}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default SearchBar;