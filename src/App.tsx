import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData, SmartRecommendation } from './types';
import { searchCity, fetchWeatherData, WeatherApiError } from './services/weatherApi';
import { generateRecommendations } from './utils/weatherUtils';
import { Header } from './components/Header';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastSection } from './components/ForecastSection';
import { TemperatureChart } from './components/TemperatureChart';
import { SmartPlanningCard } from './components/SmartPlanningCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSkeleton } from './components/LoadingSkeleton';

const DEFAULT_CITY = 'Chennai';

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState<string>(DEFAULT_CITY);

  const loadWeather = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Step 1: Geocode city name to lat, lon, country
      const locations = await searchCity(cityName);
      const primaryLocation = locations[0];

      // Step 2: Fetch current weather and 7-day daily forecast
      const data = await fetchWeatherData(primaryLocation);
      setWeatherData(data);
      setLastSearchedCity(cityName);

      // Step 3: Compute smart planning recommendations
      const todayPrecip = data.daily[0]?.precipitationSum ?? 0;
      const recs = generateRecommendations(
        data.current.temperature,
        data.current.humidity,
        data.current.windSpeed,
        todayPrecip,
        data.daily
      );
      setRecommendations(recs);
    } catch (err: unknown) {
      if (err instanceof WeatherApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('City not found. Please try another location.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const handleSearch = (city: string) => {
    loadWeather(city);
  };

  const handleRetry = () => {
    loadWeather(lastSearchedCity || DEFAULT_CITY);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Header with Search and Presets */}
      <Header
        onSearch={handleSearch}
        isLoading={isLoading}
        currentCity={weatherData?.city || lastSearchedCity}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Error State */}
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            onRetry={handleRetry}
            onSelectSuggestion={handleSearch}
          />
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Weather Intelligence Dashboard */}
        {!isLoading && weatherData && (
          <div className="space-y-8">
            {/* Current Weather Overview */}
            <CurrentWeatherCard weather={weatherData} />

            {/* Smart Planning Recommendations */}
            {recommendations.length > 0 && (
              <SmartPlanningCard recommendations={recommendations} />
            )}

            {/* 7-Day Forecast Grid */}
            <ForecastSection daily={weatherData.daily} />

            {/* 7-Day Temperature Trend Visual Chart */}
            <TemperatureChart daily={weatherData.daily} />
          </div>
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Weather Intelligence • Real-Time Meteorological Analysis</span>
          <span>Powered by Open-Meteo API • WMO Standard</span>
        </div>
      </footer>
    </div>
  );
}
