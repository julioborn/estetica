"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Store } from "lucide-react";
import { useState } from "react";
import type { NearbyBusiness } from "@/lib/discovery/types";

const CALCHAQUI_CENTER = { lat: -29.8989, lng: -60.2812 };

export function MapView({
  apiKey,
  businesses,
  center,
}: {
  apiKey: string;
  businesses: NearbyBusiness[];
  center: { lat: number; lng: number } | null;
}) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const located = businesses.filter(
    (b): b is NearbyBusiness & { lat: number; lng: number } =>
      b.lat !== null && b.lng !== null,
  );
  const active = located.find((b) => b.id === activeId) ?? null;

  return (
    <div className="h-[60vh] overflow-hidden rounded-3xl border border-border">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId="DEMO_MAP_ID"
          defaultCenter={center ?? CALCHAQUI_CENTER}
          defaultZoom={15}
          disableDefaultUI
          zoomControl
          gestureHandling="greedy"
        >
          {center && (
            <Marker
              position={center}
              icon={{
                path: 0, // google.maps.SymbolPath.CIRCLE
                scale: 7,
                fillColor: "#4A9EFF",
                fillOpacity: 1,
                strokeColor: "#eae4db",
                strokeWeight: 2,
              }}
            />
          )}
          {located.map((business) => (
            <AdvancedMarker
              key={business.id}
              position={{ lat: business.lat, lng: business.lng }}
              onClick={() => setActiveId(business.id)}
            >
              <div className="relative size-11 overflow-hidden rounded-xl border-2 border-accent bg-card shadow-md">
                {business.cover_url ? (
                  <Image
                    src={business.cover_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-accent text-accent-foreground">
                    <Store className="size-5" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            </AdvancedMarker>
          ))}
          {active && (
            <InfoWindow
              position={{ lat: active.lat, lng: active.lng }}
              onCloseClick={() => setActiveId(null)}
            >
              <div style={{ width: 260 }}>
                <div className="flex gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#dfd6c8]">
                    {active.cover_url ? (
                      <Image
                        src={active.cover_url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-[#8c8072]">
                        <Store className="size-6" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-bold text-[#3d3630]">
                      {active.name}
                    </p>
                    {active.category_names && active.category_names.length > 0 && (
                      <p className="text-xs text-[#8c8072]">
                        {active.category_names.join(" · ")}
                      </p>
                    )}
                    {active.address_text && (
                      <p className="text-xs text-[#8c8072]">
                        {active.address_text}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/negocio/${active.slug}`)}
                  className="mt-3 w-full rounded-lg bg-[#9bae9b] py-1.5 font-heading text-sm font-bold text-[#2c332c] transition-opacity hover:opacity-90"
                >
                  Ver negocio
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
