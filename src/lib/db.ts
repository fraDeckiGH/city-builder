import { Color, House, Location } from "@/lib/types"

export {
  colors,
  locations,
  houses,
}


/** future: have the user add these on-the-fly */
const colors: Color[] = [
  { name: 'Blue', value: '#1E88E5' },
  { name: 'Teal', value: '#26A69A' },
  { name: 'Orange', value: '#FB8C00' },
  { name: 'Pink', value: '#D81B60' },
  { name: 'Purple', value: '#8E24AA' },
  { name: 'Green', value: '#43A047' },
  { name: 'Red', value: '#E53935' },
  { name: 'Amber', value: '#FFB300' },
]


const houses/* Array */: House[] = [
  { 
    id: '1', 
    name: 'House 1', 
    floors: 3, 
    color: colors.find((obj) => obj.name === 'Teal')?.value ?? '#26A69A' 
  },
  { 
    id: '2', 
    name: 'House 2', 
    floors: 5, 
    color: colors.find((obj) => obj.name === 'Pink')?.value ?? '#D81B60' 
  },
  { 
    id: '3', 
    name: 'House 3', 
    floors: 2, 
    color: colors.find((obj) => obj.name === 'Blue')?.value ?? '#1E88E5' 
  },
  { 
    id: '4', 
    name: 'House 4', 
    floors: 4, 
    color: colors.find((obj) => obj.name === 'Green')?.value ?? '#43A047' 
  },
]
// const houses = new Map<House["id"], House>(housesArray.map((house) => [house.id, house]))


const locations: Location[] = [
  { name: 'New York', value: 'new-york', lat: 40.7128, lon: -74.0060 },
  { name: 'London', value: 'london', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', value: 'tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', value: 'sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Paris', value: 'paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Singapore', value: 'singapore', lat: 1.3521, lon: 103.8198 },
]



