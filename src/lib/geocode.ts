export interface GeocodeResult {
  lat: number;
  lng: number;
}

// Free geocoder (OpenStreetMap Nominatim). No API key needed; rate-limited to
// ~1 req/sec by their usage policy, which is fine for occasional dashboard
// saves (not for per-keystroke lookups).
export async function geocodeAddress(
  address: string,
): Promise<GeocodeResult | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", address);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const response = await fetch(url, {
    headers: { "User-Agent": "EsteticaApp/1.0 (contacto@estetica.app)" },
  });

  if (!response.ok) return null;

  const results = (await response.json()) as { lat: string; lon: string }[];
  if (results.length === 0) return null;

  return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
}
