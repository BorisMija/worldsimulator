// import { CountryFactory } from './CountryFactory';
import { Country } from '../models/Country';

/**
 * ============================================================
 * MOCK COUNTRY FACTORY
 * ============================================================
 *
 * Implements Factory Method Pattern for test/mock data
 * Provides predefined countries and random generation capabilities
 *
 * Usage:
 *   - Unit testing (no HTTP requests)
 *   - Development/debugging
 *   - Demo purposes
 */
export class MockCountryFactory {
  // ============================================================
  // PRIVATE PROPERTIES - Mock Data
  // ============================================================

  private mockData: Country[] = this.initializeMockData();

  // ============================================================
  // PUBLIC METHODS
  // ============================================================

  /**
   * Creates a Country from mock data
   * Supports both index-based access and object-based creation
   *
   * @param rawData - Number (index) or object with country properties
   * @returns Country object
   */
  createCountry(rawData: any): Country {
    // If number provided, fetch from predefined mock data
    if (typeof rawData === 'number') {
      return this.getCountryByIndex(rawData);
    }

    // If object provided, create country with defaults
    return this.createCountryFromObject(rawData);
  }

  /**
   * Get all predefined mock countries
   *
   * @returns Array of all mock countries
   */
  getAllMockCountries(): Country[] {
    return [...this.mockData]; // Return copy to prevent mutations
  }

  /**
   * Get a specific mock country by index
   *
   * @param index - Index of the country
   * @returns Country object or random country if index out of bounds
   */
  getCountryByIndex(index: number): Country {
    return this.mockData[index] || this.generateRandomCountry();
  }

  /**
   * Get a random mock country
   *
   * @returns Randomly generated mock Country
   */
  getRandomCountry(): Country {
    return this.generateRandomCountry();
  }

  // ============================================================
  // PRIVATE HELPER METHODS - Initialization
  // ============================================================

  /**
   * Initialize mock countries database
   * @private
   */
  private initializeMockData(): Country[] {
    return [
      {
        code: 'USA',
        name: 'United States',
        capital: 'Washington D.C.',
        region: 'Americas',
        population: 331_000_000,
        flagUrl: '🇺🇸',
        economicPower: 95,
        militaryPower: 98,
        latlng: [38.89511, -77.03637],
      },
      {
        code: 'CHN',
        name: 'China',
        capital: 'Beijing',
        region: 'Asia',
        population: 1_400_000_000,
        flagUrl: '🇨🇳',
        economicPower: 90,
        militaryPower: 85,
        latlng: [39.9042, 116.4074],
      },
      {
        code: 'GBR',
        name: 'United Kingdom',
        capital: 'London',
        region: 'Europe',
        population: 67_000_000,
        flagUrl: '🇬🇧',
        economicPower: 80,
        militaryPower: 75,
        latlng: [51.5074, -0.1278],
      },
    ];
  }

  // ============================================================
  // PRIVATE HELPER METHODS - Creation
  // ============================================================

  /**
   * Creates country from object with default values
   * @private
   */
  private createCountryFromObject(data: any): Country {
    return {
      code: data.code ?? 'MOCK',
      name: data.name ?? 'Mock Country',
      capital: data.capital ?? 'Mock Capital',
      region: data.region ?? 'Mock Region',
      population: data.population ?? 0,
      flagUrl: data.flagUrl ?? '🏳️',
      economicPower: data.economicPower ?? 50,
      militaryPower: data.militaryPower ?? 50,
      latlng: data.latlng ?? [0, 0],
    };
  }

  /**
   * Generates a random fantasy country
   * @private
   */
  private generateRandomCountry(): Country {
    const fantasyNames = ['Atlantis', 'Narnia', 'Wakanda', 'Asgard', 'Themyscira'];
    const randomIndex = Math.floor(Math.random() * fantasyNames.length);
    const countryName = fantasyNames[randomIndex];

    return {
      code: `MOCK${randomIndex}`,
      name: countryName,
      capital: `Capital of ${countryName}`,
      region: 'Fantasy',
      population: Math.floor(Math.random() * 100_000_000),
      flagUrl: '🎭',
      economicPower: Math.floor(Math.random() * 100),
      militaryPower: Math.floor(Math.random() * 100),
      latlng: [Math.random() * 180 - 90, Math.random() * 360 - 180],
    };
  }
}
