import { useEffect, useState } from 'react';
import { Country } from '../models/Country';
import { fetchAllCountries } from '../services/countryApi';

interface UseCountriesControllerState {
  countries: Country[];
  filtered: Country[];
  loading: boolean;
  error: string | null;
  query: string;
  setQuery: (value: string) => void;
}

export function useCountriesController(): UseCountriesControllerState {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQueryState] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const all = await fetchAllCountries();
        setCountries(all);
        setFiltered(all);
      } catch (err: any) {
        setError(err.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      countries.filter((c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q))
    );
  }, [query, countries]);

  const setQuery = (value: string) => {
    setQueryState(value);
  };

  return { countries, filtered, loading, error, query, setQuery };
}

