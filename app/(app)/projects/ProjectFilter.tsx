"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ProjectFilterProps {
  statusOptions: { label: string; value: string }[];
  selectedStatus: string;
}

export function ProjectFilter({
  statusOptions,
  selectedStatus,
}: ProjectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statusOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilterChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedStatus === option.value
              ? "bg-cashew-green text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
