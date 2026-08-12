"use client";

import { useRouter } from "next/navigation";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";
import type { NearbyBusiness } from "@/lib/discovery/types";

const CALCHAQUI_CENTER = { lat: -29.9333, lng: -60.2667 };

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
    <div className="h-[60vh] overflow-hidden rounded-sm border border-border">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center ?? CALCHAQUI_CENTER}
          defaultZoom={center ? 14 : 13}
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
                fillColor: "#1e6fb8",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          )}
          {located.map((business) => (
            <Marker
              key={business.id}
              position={{ lat: business.lat, lng: business.lng }}
              onClick={() => setActiveId(business.id)}
            />
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
                <span className="font-heading font-black text-foreground">
                  {active.name}
                </span>
                {active.address_text && (
                  <span className="text-xs text-muted-foreground">
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
