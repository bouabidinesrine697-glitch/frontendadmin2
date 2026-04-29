
export interface Client {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone: string;
  ville: string;
  adresse: string;
  latitude?: number;
  longitude?: number;
  date_naissance?: string | Date;
}