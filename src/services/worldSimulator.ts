import { WorldDataFactory } from '../factories/WorldDataFactory';
import { Country } from '../models/Country';
import { City } from '../models/City';
import { Resource } from '../models/Resource';
import { WarState } from '../models/WarState';

export interface WorldData {
  countries: Country[];
  cities: City[];
  resources: Resource[];
  wars: WarState[];
}

export class WorldSimulator {
  constructor(private factory: WorldDataFactory) {}

  initializeWorld(
    countriesData: any[],
    citiesData?: any[],
    resourcesData?: any[],
    warsData?: any[]
  ): WorldData {
    return {
      countries: countriesData.map((d) => this.factory.createCountry(d)),
      cities: citiesData?.map((d) => this.factory.createCity(d)) ?? [],
      resources: resourcesData?.map((d) => this.factory.createResource(d)) ?? [],
      wars: warsData?.map((d) => this.factory.createWarState(d)) ?? [],
    };
  }
}
