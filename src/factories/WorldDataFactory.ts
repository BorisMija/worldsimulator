import { Country } from '../models/Country';
import { City } from '../models/City';
import { Resource } from '../models/Resource';
import { WarState } from '../models/WarState';

export abstract class WorldDataFactory {
  abstract createCountry(rawData: any): Country;
  abstract createCity(rawData: any): City;
  abstract createResource(rawData: any): Resource;
  abstract createWarState(rawData: any): WarState;
}