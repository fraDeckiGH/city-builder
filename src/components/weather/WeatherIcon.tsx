
import { Home, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';
import { Weather } from '@/lib/types';

/** render weather icon based on condition */
export default function WeatherIcon({
  isError, 
  isLoading, 
  weather, 
}: {
  isError: boolean
  isLoading: boolean
  weather: Weather | undefined
}) {
  if (isLoading) return <Sun className="h-8 w-8 animate-spin" />;
  if (isError) return <Cloud className="h-8 w-8 text-red-400" />;
  if (!weather) return <Sun className="h-8 w-8" />;

  switch (weather.condition) {
    case 'clear':
      return <Sun className="h-8 w-8 text-yellow-400" />;
    case 'clouds':
      return <Cloud className="h-8 w-8 text-gray-400" />;
    case 'rain':
    case 'drizzle':
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    case 'snow':
      return <CloudSnow className="h-8 w-8 text-blue-200" />;
    default:
      return <Sun className="h-8 w-8" />;
  }
}
