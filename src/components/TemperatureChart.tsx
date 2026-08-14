import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { DailyForecastItem } from '../types';
import { TrendingUp } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';

interface TemperatureChartProps {
  daily: DailyForecastItem[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    payload: {
      day: string;
      date: string;
      condition: string;
      icon: string;
      rain: number;
      maxTemp: number;
      minTemp: number;
    };
  }>;
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-700/80 mb-2">
          <div>
            <span className="font-bold text-sm text-white">{data.day}</span>
            <span className="text-slate-400 block text-[11px]">{data.date}</span>
          </div>
          <div className="flex items-center gap-1 text-sky-300">
            <WeatherIcon name={data.icon} className="w-4 h-4" />
            <span className="font-medium text-[11px]">{data.condition}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-rose-300 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              Max Temperature:
            </span>
            <span className="font-bold text-white">{data.maxTemp}°C</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-300 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              Min Temperature:
            </span>
            <span className="font-bold text-white">{data.minTemp}°C</span>
          </div>
          {data.rain > 0 && (
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800 text-[11px] text-slate-300">
              <span>Expected Rain:</span>
              <span className="font-semibold text-blue-400">{data.rain} mm</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ daily }) => {
  const chartData = daily.map((item) => ({
    day: item.dayOfWeek,
    date: item.formattedDate,
    maxTemp: item.maxTemp,
    minTemp: item.minTemp,
    condition: item.condition.label,
    icon: item.condition.iconName,
    rain: item.precipitationSum,
  }));

  // Calculate min & max domain with padding
  const allTemps = daily.flatMap((d) => [d.maxTemp, d.minTemp]);
  const minVal = Math.floor(Math.min(...allTemps) - 2);
  const maxVal = Math.ceil(Math.max(...allTemps) + 2);

  return (
    <div
      id="temperature-trend-card"
      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              7-Day Temperature Trend
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Thermal trajectory comparing daily highs vs lows
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span>Max Temp (°C)</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
            <span className="w-3 h-3 rounded-full bg-sky-500/80 inline-block" />
            <span>Min Temp (°C)</span>
          </div>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80 -ml-2 sm:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorMaxTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorMinTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              domain={[minVal, maxVal]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              unit="°"
              dx={-4}
            />
            <Tooltip content={<CustomChartTooltip />} />
            <Area
              type="monotone"
              dataKey="maxTemp"
              name="Max Temp"
              stroke="#f43f5e"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorMaxTemp)"
              dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#e11d48', strokeWidth: 2, stroke: '#ffffff' }}
            />
            <Area
              type="monotone"
              dataKey="minTemp"
              name="Min Temp"
              stroke="#0ea5e9"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorMinTemp)"
              dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#0284c7', strokeWidth: 2, stroke: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
