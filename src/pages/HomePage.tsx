import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-rose-900 text-slate-100 flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-rose-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_transparent_55%)]" />
      </div>

      <header className="relative z-10 w-full border-b border-white/5 backdrop-blur-md bg-black/30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight">
              <span className="text-rose-400">World</span>Simulator
            </span>
            <span className="text-[11px] text-slate-300">
              Simulează fericirea și imaginează-ți lumea așa cum este ea.
            </span>
          </div>
          <nav className="space-x-3 text-sm">
            <Link to="/" className="text-slate-300 hover:text-white">
              Acasă
            </Link>
            <Link
              to="/world"
              className="inline-flex items-center rounded-full border border-sky-400/60 px-3 py-1 text-xs font-medium text-sky-100 hover:bg-sky-500/10"
            >
              Explorează lumea
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-start">
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          <div className="space-y-6">
            <p className="uppercase tracking-[0.25em] text-[10px] text-rose-300/90">
              React · TypeScript · Tailwind · Design Patterns
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_10px_40px_rgba(15,23,42,0.9)]">
              Creează propriul tău{' '}
              <span className="text-rose-400 drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]">World Simulator</span>
              <span className="block text-lg md:text-xl text-slate-300 font-normal mt-3">
                Țări reale, putere economică și militară, bătălii simulate – totul într-o singură interfață.
              </span>
            </h1>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/world"
                className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-colors"
              >
                Începe explorarea lumii
              </Link>
              <button
                type="button"
                onClick={() => alert('Simularea bătăliei va fi aici – o vom implementa în următorul pas.')}
                className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-500/40 hover:bg-rose-500 transition-colors"
              >
                Începe bătălia
              </button>
              <a
                href="https://restcountries.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-slate-500/60 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                API țări folosit
              </a>
            </div>
          </div>

          <div className="relative flex items-start justify-center">
            <div className="absolute -inset-10 bg-rose-500/25 blur-3xl rounded-full" />
            {/* extra small planets around the main one */}
            <div className="absolute -top-6 left-4 h-10 w-10 rounded-full bg-sky-400/70 blur-[1px] shadow-[0_0_18px_rgba(56,189,248,0.8)] animate-pulse-planet" />
            <div className="absolute -bottom-4 left-0 h-8 w-8 rounded-full bg-emerald-400/70 blur-[1px] shadow-[0_0_18px_rgba(52,211,153,0.8)] animate-pulse-planet" />
            <div className="absolute -top-2 right-2 h-9 w-9 rounded-full bg-violet-400/70 blur-[1px] shadow-[0_0_18px_rgba(167,139,250,0.8)] animate-pulse-planet" />
            <div className="absolute bottom-0 right-6 h-7 w-7 rounded-full bg-amber-400/70 blur-[1px] shadow-[0_0_18px_rgba(251,191,36,0.8)] animate-pulse-planet" />
            <div className="absolute -left-6 top-10 h-6 w-6 rounded-full bg-cyan-400/70 blur-[1px] shadow-[0_0_18px_rgba(34,211,238,0.8)] animate-pulse-planet" />
            <div className="absolute -right-6 top-12 h-6 w-6 rounded-full bg-fuchsia-400/70 blur-[1px] shadow-[0_0_18px_rgba(232,121,249,0.8)] animate-pulse-planet" />
            <div className="absolute bottom-10 -right-4 h-5 w-5 rounded-full bg-lime-400/70 blur-[1px] shadow-[0_0_18px_rgba(190,242,100,0.8)] animate-pulse-planet" />
            <div className="relative h-64 w-64 md:h-72 md:w-72 rounded-full border border-rose-400/60 bg-slate-900/80 shadow-[0_0_60px_rgba(244,114,182,0.4)] flex items-center justify-center overflow-hidden animate-spin-slow">
              <div className="absolute inset-6 rounded-full border border-slate-700/70" />
              <div className="absolute h-1/2 w-px bg-gradient-to-b from-rose-400/80 via-pink-300/40 to-transparent" />
              <div className="absolute w-1/2 h-px bg-gradient-to-r from-fuchsia-400/80 via-rose-300/40 to-transparent" />

              <div className="relative z-10 text-center space-y-3 px-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-300">
                  Planet overview
                </p>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="space-y-1">
                    <p className="text-slate-300">Țări</p>
                    <p className="text-base font-semibold text-rose-200">190+</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-300">Continente</p>
                    <p className="text-base font-semibold text-pink-200">7</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">Populație</p>
                    <p className="text-xs font-semibold text-violet-300">~8 miliarde</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400">Simulări</p>
                    <p className="text-xs font-semibold text-amber-300">în curând…</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  O planetă, sute de țări, nenumărate scenarii de simulare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

