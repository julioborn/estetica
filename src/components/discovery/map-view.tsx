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
                strokeColor: "#171412",
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
              <button
                type="button"
                onClick={() => router.push(`/negocio/${active.slug}`)}
                className="flex flex-col gap-0.5 text-left"
              >
                <span className="font-heading font-bold text-[#2a2118]">
                  {active.name}
                </span>
                {active.address_text && (
                  <span className="text-xs text-[#8a7b68]">
                    {active.address_text}
                  </span>
                )}
              </button>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
