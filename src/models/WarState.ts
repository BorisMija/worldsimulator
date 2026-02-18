export interface WarState {
  aggressor: string; // cod țară
  defender: string;
  startDate: Date;
  intensity: number; // 1-100
  outcome?: 'victory' | 'defeat' | 'stalemate';
}