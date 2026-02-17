import { CountryFactory } from './CountryFactory';
import { Country } from '../models/Country';

export class RestCountryFactory extends CountryFactory {
  createCountry(item: any): Country {
    return {
      code: item.cca3 ?? '',
      name: item.name?.common ?? 'Unknown',
      capital: Array.isArray(item.capital) ? item.capital[0] : item.capital ?? 'Unknown',
      region: item.region ?? 'Unknown',
      population: item.population ?? 0,
      flagUrl: item.flags?.svg ?? item.flags?.png ?? '',
      economicPower: Math.min(
        100,
        Math.max(10, Math.log10((item.population ?? 1) + 1) * 12)
      ),
      militaryPower: Math.min(
        100,
        Math.max(
          5,
          (item.area ? Math.log10(item.area + 1) * 10 : 20) +
            ((item.population ?? 0) > 50_000_000 ? 10 : 0)
        )
      ),
    };
  }
}