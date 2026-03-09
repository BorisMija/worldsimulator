import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCountriesController } from '../controllers/useCountriesController';
import { WorldMap } from '../components/WorldMap';
import { WarService } from '../services/warService';
import { Country } from '../models/Country';
import { CountryBuilder } from '../builders/builder';
import '../styles/WarSimulator.css';

const WarSimulatorPage: React.FC = () => {
  const { countries, loading, error } = useCountriesController();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [neighbors, setNeighbors] = useState<Country[]>([]);
  const [attackResult, setAttackResult] = useState<any>(null);
  const warService = new WarService();
  const [countryList, setCountryList] = useState<Country[]>(countries);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    const neighs = warService.getNeighbors(country, countries);
    setNeighbors(neighs);
    setAttackResult(null);
  };

  const handleAttack = (target: Country) => {
    if (!selectedCountry) return;
    const result = warService.resolveAttack(selectedCountry, target);
    setAttackResult({
      ...result,
      attacker: selectedCountry,
      defender: target,
    });
  };

  if (loading) {
    return <div className="war-simulator-loading">⏳ Loading world data...</div>;
  }

  if (error) {
    return <div className="war-simulator-error">❌ Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-red-500">⚔️ War</span>Simulator
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              World Conquest
            </span>
          </div>
          <nav className="flex items-center gap-3 text-xs">
            <Link
              to="/"
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-800"
            >
              &larr; Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="mb-6 max-w-3xl">
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
            <h2 className="text-lg font-bold">Welcome Commander</h2>
            <p className="text-sm text-slate-300 mt-2">Command your nation, weigh economic strengths and military might, and discover surprising outcomes — history is written by choices.</p>
            <p className="text-sm text-slate-400 mt-2">Did you know: random terrain modifiers are simulated implicitly by population density and economic power in this demo.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
              <h2 className="text-xl font-bold mb-4">🗺️ World Map</h2>
              <WorldMap 
                countries={countries} 
                selectedCountry={selectedCountry}
                onCountryClick={handleCountryClick}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Static Trivia / Tips */}
            <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
              <h3 className="text-lg font-bold mb-2">🧭 Simulator Tips</h3>
              <ul className="text-sm text-slate-300 list-disc list-inside space-y-1">
                <li>Use alliances to offset raw military disadvantage.</li>
                <li>Economy matters: sustain longer campaigns with higher economic power.</li>
                <li>Explore the map — terrain and neighbors change strategic options.</li>
              </ul>
            </div>
            {/* Selected Country Panel */}
            {selectedCountry && (
              <div className="bg-slate-900 rounded-lg border border-blue-500 p-4">
                <h3 className="text-lg font-bold mb-3 text-blue-400">
                  📍 {selectedCountry.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Code:</strong> {selectedCountry.code}</p>
                  <p><strong>Capital:</strong> {selectedCountry.capital}</p>
                  <p><strong>Region:</strong> {selectedCountry.region}</p>
                  <p><strong>Population:</strong> {(selectedCountry.population / 1000000).toFixed(1)}M</p>
                  <div className="border-t border-slate-700 pt-2 mt-2">
                    <p>🎖️ <strong>Military Power:</strong> {selectedCountry.militaryPower}/100</p>
                    <div className="bg-slate-800 rounded h-2 mt-1 overflow-hidden">
                      <div 
                        className="bg-red-500 h-full"
                        style={{ width: `${selectedCountry.militaryPower}%` }}
                      />
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-2 mt-2">
                    <p>💰 <strong>Economic Power:</strong> {selectedCountry.economicPower}/100</p>
                    <div className="bg-slate-800 rounded h-2 mt-1 overflow-hidden">
                      <div 
                        className="bg-green-500 h-full"
                        style={{ width: `${selectedCountry.economicPower}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Neighbors Panel */}
            {neighbors.length > 0 && (
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
                <h3 className="text-lg font-bold mb-3">
                  👥 Neighbors ({neighbors.length})
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {neighbors.map((neighbor) => {
                    const canAttack = selectedCountry && warService.canAttack(selectedCountry, neighbor);
                    return (
                      <div 
                        key={neighbor.code}
                        className={`p-3 rounded border ${canAttack ? 'border-yellow-600 bg-yellow-900/20' : 'border-slate-700 bg-slate-800'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold">{neighbor.name}</span>
                          <span className={`text-xs px-2 py-1 rounded ${neighbor.militaryPower > selectedCountry!.militaryPower ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
                            {neighbor.militaryPower > selectedCountry!.militaryPower ? '⚠️ Stronger' : '✓ Weaker'}
                          </span>
                        </div>
                        <div className="text-xs space-y-1 mb-2">
                          <p>🎖️ {neighbor.militaryPower} | 💰 {neighbor.economicPower}</p>
                        </div>
                        <button
                          onClick={() => handleAttack(neighbor)}
                          disabled={!canAttack}
                          className={`w-full py-2 px-2 rounded text-sm font-bold transition ${
                            canAttack
                              ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {canAttack ? '⚔️ Attack' : '🚫 Too Strong'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Attack Result Panel */}
            {attackResult && (
              <div className={`bg-slate-900 rounded-lg border-2 p-4 ${
                attackResult.winner.code === selectedCountry?.code 
                  ? 'border-green-500' 
                  : 'border-red-500'
              }`}>
                <h3 className="text-lg font-bold mb-3">
                  {attackResult.winner.code === selectedCountry?.code 
                    ? '🎉 Victory!' 
                    : '💔 Defeat!'}
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Attacker:</strong> {attackResult.attacker.name}</p>
                  <p><strong>Defender:</strong> {attackResult.defender.name}</p>
                  <p><strong>Winner:</strong> {attackResult.winner.name}</p>
                  <p><strong>Losses:</strong> {attackResult.losses.toFixed(0)} units</p>
                  {attackResult.captured && (
                    <p className="text-yellow-300 font-bold">🚩 Territory Captured!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WarSimulatorPage;
