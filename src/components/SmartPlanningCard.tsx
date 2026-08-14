import React from 'react';
import { SmartRecommendation } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Lightbulb } from 'lucide-react';

interface SmartPlanningCardProps {
  recommendations: SmartRecommendation[];
}

export const SmartPlanningCard: React.FC<SmartPlanningCardProps> = ({ recommendations }) => {
  return (
    <div
      id="smart-planning-section"
      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Smart Planning Recommendations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized activity and dressing advice for current conditions
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            id={`recommendation-card-${rec.id}`}
            className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-xs border border-slate-200/60 dark:border-slate-600 flex items-center justify-center shrink-0 text-sky-600 dark:text-sky-400 mt-0.5">
              <WeatherIcon name={rec.icon} className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {rec.title}
                </h4>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${rec.badgeColor}`}
                >
                  {rec.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {rec.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
