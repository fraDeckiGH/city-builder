
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { memo, use } from 'react';
import type { ReactNode } from 'react';
import { SetHousesContext } from '@/components/CityBuilder';

export default memo(function HousesSettings({ 
  children, 
}: {
  children: ReactNode
}) {
  const dispatch = use(SetHousesContext)
  
  return (<>
    {/* <h3 className="text-lg font-semibold">House list</h3> */}
    
    {children}
    
    <Button 
      onClick={(e) => dispatch({ type: "add" })} 
      className="w-full"
      variant="outline"
    >
      <Home className="mr-1 h-4 w-4" /> 
      Build a new house
    </Button>
  </>);
})
