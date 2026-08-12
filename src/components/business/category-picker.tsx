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
          className="flex cursor-pointer items-center gap-2 rounded-sm border-2 border-foreground/25 px-3.5 py-2 font-heading text-xs font-black tracking-wide text-foreground uppercase transition-all has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-accent-foreground"
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
