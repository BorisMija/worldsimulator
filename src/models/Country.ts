export interface Country {
  code: string;
  name: string;
  capital: string;
  region: string;
  population: number;
  flagUrl: string;
  economicPower: number; // 0–100
  militaryPower: number; // 0–100
  latlng: [number, number]; // [latitude, longitude]
}