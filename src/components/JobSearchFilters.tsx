
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { productionTypeLabels, paTypeLabels } from '@/types';

interface JobSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  productionTypeFilter: string;
  setProductionTypeFilter: (value: string) => void;
  paTypeFilter: string;
  setPaTypeFilter: (value: string) => void;
}

export default function JobSearchFilters({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  productionTypeFilter,
  setProductionTypeFilter,
  paTypeFilter,
  setPaTypeFilter
}: JobSearchFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <Select value={productionTypeFilter} onValueChange={setProductionTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Production Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(productionTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={paTypeFilter} onValueChange={setPaTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="PA Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All PA Types</SelectItem>
              {Object.entries(paTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
