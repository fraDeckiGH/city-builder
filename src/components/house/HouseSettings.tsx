
import { Trash2, Copy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { House } from '@/lib/types';
import { memo, type Dispatch, type SetStateAction } from 'react';
import { colors } from '@/lib/db';
import { useHouses } from '@/components/CityBuilder';

export default memo(function HouseSettings({
  id, 
}: {
  id: House["id"]
}) {
  const { houses, setHouses } = useHouses()
  const house = houses.find(house => house.id === id)
  
  // future: I expect these funcs to disappear from here, once using 'useReducer'
  
  const duplicateHouse = (house: House) => {
    const newHouse: House = {
      ...house,
      id: Date.now().toString(),
      name: `${house.name} (Copy)`,
    }
    
    setHouses((houses) => ([...houses, newHouse]));
  }
  
  const removeHouse = (id: string) => {
    setHouses((houses) => ( houses.filter(house => house.id !== id) ));
  }
  
  const updateHouse = (id: string, updates: Partial<House>) => {
    setHouses((houses) => {
      const ret = houses.map(
        (house) => (
          house.id === id ? 
          { ...house, ...updates } : house
        )
      );
      
      return ret
    });
  }
  
  return (<>
    {house && (
      <div className="bg-gray-700 rounded-lg p-4 mb-4">
        
        <div className="flex justify-between items-center mb-3">
          <Input
            value={house.name}
            onChange={(e) => updateHouse(house.id, { name: e.target.value })}
            className="max-w-48 bg-gray-600 border-gray-500"
          />
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => duplicateHouse(house)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost-destructive" 
              size="icon"
              onClick={() => removeHouse(house.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="part part--floors">
            <Label htmlFor={`floors-${house.id}`}>
              Floors: {house.floors}
            </Label>
            
            <Slider
              id={`floors-${house.id}`}
              min={1}
              max={10}
              step={1}
              value={[house.floors]}
              onValueChange={(value) => updateHouse(house.id, { floors: value[0] })}
              className="mt-4"
            />
          </div>
          
          <div className="part part--color">
            <Label htmlFor={`color-${house.id}`}>
              Color:
            </Label>
            
            <Select
              value={house.color}
              onValueChange={(value) => updateHouse(house.id, { color: value })}
            >
              <SelectTrigger 
                id={`color-${house.id}`} 
                className="
                  mt-2 border-gray-600
                "
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colors.map(color => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
      </div>
    )}
  </>);
})
