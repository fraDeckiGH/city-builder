import { houses } from "@/lib/db"

export type {
  Color, 
  Func, 
  House, 
  Houses, 
  Location, 
  Weather, 
}


interface Color {
  name: string
  value: string
}

type Func<T = void> = (...args: any[]) => T

interface House {
  id: string
  name: string
  floors: number
  color: Color["value"]
}
type Houses = typeof houses

interface Location {
  name: string
  value: string
  lat: number
  lon: number
}

interface Weather {
  temperature: number
  // condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy'
  condition: 'clear' | 'clouds' | 'rain' | 'snow' |  'drizzle'
}




