
import { Thermometer } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Weather } from '@/lib/types';
import type { Dispatch, SetStateAction } from 'react';
import WeatherIcon from '@/components/weather/WeatherIcon';
import { locations } from '@/lib/db';

export default function WeatherSettings({
  data, 
  selectedLocation, 
  setSelectedLocation, 
  weather, 
}: {
  /** TODO: avoid passing objects as props */
  data: {
    isError: boolean
    isLoading: boolean
  }
  selectedLocation: string
  setSelectedLocation: Dispatch<SetStateAction<string>>
  /** TODO: avoid passing objects as props */
  weather: Weather | undefined
}) {
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      {/* <h3 className="text-lg font-semibold mb-4">Weather Settings</h3> */}
      
      <div className="mb-4">
        <Label htmlFor="location">
          Location:
        </Label>
        
        <Select
          value={selectedLocation}
          onValueChange={setSelectedLocation}
        >
          <SelectTrigger id="location" className="mt-2 bg-gray-600 border-gray-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.value} value={location.value}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg">
        <div className="flex items-center">
          <WeatherIcon 
            isError={data.isError}
            isLoading={data.isLoading}
            weather={weather}
          ></WeatherIcon>
          
          <span className="ml-2 capitalize">
            {weather?.condition ?? 'Loading...'}
          </span>
        </div>
        {weather?.temperature != null && (
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-1" />
            <span>
              {weather.temperature} °C
            </span>
          </div>
        )}
      </div>
      
    </div>
  );
}
