import { Country } from '../models/Country';

export class WarService {
  /**
   * Verifică dacă țara A poate ataca țara B
   */
  canAttack(attacker: Country, defender: Country): boolean {
    const economicAdvantage = attacker.economicPower - defender.economicPower;
    const militaryAdvantage = attacker.militaryPower - defender.militaryPower;
    
    // Trebuie avantaj militar ȘI economic minim
    return militaryAdvantage > 5 && economicAdvantage > 0;
  }

  /**
   * Calculează victorul atacului
   */
  resolveAttack(attacker: Country, defender: Country): {
    winner: Country;
    losses: number;
    captured: boolean;
  } {
    const totalPower = {
      attacker: attacker.militaryPower + (attacker.economicPower * 0.3),
      defender: defender.militaryPower + (defender.economicPower * 0.3),
    };

    const attackerWins = totalPower.attacker > totalPower.defender;
    const losses = Math.abs(totalPower.attacker - totalPower.defender);

    return {
      winner: attackerWins ? attacker : defender,
      losses,
      captured: attackerWins && losses > 20,
    };
  }

  /**
   * Gets neighboring countries (din aceeasi regiune sau langa)
   */
  getNeighbors(country: Country, allCountries: Country[]): Country[] {
    const maxDistance = 30; // degrees

    return allCountries.filter((c) => {
      if (c.code === country.code) return false;
      
      // Metoda 1: Aceeasi regiune
      if (c.region === country.region) return true;

      // Metoda 2: Apropiere geografica (simplified)
      const [lat1, lng1] = country.latlng;
      const [lat2, lng2] = c.latlng;
      const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2));
      
      return distance < maxDistance;
    });
  }

  /**
   * Calculeaza distant intre doua tari (simplified)
   */
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Raza Pamantului in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
