"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/discovery/types";

export function CategoryChips({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Chip active={selected === null} onClick={() => onSelect(null)}>
        Todos
      </Chip>
      {categories.map((category) => (
        <Chip
          key={category.id}
          active={selected === category.slug}
          onClick={() => onSelect(category.slug)}
        >
          {category.name}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-sm border-2 px-3.5 py-2 font-heading text-xs font-black tracking-wide uppercase transition-all",
        active
          ? "border-accent bg-accent text-accent-foreground shadow-[0_2px_10px_-2px_rgba(196,54,46,0.5)]"
          : "border-foreground/25 bg-transparent text-foreground hover:border-foreground/50",
      )}
    >
      {children}
    </button>
  );
}
