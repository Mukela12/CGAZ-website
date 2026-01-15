"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";

interface NewsSearchFilterProps {
  categories: { label: string; value: string }[];
  selectedCategory: string;
  searchQuery: string;
}

export function NewsSearchFilter({
  categories,
  selectedCategory,
  searchQuery: initialSearchQuery,
}: NewsSearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(initialSearchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }

    router.push(`/news?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/news?${params.toString()}`);
  };

  return (
    <section className="py-8 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cashew-green focus:border-transparent transition-all"
              />
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter className="w-5 h-5 text-neutral-600 flex-shrink-0" />
            <div className="flex gap-2 flex-nowrap">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.value
                      ? "bg-cashew-green text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
