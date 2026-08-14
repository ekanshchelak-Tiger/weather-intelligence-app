import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  Snowflake,
  CloudLightning,
  CloudHail,
  Wind,
  Droplets,
  Umbrella,
  CheckCircle2,
  ThermometerSnowflake,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6', size }) => {
  const iconProps = { className, size };

  switch (name) {
    case 'Sun':
      return <Sun {...iconProps} />;
    case 'SunMedium':
      return <SunMedium {...iconProps} />;
    case 'CloudSun':
      return <CloudSun {...iconProps} />;
    case 'Cloud':
      return <Cloud {...iconProps} />;
    case 'CloudFog':
      return <CloudFog {...iconProps} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...iconProps} />;
    case 'CloudRain':
      return <CloudRain {...iconProps} />;
    case 'CloudRainWind':
      return <CloudRainWind {...iconProps} />;
    case 'CloudSnow':
      return <CloudSnow {...iconProps} />;
    case 'Snowflake':
      return <Snowflake {...iconProps} />;
    case 'CloudLightning':
      return <CloudLightning {...iconProps} />;
    case 'CloudHail':
      return <CloudHail {...iconProps} />;
    case 'Wind':
      return <Wind {...iconProps} />;
    case 'Droplets':
      return <Droplets {...iconProps} />;
    case 'Umbrella':
      return <Umbrella {...iconProps} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...iconProps} />;
    case 'ThermometerSnowflake':
      return <ThermometerSnowflake {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'AlertTriangle':
      return <AlertTriangle {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};
