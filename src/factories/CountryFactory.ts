import { Country } from '../models/Country';

export abstract class CountryFactory {
  // metoda abstractă pe care orice factory concret trebuie să o implementeze
  abstract createCountry(rawData: any): Country;
}