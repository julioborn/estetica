"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { List, Map as MapIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { CategoryChips } from "@/components/discovery/category-chips";
import { BusinessCard } from "@/components/discovery/business-card";
import { EmptyState } from "@/components/discovery/empty-state";
import { MapPlaceholder } from "@/components/discovery/map-placeholder";
import { MapView } from "@/components/discovery/map-view";
import {
  LocationControl,
  type LocationState,
} from "@/components/discovery/location-control";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category, NearbyBusiness } from "@/lib/discovery/types";

export function DiscoveryView({
  categories,
  initialBusinesses,
}: {
  categories: Category[];
  initialBusinesses: NearbyBusiness[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );
  const [businesses, setBusinesses] =
    useState<NearbyBusiness[]>(initialBusinesses);
  const [location, setLocation] = useState<LocationState>({ status: "idle" });
  const [view, setView] = useState<"list" | "map">("list");
  const [isPending, startTransition] = useTransition();
  const coordsRef = useRef<{ lat: number; lng: number } | null>(null);

  const fetchBusinesses = useCallback(
    (categorySlug: string | null, coords: { lat: number; lng: number } | null) => {
      startTransition(async () => {
        const supabase = createClient();
        const { data } = await supabase.rpc("nearby_businesses", {
          user_lat: coords?.lat ?? null,
          user_lng: coords?.lng ?? null,
          category_slug: categorySlug,
        });
        setBusinesses(data ?? []);
      });
    },
    [],
  );

  const handleSelectCategory = (slug: string | null) => {
    setSelectedCategory(slug);
    fetchBusinesses(slug, coordsRef.current);
  };

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocation({ status: "denied" });
      return;
    }
    setLocation({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordsRef.current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation({ status: "granted" });
        fetchBusinesses(selectedCategory, coordsRef.current);
      },
      () => setLocation({ status: "denied" }),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <LocationControl state={location} onRequest={handleRequestLocation} />
        <div className="flex shrink-0 overflow-hidden rounded-full border border-border">
          <ViewToggleButton
            active={view === "list"}
            onClick={() => setView("list")}
            icon={<List className="size-4" />}
            label="Lista"
          />
          <ViewToggleButton
            active={view === "map"}
            onClick={() => setView("map")}
            icon={<MapIcon className="size-4" />}
            label="Mapa"
          />
        </div>
      </div>

      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={handleSelectCategory}
      />

      {view === "list" && !isPending && businesses.length > 0 && (
        <p className="font-mono text-xs text-muted-foreground">
          {businesses.length}{" "}
          {businesses.length === 1 ? "negocio" : "negocios"} cerca tuyo
        </p>
      )}

      {view === "map" ? (
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <MapView
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            businesses={businesses}
            center={location.status === "granted" ? coordsRef.current : null}
          />
        ) : (
          <MapPlaceholder />
        )
      ) : isPending ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-[104px] rounded-xl" />
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <EmptyState filtered={selectedCategory !== null} />
      ) : (
        <div className="flex flex-col gap-3">
          {businesses.map((business, i) => (
            <div
              key={business.id}
              style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
              className="animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards duration-500 motion-reduce:animate-none"
            >
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ViewToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center gap-1.5 px-3.5 py-1.5 font-heading text-sm font-bold transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "bg-card text-muted-foreground hover:bg-secondary",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
