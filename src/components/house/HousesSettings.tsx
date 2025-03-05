
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { House } from '@/lib/types';
import { memo, use, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useHouses } from '@/components/CityBuilder';
import { colors } from '@/lib/db';

export default memo(function HousesSettings({ 
  children, 
}: {
  children: ReactNode
}) {
  const { houses, setHouses } = useHouses()
  
  // future: I expect this func to disappear from here, once using 'useReducer'
  const addHouse = () => {
    const newHouse: House = {
      id: Date.now().toString(),
      name: `House ${houses.length + 1}`,
      floors: Math.floor(Math.random() * 10) + 1,
      color: colors[Math.floor(Math.random() * colors.length)].value,
    }
    
    setHouses((houses) => ([...houses, newHouse]));
  }
  
  return (<>
    {/* <h3 className="text-lg font-semibold">House list</h3> */}
    
    {children}
    
    <Button 
      onClick={addHouse} 
      className="w-full"
      variant="outline"
    >
      <Home className="mr-1 h-4 w-4" /> 
      Build a new house
    </Button>
  </>);
})
