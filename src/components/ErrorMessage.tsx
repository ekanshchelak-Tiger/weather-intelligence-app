import React from 'react';
import { AlertCircle, RefreshCw, MapPin } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onSelectSuggestion?: (city: string) => void;
}

const POPULAR_SUGGESTIONS = ['London', 'Chennai', 'Tokyo', 'New York', 'Paris'];

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onSelectSuggestion,
}) => {
  return (
    <div
      id="weather-error-banner"
      className="p-6 sm:p-8 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-center space-y-4 max-w-2xl mx-auto my-6"
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-rose-900 dark:text-rose-200">
          Location Search Notice
        </h3>
        <p className="text-sm text-rose-700 dark:text-rose-300 max-w-md mx-auto">
          {message || 'City not found. Please try another location.'}
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            id="error-retry-btn"
            onClick={onRetry}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition duration-150 flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        )}

        {onSelectSuggestion && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 sm:pt-0">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Try:
            </span>
            {POPULAR_SUGGESTIONS.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => onSelectSuggestion(city)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
