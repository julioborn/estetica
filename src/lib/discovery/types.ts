export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface NearbyBusiness {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address_text: string | null;
  cover_url: string | null;
  category_names: string[] | null;
  distance_km: number | null;
  lat: number | null;
  lng: number | null;
}
