import { WorldDataFactory } from './WorldDataFactory';
import { Country } from '../models/Country';
import { City } from '../models/City';
import { Resource } from '../models/Resource';
import { WarState } from '../models/WarState';

export class MockWorldFactory extends WorldDataFactory {
  createCountry(item: any): Country {
    return {
      code: 'MOCK',
      name: 'Mock Country',
      capital: 'Mock Capital',
      region: 'Mock Region',
      population: 1000000,
      flagUrl: '',
      economicPower: 50,
      militaryPower: 50,
      latlng: [20, 0],
    };
  }

  createCity(item: any): City {
    return {
      name: 'Mock City',
      country: 'MOCK',
      population: 100000,
      isCapital: false,
    };
  }

  createResource(item: any): Resource {
    return {
      name: 'Mock Resource',
      type: 'natural',
      country: 'MOCK',
      quantity: 1000,
    };
  }

  createWarState(item: any): WarState {
    return {
      aggressor: 'MOCK1',
      defender: 'MOCK2',
      startDate: new Date(),
      intensity: 50,
      outcome: 'stalemate',
    };
  }
}