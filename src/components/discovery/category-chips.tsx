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
  const selectedCategory = categories.find((c) => c.slug === selected);
  const carouselCategories = categories.filter((c) => c.slug !== selected);

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <div className="flex shrink-0 items-center gap-2">
        <Chip active={selected === null} onClick={() => onSelect(null)}>
          Todos
        </Chip>
        {selectedCategory && (
          <Chip active onClick={() => onSelect(null)}>
            {selectedCategory.name}
          </Chip>
        )}
      </div>

      {carouselCategories.length > 0 && (
        <div
          className="min-w-0 flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
          }}
        >
          <div className="flex w-max gap-2 motion-safe:animate-[chip-marquee_24s_linear_infinite] motion-safe:hover:[animation-play-state:paused]">
            {[...carouselCategories, ...carouselCategories].map(
              (category, i) => {
                const isDuplicate = i >= carouselCategories.length;
                return (
                  <Chip
                    key={`${category.id}-${i}`}
                    active={false}
                    onClick={() => onSelect(category.slug)}
                    tabIndex={isDuplicate ? -1 : 0}
                    ariaHidden={isDuplicate}
                  >
                    {category.name}
                  </Chip>
                );
              },
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  tabIndex,
  ariaHidden,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tabIndex?: number;
  ariaHidden?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 font-heading text-sm font-bold whitespace-nowrap transition-colors",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
