"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  onSearch,
  placeholder = "Search for schemes, departments, or information...",
  className = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Optionally trigger search on every keystroke for instant results
    if (value.trim().length > 2) {
      onSearch(value.trim());
    } else if (value.trim().length === 0) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-govt-saffron focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-govt-blue hover:text-govt-saffron transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
