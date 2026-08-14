import React from 'react';
import { DailyForecastItem } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Calendar, ArrowUp, ArrowDown, Droplets } from 'lucide-react';

interface ForecastSectionProps {
  daily: DailyForecastItem[];
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ daily }) => {
  return (
    <div id="forecast-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">7-Day Daily Forecast</h3>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Detailed outlook
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {daily.map((item, index) => {
          const isToday = index === 0;

          return (
            <div
              key={item.date}
              id={`forecast-card-${index}`}
              className={`p-4 rounded-xl transition-all duration-200 border flex flex-col justify-between items-center text-center relative ${
                isToday
                  ? 'bg-sky-50/70 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/80 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {isToday && (
                <span className="absolute -top-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-600 text-white shadow-xs">
                  Today
                </span>
              )}

              {/* Day & Date */}
              <div className="mt-1">
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {item.dayOfWeek}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {item.formattedDate}
                </p>
              </div>

              {/* Weather Icon & Condition */}
              <div className="my-3 flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <WeatherIcon name={item.condition.iconName} className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[90px] px-1">
                  {item.condition.label}
                </span>
              </div>

              {/* Max & Min Temps */}
              <div className="w-full pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2.5 text-xs font-bold">
                <span className="flex items-center text-rose-600 dark:text-rose-400" title="Maximum Temperature">
                  <ArrowUp className="w-3 h-3 mr-0.5" />
                  {item.maxTemp}°
                </span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="flex items-center text-sky-600 dark:text-sky-400" title="Minimum Temperature">
                  <ArrowDown className="w-3 h-3 mr-0.5" />
                  {item.minTemp}°
                </span>
              </div>

              {/* Precipitation if any */}
              <div className="mt-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span>{item.precipitationSum} mm</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
