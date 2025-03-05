
import { useHouses } from '@/components/CityBuilder';
import { House } from '@/lib/types';

export default function HouseDrawing({
  id, 
}: {
  id: House["id"]
}) {
  const { houses } = useHouses()
  const house = houses.find(house => house.id === id)
  
  return (<>
    {house && (
      <div className="relative flex flex-col items-center">
        {/* house */}
        <div
          className="mt-12 w-32 relative border-2 border-white rounded-sm"
          style={{
            backgroundColor: house.color,
          }}
        >
          {/* roof */}
          <div
            className="absolute -top-[30px] left-[-2px] w-0 h-0 border-l-[64px] border-r-[64px] border-b-[30px] border-l-transparent border-r-transparent border-b-white"
          />

          {/* 2x windows */}
          {Array.from({ length: (house.floors - 1) }).map((_, index) => (
            <div key={index} className="flex justify-center mt-2 gap-4">
              <div className="w-6 h-8 bg-black rounded-sm" />
              <div className="w-6 h-8 bg-black rounded-sm" />
            </div>
          ))}

          {/* window + door (1st floor) */}
          <div className="flex justify-center mt-2 gap-4">
            {/* window */}
            <div className="w-6 h-8 bg-black rounded-sm" />
            {/* door */}
            <div className="w-6 h-12 bg-black rounded-t-md" />
          </div>
        </div>

        {/* house.name */}
        <div className="mt-2 text-xs text-center w-32 truncate">
          {house.name}
        </div>
      </div>
    )}
  </>);
}
