export interface Reservation {
  id: number; 
  status: string;
  start_time: string;
  Trottinette?: number;  
  trottinette?: number;  
  user: number;
  end_time?: string;
  total_cost: number;
  trottinette_details?: { model: string; QR_code: string; };
  user_details?: { username: string; email: string; };
}