import { WeatherConditionInfo, SmartRecommendation, DailyForecastItem } from '../types';

/**
 * Maps WMO Weather interpretation codes (WW) to human-readable labels, icons, and styling metadata.
 * Reference: Open-Meteo & WMO Standard
 */
export function getWeatherCondition(code: number): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        label: 'Clear Sky',
        description: 'Bright sunshine with completely clear skies',
        iconName: 'Sun',
        category: 'clear',
        bgGradient: 'from-amber-400/15 via-orange-400/5 to-transparent',
      };
    case 1:
      return {
        label: 'Mainly Clear',
        description: 'Mostly sunny with faint occasional cloud patches',
        iconName: 'SunMedium',
        category: 'clear',
        bgGradient: 'from-amber-400/15 via-sky-400/5 to-transparent',
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        description: 'Scattered clouds with intermittent sunny spells',
        iconName: 'CloudSun',
        category: 'cloudy',
        bgGradient: 'from-sky-400/15 via-blue-400/5 to-transparent',
      };
    case 3:
      return {
        label: 'Overcast',
        description: 'Dense cloud cover spanning across the sky',
        iconName: 'Cloud',
        category: 'cloudy',
        bgGradient: 'from-slate-400/15 via-gray-400/5 to-transparent',
      };
    case 45:
    case 48:
      return {
        label: 'Foggy',
        description: 'Low visibility due to dense surface fog / rime',
        iconName: 'CloudFog',
        category: 'fog',
        bgGradient: 'from-slate-400/15 via-stone-400/5 to-transparent',
      };
    case 51:
      return {
        label: 'Light Drizzle',
        description: 'Fine, gentle misty raindrops falling lightly',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
        bgGradient: 'from-blue-400/15 via-cyan-400/5 to-transparent',
      };
    case 53:
      return {
        label: 'Moderate Drizzle',
        description: 'Steady fine drizzle dampening outdoor surfaces',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
        bgGradient: 'from-blue-400/15 via-sky-400/5 to-transparent',
      };
    case 55:
      return {
        label: 'Dense Drizzle',
        description: 'Heavy misty drizzle with reduced road visibility',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
        bgGradient: 'from-indigo-400/15 via-blue-400/5 to-transparent',
      };
    case 56:
    case 57:
      return {
        label: 'Freezing Drizzle',
        description: 'Freezing drizzle forming thin ice glaze on surfaces',
        iconName: 'CloudHail',
        category: 'drizzle',
        bgGradient: 'from-cyan-400/15 via-slate-400/5 to-transparent',
      };
    case 61:
      return {
        label: 'Slight Rain',
        description: 'Light rainfall with occasional dry intervals',
        iconName: 'CloudRain',
        category: 'rain',
        bgGradient: 'from-blue-500/15 via-indigo-500/5 to-transparent',
      };
    case 63:
      return {
        label: 'Moderate Rain',
        description: 'Consistent rain showers over the area',
        iconName: 'CloudRain',
        category: 'rain',
        bgGradient: 'from-blue-600/15 via-indigo-600/5 to-transparent',
      };
    case 65:
      return {
        label: 'Heavy Rain',
        description: 'Intense downpour with significant surface pooling',
        iconName: 'CloudRainWind',
        category: 'rain',
        bgGradient: 'from-blue-700/20 via-slate-700/10 to-transparent',
      };
    case 66:
    case 67:
      return {
        label: 'Freezing Rain',
        description: 'Hazardous supercooled rain freezing on contact',
        iconName: 'CloudSnow',
        category: 'rain',
        bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      };
    case 71:
      return {
        label: 'Light Snow',
        description: 'Delicate snowflakes gently drifting down',
        iconName: 'Snowflake',
        category: 'snow',
        bgGradient: 'from-sky-300/20 via-slate-200/10 to-transparent',
      };
    case 73:
      return {
        label: 'Moderate Snow',
        description: 'Steady snowfall accumulating on sidewalks and cars',
        iconName: 'Snowflake',
        category: 'snow',
        bgGradient: 'from-sky-300/25 via-blue-200/15 to-transparent',
      };
    case 75:
      return {
        label: 'Heavy Snow',
        description: 'Thick snowfall leading to winter travel conditions',
        iconName: 'Snowflake',
        category: 'snow',
        bgGradient: 'from-slate-400/25 via-sky-300/20 to-transparent',
      };
    case 77:
      return {
        label: 'Snow Grains',
        description: 'Very small white opaque grains of ice',
        iconName: 'Snowflake',
        category: 'snow',
        bgGradient: 'from-slate-400/20 via-sky-200/10 to-transparent',
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Rain Showers',
        description: 'Passing rain showers with rapid intensity variations',
        iconName: 'CloudRain',
        category: 'rain',
        bgGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      };
    case 85:
    case 86:
      return {
        label: 'Snow Showers',
        description: 'Sudden brief snow flurries and showers',
        iconName: 'Snowflake',
        category: 'snow',
        bgGradient: 'from-sky-400/20 via-slate-400/10 to-transparent',
      };
    case 95:
      return {
        label: 'Thunderstorm',
        description: 'Active lightning activity with gusty localized winds',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        bgGradient: 'from-amber-500/20 via-indigo-900/15 to-transparent',
      };
    case 96:
    case 99:
      return {
        label: 'Severe Thunderstorm & Hail',
        description: 'Severe thunderstorm accompanied by hail stones',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        bgGradient: 'from-purple-600/20 via-slate-900/20 to-transparent',
      };
    default:
      return {
        label: 'Clear / Mixed',
        description: 'Standard atmospheric conditions',
        iconName: 'Sun',
        category: 'clear',
        bgGradient: 'from-sky-400/15 via-blue-400/5 to-transparent',
      };
  }
}

/**
 * Generates smart planning recommendations based on current and forecasted conditions
 */
export function generateRecommendations(
  temp: number,
  humidity: number,
  windSpeed: number,
  precipSumToday: number,
  daily: DailyForecastItem[]
): SmartRecommendation[] {
  const recommendations: SmartRecommendation[] = [];

  // 1. Precipitation rule
  const maxPrecipUpcoming = Math.max(...daily.slice(0, 3).map((d) => d.precipitationSum));
  if (precipSumToday > 0 || maxPrecipUpcoming > 0.5) {
    recommendations.push({
      id: 'rain-alert',
      type: 'rain',
      title: 'Carry an Umbrella & Rain Protection',
      description:
        precipSumToday > 2
          ? `Expected precipitation is ${precipSumToday.toFixed(1)} mm today. Keep a sturdy umbrella or waterproof jacket handy for commutes.`
          : `Light precipitation (${precipSumToday.toFixed(1)} mm) detected. Keep a compact umbrella in your bag just in case.`,
      icon: 'Umbrella',
      badge: 'Precipitation Warning',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    });
  } else {
    recommendations.push({
      id: 'dry-outlook',
      type: 'pleasant',
      title: 'No Rain Expected Today',
      description: 'Zero precipitation forecasted for today. Ideal conditions for outdoor dining, commuting, and errands.',
      icon: 'CheckCircle2',
      badge: 'Dry Conditions',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    });
  }

  // 2. Temperature rule
  if (temp > 30) {
    recommendations.push({
      id: 'heat-alert',
      type: 'sun',
      title: 'Wear Sunscreen & Breathable Clothes',
      description: `Current temperature is a warm ${temp.toFixed(1)}°C. Apply SPF 30+ sunscreen, wear lightweight cotton clothing, and maintain optimal hydration throughout the day.`,
      icon: 'SunMedium',
      badge: 'Warm Weather Advisory',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    });
  } else if (temp < 15) {
    recommendations.push({
      id: 'cold-alert',
      type: 'cold',
      title: 'Stay Warm & Layer Up',
      description: `Chilly conditions at ${temp.toFixed(1)}°C. Dress in insulating layers, wear a windproof jacket or sweater, and consider a warm beverage before heading out.`,
      icon: 'ThermometerSnowflake',
      badge: 'Cool Temperatures',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    });
  } else {
    recommendations.push({
      id: 'pleasant-temp',
      type: 'pleasant',
      title: 'Ideal & Comfortable Temperature',
      description: `Current temperature is a mild ${temp.toFixed(1)}°C. Perfect atmospheric balance for jogging, cycling, or outdoor meetings.`,
      icon: 'Sparkles',
      badge: 'Comfort Zone',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    });
  }

  // 3. Wind speed rule
  if (windSpeed >= 28) {
    recommendations.push({
      id: 'wind-alert',
      type: 'wind',
      title: 'High Wind Velocity Caution',
      description: `Wind gusts measured around ${windSpeed.toFixed(1)} km/h. Secure loose patio items and take extra caution when cycling or driving high-sided vehicles.`,
      icon: 'Wind',
      badge: 'Breezy Advisory',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    });
  } else if (windSpeed > 15) {
    recommendations.push({
      id: 'gentle-breeze',
      type: 'pleasant',
      title: 'Refreshing Moderate Breeze',
      description: `Wind speed is at a pleasant ${windSpeed.toFixed(1)} km/h, providing natural cooling and great outdoor air circulation.`,
      icon: 'Wind',
      badge: 'Moderate Breeze',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    });
  }

  // 4. Humidity rule
  if (humidity >= 75) {
    recommendations.push({
      id: 'humidity-alert',
      type: 'humidity',
      title: 'Elevated Relative Humidity',
      description: `Relative humidity is high at ${humidity}%. It will feel warmer than the actual thermometer reading. Stay well-hydrated.`,
      icon: 'Droplets',
      badge: 'High Humidity',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    });
  } else if (humidity < 30) {
    recommendations.push({
      id: 'dry-air',
      type: 'humidity',
      title: 'Dry Air Notice',
      description: `Relative humidity is low at ${humidity}%. Consider using a moisturizer or lip balm to prevent dry skin.`,
      icon: 'Droplets',
      badge: 'Low Humidity',
      badgeColor: 'bg-stone-100 text-stone-800 border-stone-200',
    });
  }

  return recommendations;
}

export function formatForecastDate(dateStr: string, index: number): { formattedDate: string; dayOfWeek: string } {
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) {
    return { formattedDate: dateStr, dayOfWeek: 'Day ' + (index + 1) };
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : days[date.getDay()];
  const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;

  return { formattedDate, dayOfWeek };
}
