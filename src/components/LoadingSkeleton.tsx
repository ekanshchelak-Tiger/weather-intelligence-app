import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div id="weather-loading-skeleton" className="space-y-6 animate-pulse">
      {/* Current Weather Card Skeleton */}
      <div className="rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-4 w-28 bg-slate-300 dark:bg-slate-700 rounded-md" />
            <div className="h-8 w-48 bg-slate-300 dark:bg-slate-700 rounded-lg" />
          </div>
          <div className="h-6 w-24 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        <div className="flex items-center gap-6 py-4">
          <div className="w-20 h-20 bg-slate-300 dark:bg-slate-700 rounded-2xl" />
          <div className="space-y-2">
            <div className="h-12 w-32 bg-slate-300 dark:bg-slate-700 rounded-xl" />
            <div className="h-4 w-40 bg-slate-300 dark:bg-slate-700 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-slate-300/80 dark:bg-slate-700/80 rounded-xl p-3"
            />
          ))}
        </div>
      </div>

      {/* 7-Day Forecast Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-44 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="h-40 bg-slate-200/70 dark:bg-slate-800/60 rounded-xl p-4 flex flex-col justify-between items-center"
            >
              <div className="h-4 w-14 bg-slate-300 dark:bg-slate-700 rounded-md" />
              <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-xl" />
              <div className="h-4 w-16 bg-slate-300 dark:bg-slate-700 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 p-6 space-y-4">
        <div className="h-6 w-52 bg-slate-300 dark:bg-slate-700 rounded-md" />
        <div className="h-64 bg-slate-300/60 dark:bg-slate-700/60 rounded-xl" />
      </div>
    </div>
  );
};
