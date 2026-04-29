export interface Zone {
  id?: number;
  nom: string;
  latitude?: number;
  longitude?: number;
  trottinettes?: any[]; 
  nombre_trottinettes?: number;
  nombre_disponibles?: number;

}