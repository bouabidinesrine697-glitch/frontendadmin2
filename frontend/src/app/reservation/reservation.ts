export interface Reservation {
  id?: number;
  trottinette: number; // Foreign key to Trottinette id
  user: number; // Foreign key to User id
  start_time: string; // ISO date string
  end_time?: string; // ISO date string, optional
  total_cost: number;
  trottinette_details?: any; // For displaying trottinette info
  user_details?: any; // For displaying user info
}