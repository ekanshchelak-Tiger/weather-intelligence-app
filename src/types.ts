export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country: string;
  admin1?: string;
  timezone?: string;
}

export interface GeocodingApiResponse {
  results?: GeocodingResult[];
  generationtime_ms?: number;
}

export interface CurrentWeatherRaw {
  time: string;
  interval?: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyWeatherRaw {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: CurrentWeatherRaw;
  daily: DailyWeatherRaw;
}

export interface WeatherConditionInfo {
  label: string;
  description: string;
  iconName: string;
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  bgGradient: string;
}

export interface DailyForecastItem {
  date: string;
  formattedDate: string;
  dayOfWeek: string;
  weatherCode: number;
  condition: WeatherConditionInfo;
  maxTemp: number;
  minTemp: number;
  precipitationSum: number;
}

export interface WeatherData {
  city: string;
  country: string;
  adminRegion?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    condition: WeatherConditionInfo;
    time: string;
  };
  daily: DailyForecastItem[];
}

export interface SmartRecommendation {
  id: string;
  type: 'rain' | 'sun' | 'cold' | 'wind' | 'pleasant' | 'humidity';
  title: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
}
