import { GeocodingApiResponse, GeocodingResult, WeatherApiResponse, WeatherData, DailyForecastItem } from '../types';
import { getWeatherCondition, formatForecastDate } from '../utils/weatherUtils';

export class WeatherApiError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

/**
 * Searches for a city name using Open-Meteo Geocoding API
 */
export async function searchCity(query: string): Promise<GeocodingResult[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new WeatherApiError('Please enter a valid city name.');
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new WeatherApiError(`Geocoding request failed with status: ${res.status}`);
    }

    const data: GeocodingApiResponse = await res.json();
    if (!data.results || data.results.length === 0) {
      throw new WeatherApiError('City not found. Please try another location.', 'NOT_FOUND');
    }

    return data.results;
  } catch (err: unknown) {
    if (err instanceof WeatherApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Network error while searching city';
    throw new WeatherApiError(message, 'NETWORK_ERROR');
  }
}

/**
 * Fetches current weather and 7-day daily forecast for coordinates
 */
export async function fetchWeatherData(location: GeocodingResult): Promise<WeatherData> {
  try {
    const { latitude, longitude, name, country, admin1, timezone } = location;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new WeatherApiError(`Weather forecast request failed with status: ${res.status}`);
    }

    const data: WeatherApiResponse = await res.json();

    if (!data.current || !data.daily || !data.daily.time) {
      throw new WeatherApiError('Incomplete weather forecast received from Open-Meteo.', 'DATA_ERROR');
    }

    const currentCondition = getWeatherCondition(data.current.weather_code);

    const dailyItems: DailyForecastItem[] = data.daily.time.map((timeStr, idx) => {
      const weatherCode = data.daily.weather_code[idx] ?? 0;
      const { formattedDate, dayOfWeek } = formatForecastDate(timeStr, idx);

      return {
        date: timeStr,
        formattedDate,
        dayOfWeek,
        weatherCode,
        condition: getWeatherCondition(weatherCode),
        maxTemp: Math.round(data.daily.temperature_2m_max[idx] * 10) / 10,
        minTemp: Math.round(data.daily.temperature_2m_min[idx] * 10) / 10,
        precipitationSum: Math.round((data.daily.precipitation_sum[idx] ?? 0) * 10) / 10,
      };
    });

    return {
      city: name,
      country: country || 'International',
      adminRegion: admin1,
      latitude,
      longitude,
      timezone: timezone || data.timezone || 'UTC',
      current: {
        temperature: Math.round(data.current.temperature_2m * 10) / 10,
        humidity: Math.round(data.current.relative_humidity_2m),
        windSpeed: Math.round(data.current.wind_speed_10m * 10) / 10,
        weatherCode: data.current.weather_code,
        condition: currentCondition,
        time: data.current.time,
      },
      daily: dailyItems.slice(0, 7), // Ensure 7 days
    };
  } catch (err: unknown) {
    if (err instanceof WeatherApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Failed to fetch weather forecast.';
    throw new WeatherApiError(message, 'NETWORK_ERROR');
  }
}
