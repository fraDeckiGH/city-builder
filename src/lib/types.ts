
export type {
  Color, 
  House, 
  Location, 
  Weather, 
}


interface Color {
  name: string
  value: string
}

interface House {
  id: string
  name: string
  floors: number
  color: Color["value"]
}

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




