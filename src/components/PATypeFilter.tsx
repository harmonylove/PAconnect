
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
import { PAType, paTypeLabels } from '@/types';

interface PATypeFilterProps {
  selected: PAType[];
  onChange: (types: PAType[]) => void;
}

export default function PATypeFilter({ selected, onChange }: PATypeFilterProps) {
  const allPATypes = Object.keys(paTypeLabels) as PAType[];
  
  const toggleType = (type: PAType) => {
    if (selected.includes(type)) {
      onChange(selected.filter(t => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  const selectAll = () => {
    onChange(allPATypes);
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
              ? 'All PA Types' 
              : selected.length === allPATypes.length 
                ? 'All PA Types' 
                : `${selected.length} PA Types Selected`}
          </span>
          <span className="ml-2">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800">
        <DropdownMenuLabel>PA Types</DropdownMenuLabel>
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
          {allPATypes.map((type) => (
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
                {paTypeLabels[type]}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
