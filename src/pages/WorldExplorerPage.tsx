import React from 'react';
import { Link } from 'react-router-dom';
import { useCountriesController } from '../controllers/useCountriesController';

const WorldExplorerPage: React.FC = () => {
  const { filtered, loading, error, query, setQuery } = useCountriesController();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-sky-400">World</span>Simulator
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500 hidden sm:inline">
              World Explorer
            </span>
          </div>
          <nav className="flex items-center gap-3 text-xs">
            <Link
              to="/"
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-800"
            >
              &larr; Înapoi la start
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-50 mb-1">Explorare țări</h1>
              <p className="text-xs text-slate-400 max-w-xl">
                Datele sunt preluate în timp real din{' '}
                <a
                  href="https://restcountries.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
                >
                  REST Countries API
                </a>
                . Caută după nume sau regiune și observă structura de „Model” și „Controller” din spate.
              </p>
            </div>
            <div className="w-full sm:w-72">
              <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 mb-1">
                Căutare țară / regiune
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ex: Romania, Europe, Asia..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
          </section>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3 text-slate-300">
                <div className="h-6 w-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Încărcăm lista de țări...</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100">
              A apărut o eroare la încărcarea țărilor: <span className="font-medium">{error}</span>
            </div>
          )}

          {!loading && !error && (
            <section className="space-y-3">
              <p className="text-xs text-slate-400">
                Țări găsite: <span className="font-semibold text-slate-200">{filtered.length}</span>
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((country) => (
                  <article
                    key={country.code + country.name}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm shadow-slate-900/60 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {country.flagUrl && (
                        <img
                          src={country.flagUrl}
                          alt={country.name}
                          className="h-8 w-12 rounded object-cover border border-slate-700 bg-slate-800"
                        />
                      )}
                      <div>
                        <h2 className="text-sm font-semibold text-slate-50">{country.name}</h2>
                        <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">
                          {country.region || 'Unknown region'}
                        </p>
                      </div>
                    </div>
                    <dl className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div>
                        <dt className="text-slate-500">Capitală</dt>
                        <dd className="font-medium">{country.capital}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Populație</dt>
                        <dd className="font-medium">
                          {country.population.toLocaleString('en-US').replace(/,/g, ' ')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Putere economică</dt>
                        <dd className="font-medium text-emerald-300">
                          {country.economicPower.toFixed(0)}/100
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Putere militară</dt>
                        <dd className="font-medium text-red-300">
                          {country.militaryPower.toFixed(0)}/100
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorldExplorerPage;

