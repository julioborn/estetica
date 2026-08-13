"use client";

import type { Category } from "@/lib/discovery/types";

export function CategoryPicker({
  categories,
  selectedIds,
}: {
  categories: Category[];
  selectedIds: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <label
          key={category.id}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-heading text-sm font-bold text-muted-foreground transition-all has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:checked]:shadow-[0_0_12px_-2px_rgba(240,169,63,0.6)]"
        >
          <input
            type="checkbox"
            name="categoryIds"
            value={category.id}
            defaultChecked={selectedIds.includes(category.id)}
            className="sr-only"
          />
          {category.name}
        </label>
      ))}
    </div>
  );
}
