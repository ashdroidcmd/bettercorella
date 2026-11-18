import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  Cloudy,
  Moon,
  Snowflake,
  Sun,
  type LucideIcon,
} from 'lucide-react'

/** Maps an OpenWeather icon code (`01d` … `50n`) to a Lucide icon, so no third-party images load. */
export function weatherIcon(iconCode: string): LucideIcon {
  const night = iconCode.endsWith('n')
  switch (iconCode.slice(0, 2)) {
    case '01':
      return night ? Moon : Sun
    case '02':
      return night ? CloudMoon : CloudSun
    case '03':
      return Cloud
    case '04':
      return Cloudy
    case '09':
      return CloudDrizzle
    case '10':
      return CloudRain
    case '11':
      return CloudLightning
    case '13':
      return Snowflake
    case '50':
      return CloudFog
    default:
      return Cloud
  }
}
