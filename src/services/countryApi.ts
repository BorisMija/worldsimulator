import { Country } from '../models/Country';
import { RestCountryFactory } from '../factories/RestCountryFactory';

const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1/all';
const factory = new RestCountryFactory();

export async function fetchAllCountries(): Promise<Country[]> {
  const response = await fetch(REST_COUNTRIES_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data = await response.json();

  // Folosim factory-ul pentru a crea obiectele Country
  return (data as any[]).map((item) => factory.createCountry(item));
}