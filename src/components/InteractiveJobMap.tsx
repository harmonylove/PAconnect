
import { useState } from 'react';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job, productionTypeLabels, paTypeLabels } from '@/types';

interface JobsByState {
  [state: string]: {
    jobs: Job[];
    coordinates: { x: number; y: number };
  };
}

const mockJobsByState: JobsByState = {
  'California': {
    jobs: [
      {
        id: 'ca1',
        productionId: 'p1',
        title: 'Set PA - Feature Film',
        description: 'Experienced Set PA needed for major feature film in Los Angeles.',
        startDate: new Date(2025, 6, 15),
        endDate: new Date(2025, 6, 25),
        location: 'Los Angeles, CA',
        productionType: 'film',
        paType: 'set_pa',
        rate: '$300/day',
        requirements: ['3+ years experience', 'Own transportation']
      },
      {
        id: 'ca2',
        productionId: 'p2',
        title: 'Truck PA - Commercial',
        description: 'Commercial shoot needs experienced Truck PA in San Francisco.',
        startDate: new Date(2025, 6, 20),
        endDate: new Date(2025, 6, 22),
        location: 'San Francisco, CA',
        productionType: 'commercial',
        paType: 'truck_pa',
        rate: '$275/day',
        requirements: ['Heavy lifting', 'CDL preferred']
      }
    ],
    coordinates: { x: 8, y: 60 }
  },
  'New York': {
    jobs: [
      {
        id: 'ny1',
        productionId: 'p3',
        title: 'Script PA - TV Series',
        description: 'Long-running TV series seeks detail-oriented Script PA.',
        startDate: new Date(2025, 7, 1),
        endDate: new Date(2025, 7, 30),
        location: 'New York, NY',
        productionType: 'tv',
        paType: 'script_pa',
        rate: '$350/day',
        requirements: ['Script software experience', 'Attention to detail']
      }
    ],
    coordinates: { x: 85, y: 25 }
  },
  'Georgia': {
    jobs: [
      {
        id: 'ga1',
        productionId: 'p4',
        title: 'Set PA - Music Video',
        description: 'High-energy music video shoot in Atlanta needs experienced Set PA.',
        startDate: new Date(2025, 6, 28),
        endDate: new Date(2025, 6, 29),
        location: 'Atlanta, GA',
        productionType: 'music_video',
        paType: 'set_pa',
        rate: '$250/day',
        requirements: ['Music video experience', 'Flexible schedule']
      }
    ],
    coordinates: { x: 75, y: 55 }
  }
};

interface InteractiveJobMapProps {
  onJobApply?: (job: Job) => void;
}

export default function InteractiveJobMap({ onJobApply }: InteractiveJobMapProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (stateName: string) => {
    setSelectedState(selectedState === stateName ? null : stateName);
  };

  const handleApply = (job: Job) => {
    console.log('Applying to job:', job.id);
    onJobApply?.(job);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Jobs Across the US</h2>
        <p className="text-muted-foreground">Click on states to view available positions</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Container */}
        <div className="flex-1">
          <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4 h-[500px] overflow-hidden">
            {/* Simplified US Map */}
            <svg
              viewBox="0 0 100 60"
              className="w-full h-full"
              style={{ maxHeight: '400px' }}
            >
              {/* Background */}
              <rect width="100" height="60" fill="#f8fafc" />
              
              {/* State indicators */}
              {Object.entries(mockJobsByState).map(([stateName, stateData]) => (
                <g key={stateName}>
                  {/* State marker */}
                  <circle
                    cx={stateData.coordinates.x}
                    cy={stateData.coordinates.y}
                    r={hoveredState === stateName ? "4" : "3"}
                    fill={selectedState === stateName ? "#0f766e" : "#14b8a6"}
                    stroke="#fff"
                    strokeWidth="1"
                    className="cursor-pointer transition-all duration-200 hover:fill-teal-700"
                    onClick={() => handleStateClick(stateName)}
                    onMouseEnter={() => setHoveredState(stateName)}
                    onMouseLeave={() => setHoveredState(null)}
                  />
                  
                  {/* Job count badge */}
                  <circle
                    cx={stateData.coordinates.x + 3}
                    cy={stateData.coordinates.y - 3}
                    r="2"
                    fill="#ef4444"
                    className="cursor-pointer"
                    onClick={() => handleStateClick(stateName)}
                  />
                  <text
                    x={stateData.coordinates.x + 3}
                    y={stateData.coordinates.y - 2.5}
                    textAnchor="middle"
                    fontSize="2"
                    fill="white"
                    className="cursor-pointer font-bold"
                    onClick={() => handleStateClick(stateName)}
                  >
                    {stateData.jobs.length}
                  </text>
                  
                  {/* State label */}
                  <text
                    x={stateData.coordinates.x}
                    y={stateData.coordinates.y + 8}
                    textAnchor="middle"
                    fontSize="3"
                    fill="#374151"
                    className="font-medium cursor-pointer"
                    onClick={() => handleStateClick(stateName)}
                  >
                    {stateName}
                  </text>
                </g>
              ))}
              
              {/* Legend */}
              <g transform="translate(5, 5)">
                <rect width="25" height="12" fill="rgba(255,255,255,0.9)" rx="2" />
                <circle cx="3" cy="4" r="1.5" fill="#14b8a6" />
                <text x="6" y="5" fontSize="2" fill="#374151">Available Jobs</text>
                <circle cx="3" cy="8" r="1" fill="#ef4444" />
                <text x="6" y="9" fontSize="2" fill="#374151">Job Count</text>
              </g>
            </svg>
          </div>
        </div>
        
        {/* Job Listings Panel */}
        <div className="lg:w-96">
          {selectedState ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-brand-teal" />
                <h3 className="text-lg font-semibold">{selectedState} Jobs ({mockJobsByState[selectedState].jobs.length})</h3>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockJobsByState[selectedState].jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{job.title}</CardTitle>
                      <div className="flex gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {productionTypeLabels[job.productionType]}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                          {paTypeLabels[job.paType]}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {job.startDate.toLocaleDateString()} - {job.endDate.toLocaleDateString()}
                        </div>
                        
                        {job.rate && (
                          <div className="flex items-center text-green-600 font-medium">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {job.rate}
                          </div>
                        )}
                        
                        <p className="text-muted-foreground text-xs line-clamp-2">
                          {job.description}
                        </p>
                        
                        <Button 
                          size="sm" 
                          className="w-full bg-brand-teal hover:bg-brand-teal-600"
                          onClick={() => handleApply(job)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a State</h3>
                <p className="text-muted-foreground">Click on a state marker to view available job opportunities</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
