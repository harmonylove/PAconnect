
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductionType, productionTypeLabels } from '@/types';

interface ProductionTypeFilterProps {
  selected: ProductionType[];
  onChange: (types: ProductionType[]) => void;
}

export default function ProductionTypeFilter({ selected, onChange }: ProductionTypeFilterProps) {
  const allProductionTypes = Object.keys(productionTypeLabels) as ProductionType[];
  
  const toggleType = (type: ProductionType) => {
    if (selected.includes(type)) {
      onChange(selected.filter(t => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  const selectAll = () => {
    onChange(allProductionTypes);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>
            {selected.length === 0 
              ? 'All Production Types' 
              : selected.length === allProductionTypes.length 
                ? 'All Production Types' 
                : `${selected.length} Types Selected`}
          </span>
          <span className="ml-2">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800">
        <DropdownMenuLabel>Production Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex justify-between px-2 py-1.5">
          <Button variant="ghost" size="sm" onClick={selectAll} className="h-8 text-xs">
            Select All
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 text-xs">
            Clear All
          </Button>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-72 overflow-y-auto">
          {allProductionTypes.map((type) => (
            <DropdownMenuCheckboxItem
              key={type}
              checked={selected.includes(type)}
              onSelect={(e) => {
                e.preventDefault();
                toggleType(type);
              }}
            >
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 flex items-center justify-center border rounded">
                  {selected.includes(type) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                {productionTypeLabels[type]}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
