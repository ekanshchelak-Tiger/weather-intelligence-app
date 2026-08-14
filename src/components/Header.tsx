import React, { useState } from 'react';
import { Search, MapPin, Compass, X } from 'lucide-react';

interface HeaderProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  currentCity?: string;
}

const QUICK_PRESETS = [
  { name: 'Chennai', country: 'India' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'Tokyo', country: 'Japan' },
  { name: 'New York', country: 'United States' },
  { name: 'Paris', country: 'France' },
  { name: 'Sydney', country: 'Australia' },
];

export const Header: React.FC<HeaderProps> = ({ onSearch, isLoading, currentCity }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() && !isLoading) {
      onSearch(searchInput.trim());
    }
  };

  const handleClear = () => {
    setSearchInput('');
  };

  const handlePresetClick = (city: string) => {
    setSearchInput(city);
    onSearch(city);
  };

  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20 text-white">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Weather Intelligence
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Precision forecasts & smart lifestyle planning
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <form
            id="weather-search-form"
            onSubmit={handleSubmit}
            className="w-full md:max-w-md flex items-center gap-2"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="city-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search city (e.g. Chennai, London, Tokyo)..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition duration-150"
                disabled={isLoading}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              id="search-submit-btn"
              type="submit"
              disabled={isLoading || !searchInput.trim()}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition duration-150 shadow-sm shadow-sky-600/20 active:scale-[0.98] flex items-center gap-1.5"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </form>
        </div>

        {/* Quick Presets */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 flex items-center gap-1 shrink-0 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Quick Locations:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {QUICK_PRESETS.map((preset) => {
              const isSelected = currentCity?.toLowerCase() === preset.name.toLowerCase();
              return (
                <button
                  key={preset.name}
                  type="button"
                  id={`preset-${preset.name.toLowerCase()}`}
                  onClick={() => handlePresetClick(preset.name)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
