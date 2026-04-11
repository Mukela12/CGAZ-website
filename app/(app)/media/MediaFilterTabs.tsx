"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface Tab {
  label: string;
  value: string;
  count: number;
}

interface MediaFilterTabsProps {
  tabs: Tab[];
  selectedType: string;
}

export function MediaFilterTabs({ tabs, selectedType }: MediaFilterTabsProps) {
  return (
    <section className="sticky top-16 lg:top-20 z-30 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const active = selectedType === tab.value;
            const href = tab.value === "all" ? "/media" : `/media?type=${tab.value}`;
            return (
              <Link
                key={tab.value}
                href={href}
                scroll={false}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                  active
                    ? "bg-cashew-green text-white shadow-md"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-xs font-bold",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-white text-neutral-600"
                  )}
                >
                  {tab.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
