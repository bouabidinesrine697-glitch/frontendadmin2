export interface Trottinette {
  id?: number;
  QR_code: string;
  model: string;
  status: string;
  price_per_minute?: number;
  battery: number;
  latitude?: number;
  longitude?: number;
  image?: string; // Cloudinary image URL
  image_url?: string; // Local image URL for display
  zone?: number; // Foreign key to Zone id
}