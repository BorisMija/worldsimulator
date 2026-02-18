import { WorldDataFactory } from './WorldDataFactory';
import { Country } from '../models/Country';
import { City } from '../models/City';
import { Resource } from '../models/Resource';
import { WarState } from '../models/WarState';

export class ConflictScenarioFactory extends WorldDataFactory {
  createCountry(item: any): Country {
    // Boost militar pentru scenario-uri de conflict
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
            ((item.population ?? 0) > 50_000_000 ? 10 : 0) +
            15 // +15 boost pentru conflict scenarios
        )
      ),
      latlng: item.latlng ?? [20, 0],
    };
  }

  createCity(item: any): City {
    return {
      name: item.name ?? 'Unknown',
      country: item.country ?? '',
      population: item.population ?? 0,
      isCapital: item.isCapital ?? false,
    };
  }

  createResource(item: any): Resource {
    return {
      name: item.name ?? 'Unknown',
      type: 'mineral', // Scenario-uri de conflict = doar resurse strategice
      country: item.country ?? '',
      quantity: item.quantity ?? 0,
    };
  }

  createWarState(item: any): WarState {
    return {
      aggressor: item.aggressor ?? '',
      defender: item.defender ?? '',
      startDate: new Date(item.startDate),
      intensity: Math.min(100, (item.intensity ?? 0) + 20), // +20 intensitate
      outcome: item.outcome,
    };
  }
}
