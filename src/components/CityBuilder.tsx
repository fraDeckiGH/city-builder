'use client';

import { createContext, memo, use, useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { House, Location, Weather } from '@/lib/types';
import WeatherSettings from '@/components/weather/WeatherSettings';
import HouseSettings from '@/components/house/HouseSettings';
import HouseDrawing from '@/components/house/HouseDrawing';
import HousesSettings from '@/components/house/HousesSettings';
import WeatherDisplay from '@/components/weather/WeatherDisplay';
import { 
  houses as housesInitialValue, 
  locations 
} from '@/lib/db';


// TODO: move elsewhere
// #region house
function useHousesState(initialValue: House[]) {
  // TODO: use 'useReducer' instead
  const [houses, setHouses] = useState(initialValue)

  return ({
    houses,
    setHouses,
  })
}

const HousesContext = createContext<(ReturnType<typeof useHousesState>) | null>(null)

export function useHouses() {
  const context = use(HousesContext)
  if (!context) {
    throw new Error('useHouses must be used within a HousesContext.Provider');
  }
  return context
}
// #endregion house


// TODO: move elsewhere
// #region weather API
/** mock weather API */
const fetchWeatherMock = async (location: string): Promise<Weather> => {
  // simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // mock data based on location
  switch (location) {
    case 'new-york':
      return { temperature: 18, condition: 'clear' };
    case 'london':
      return { temperature: 12, condition: 'rain' };
    case 'tokyo':
      return { temperature: 22, condition: 'clouds' };
    case 'sydney':
      return { temperature: 25, condition: 'clear' };
    case 'paris':
      // investigate: html breaks if I do "weather?.temperature && ..."
      return { temperature: 0, condition: 'snow' };
    default:
      return { temperature: 20, condition: 'clear' };
  }
}

/** WIP: real weather API */
const fetchWeather = async (location: string): Promise<Weather> => {
  const selectedLocation = locations.find((loc) => (loc.value === location));
  if (!selectedLocation) throw new Error('Invalid location');
  
  const response = await fetch(
    // `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&appid=${API_KEY}&units=metric`
    // wip
    `https://api.open-meteo.com/v1/forecast?latitude=1.3521&longitude=103.8198&current=weather_code,apparent_temperature,is_day&timezone=auto`
  );

  if (!response.ok) {
    throw new Error('Weather data fetch failed');
  }

  const data = await response.json();
  
  return {
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].main.toLowerCase(),
  };
}

function useWeather(selectedLocation: Location["value"]) {
  return useQuery({
    queryKey: ['weather', selectedLocation],
    queryFn: () => fetchWeatherMock(selectedLocation), 
    // queryFn: () => fetchWeather(selectedLocation), 
    staleTime: 1000 * 60 * 5, // 5min
    retry: 2,
  })
}
// #endregion weather API


export default function CityBuilder() {
  const { houses, setHouses } = useHousesState(housesInitialValue)
  const housesMemoized = useMemo(() => houses, [houses])
  
  const [selectedLocation, setSelectedLocation] = useState(locations[0].value)
  
  // fetch weather data
  const { data: weather, isError, isLoading } = useWeather(selectedLocation)

  return (
    <Card className="overflow-y-auto flex flex-col 
      bg-gray-800 border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-cyan-400">
        City Builder
      </h2>
      
      <HousesContext.Provider value={{
        houses, 
        setHouses, 
      }}>
        <div className="flex overflow-y-auto gap-8">
          <div className="w-full md:w-1/3">
            <Tabs className="max-h-full flex flex-col"
              defaultValue="houses"
            >
              {/* tab buttons */}
              <TabsList className="w-full mb-4">
                <TabsTrigger value="houses" 
                  className="flex-1"
                >
                  Houses
                </TabsTrigger>
                <TabsTrigger value="weather" 
                  className="flex-1"
                >
                  Weather
                </TabsTrigger>
              </TabsList>
              
              {/* tab: houses */}
              <TabsContent value="houses" className="overflow-y-auto 
                px-1 space-y-4">
                <HousesSettings>
                  {housesMemoized.map((house) => (
                    <HouseSettings key={house.id}
                      id={house.id}
                    ></HouseSettings>
                  ))}
                </HousesSettings>
              </TabsContent>
              
              {/* tab: weather */}
              <TabsContent value="weather" className="overflow-y-auto
                px-1">
                <WeatherSettings 
                  data={{
                    isError, 
                    isLoading, 
                  }}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  weather={weather}
                ></WeatherSettings>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* city visualizator */}
          <div className="w-full md:w-2/3 
            overflow-y-auto relative">
            
            <WeatherDisplay 
              data={{
                isError, 
                isLoading, 
              }}
              weather={weather}
            ></WeatherDisplay>
            
            {/* city */}
            <div className="min-h-full
              bg-gray-900 rounded-lg 
              flex items-center justify-center
            ">
              <div className="p-4 
                inline-flex gap-4 flex-wrap items-end 
              ">
                {housesMemoized.map((house) => (
                  <HouseDrawing key={house.id}
                    id={house.id}
                  ></HouseDrawing>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </HousesContext.Provider>
    </Card>
  );
}