import { Country } from '../models/Country';

export class CountryBuilder {
  private country: Country;

  constructor(base: Country) {
    this.country = { ...base };
  }

  setName(name: string) { this.country.name = name; return this; }
  setCode(code: string) { this.country.code = code; return this; }
  setPopulation(pop: number) { this.country.population = pop; return this; }
  setEconomicPower(power: number) { this.country.economicPower = power; return this; }
  setMilitaryPower(power: number) { this.country.militaryPower = power; return this; }
  setLatLng(latlng: [number, number]) { this.country.latlng = latlng; return this; }
  setFlagUrl(flagUrl: string) { this.country.flagUrl = flagUrl; return this; }
  setRegion(region: string) { this.country.region = region; return this; }
  setCapital(capital: string) { this.country.capital = capital; return this; }

  build() { return { ...this.country }; }
}
