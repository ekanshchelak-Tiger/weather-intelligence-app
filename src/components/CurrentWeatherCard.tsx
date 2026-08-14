import React from 'react';
import { WeatherData } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Wind, Droplets, ArrowUp, ArrowDown, CloudRain, Clock, MapPin } from 'lucide-react';

interface CurrentWeatherCardProps {
  weather: WeatherData;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather }) => {
  const { current, city, country, adminRegion, daily } = weather;
  const todayForecast = daily[0];

  const getHumidityQuality = (val: number) => {
    if (val < 30) return { label: 'Dry', color: 'text-amber-600 dark:text-amber-400' };
    if (val <= 60) return { label: 'Comfortable', color: 'text-emerald-600 dark:text-emerald-400' };
    if (val <= 75) return { label: 'Moderate', color: 'text-sky-600 dark:text-sky-400' };
    return { label: 'Humid', color: 'text-blue-600 dark:text-blue-400' };
  };

  const getWindQuality = (val: number) => {
    if (val < 10) return { label: 'Calm', color: 'text-emerald-600 dark:text-emerald-400' };
    if (val < 25) return { label: 'Moderate', color: 'text-sky-600 dark:text-sky-400' };
    return { label: 'Windy', color: 'text-amber-600 dark:text-amber-400' };
  };

  const humidityQuality = getHumidityQuality(current.humidity);
  const windQuality = getWindQuality(current.windSpeed);

  // Format local observation time
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      id="current-weather-card"
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all"
    >
      {/* Dynamic atmospheric ambient background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${current.condition.bgGradient} opacity-60 pointer-events-none`}
      />

      <div className="relative p-6 sm:p-8 flex flex-col justify-between gap-6">
        {/* Location & Time Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Current Location</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {city}
              </h2>
              <span className="text-base sm:text-lg font-medium text-slate-500 dark:text-slate-400">
                {adminRegion ? `${adminRegion}, ` : ''}{country}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Updated {formattedTime}</span>
          </div>
        </div>

        {/* Core Temperature & Condition Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-2">
          {/* Main Temp & Condition */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <WeatherIcon name={current.condition.iconName} className="w-9 h-9 sm:w-12 sm:h-12" />
              </div>
              <div>
                <div className="flex items-start">
                  <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {current.temperature}
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold text-slate-400 dark:text-slate-500 ml-1">
                    °C
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {current.condition.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  {current.condition.description}
                </p>
              </div>
            </div>
          </div>

          {/* Today's Range Pill / Mini Highlights */}
          {todayForecast && (
            <div className="md:col-span-5 flex flex-row md:flex-col justify-between md:items-end gap-3 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-left md:text-right">
                <span className="text-xs text-slate-400 font-medium block">Today's Range</span>
                <div className="flex items-center gap-3 mt-1 text-sm font-bold">
                  <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                    <ArrowUp className="w-3.5 h-3.5" />
                    {todayForecast.maxTemp}°C
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                    {todayForecast.minTemp}°C
                  </span>
                </div>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs text-slate-400 font-medium block">Precipitation</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center md:justify-end gap-1 mt-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                  {todayForecast.precipitationSum} mm
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Humidity */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
              <span>Humidity</span>
              <Droplets className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {current.humidity}%
            </div>
            <div className={`text-[11px] font-semibold mt-0.5 ${humidityQuality.color}`}>
              {humidityQuality.label}
            </div>
          </div>

          {/* Wind Speed */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
              <span>Wind Speed</span>
              <Wind className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {current.windSpeed} <span className="text-xs font-normal text-slate-500">km/h</span>
            </div>
            <div className={`text-[11px] font-semibold mt-0.5 ${windQuality.color}`}>
              {windQuality.label}
            </div>
          </div>

          {/* Today's Rain Sum */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
              <span>Rain Total</span>
              <CloudRain className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {todayForecast ? todayForecast.precipitationSum : 0}{' '}
              <span className="text-xs font-normal text-slate-500">mm</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              {(todayForecast?.precipitationSum ?? 0) > 0 ? 'Rainfall expected' : 'Dry day'}
            </div>
          </div>

          {/* Condition Code */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
              <span>Weather State</span>
              <WeatherIcon name={current.condition.iconName} className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {current.condition.label}
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              WMO Code {current.weatherCode}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
