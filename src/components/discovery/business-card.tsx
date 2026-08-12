import Link from "next/link";
import Image from "next/image";
import { Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "@/lib/geo";
import type { NearbyBusiness } from "@/lib/discovery/types";

export function BusinessCard({ business }: { business: NearbyBusiness }) {
  return (
    <Link
      href={`/negocio/${business.slug}`}
      className="flex gap-4 rounded-sm border border-border bg-card p-3 transition-shadow hover:shadow-[0_4px_16px_-4px_rgba(30,30,28,0.15)]"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-secondary">
        {business.cover_url ? (
          <Image
            src={business.cover_url}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <Store className="size-7" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-heading font-black text-foreground">
            {business.name}
          </h3>
          {business.distance_km !== null && (
            <span className="shrink-0 text-sm text-muted-foreground">
              {formatDistance(business.distance_km)}
            </span>
          )}
        </div>
        {business.category_names && business.category_names.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {business.category_names.map((name) => (
              <Badge
                key={name}
                variant="outline"
                className="font-heading font-black tracking-wide uppercase"
              >
                {name}
              </Badge>
            ))}
          </div>
        )}
        {business.address_text && (
          <p className="truncate text-sm text-muted-foreground">
            {business.address_text}
          </p>
        )}
      </div>
    </Link>
  );
}
