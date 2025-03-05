
import { Thermometer } from 'lucide-react';
import { Weather } from '@/lib/types';
import WeatherIcon from '@/components/weather/WeatherIcon';

export default function WeatherDisplay({
  data, 
  weather, 
}: {
  /** TODO: avoid passing objects as props */
  data: {
    isError: boolean
    isLoading: boolean
  }
  /** TODO: avoid passing objects as props */
  weather: Weather | undefined
}) {
  return (<>
    <div className="absolute top-4 right-4 
      bg-gray-700 bg-opacity-70 p-2 rounded-lg
      flex items-center gap-2 
    ">
      <WeatherIcon 
        isError={data.isError}
        isLoading={data.isLoading}
        weather={weather}
      ></WeatherIcon>
      
      {weather?.temperature != null && (
        <div className="flex items-center">
          <Thermometer className="h-5 w-5 mr-1" />
          <span>
            {weather?.temperature} °C
          </span>
        </div>
      )}
    </div>
  </>);
}
