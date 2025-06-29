
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import InteractiveJobMap from '@/components/InteractiveJobMap';
import JobSearchFilters from '@/components/JobSearchFilters';
import JobListView from '@/components/JobListView';
import { Job } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Mock jobs data
const mockJobs: Job[] = [
  {
    id: 'j1',
    productionId: 'p1',
    title: 'Set PA - Feature Film',
    description: 'We need an experienced Set PA for our upcoming feature film shooting in Los Angeles. Must be reliable, punctual, and able to work long hours.',
    startDate: new Date(2025, 6, 15),
    endDate: new Date(2025, 6, 25),
    location: 'Los Angeles, CA',
    productionType: 'film',
    paType: 'set_pa',
    rate: '$200/day',
    requirements: ['3+ years experience', 'Own transportation', 'Available weekends'],
    applicants: ['a1', 'a2', 'a3']
  },
  {
    id: 'j2',
    productionId: 'p2',
    title: 'Truck PA - Music Video',
    description: 'Looking for a Truck PA for a high-energy music video shoot. Experience with equipment handling required.',
    startDate: new Date(2025, 6, 20),
    endDate: new Date(2025, 6, 21),
    location: 'Beverly Hills, CA',
    productionType: 'music_video',
    paType: 'truck_pa',
    rate: '$250/day',
    requirements: ['Heavy lifting capability', 'Equipment experience', 'Clean driving record'],
    applicants: ['a2', 'a4']
  },
  {
    id: 'j3',
    productionId: 'p3',
    title: 'Script PA - TV Series',
    description: 'TV series looking for a detail-oriented Script PA. Must be familiar with script coordination and continuity.',
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2025, 7, 30),
    location: 'Burbank, CA',
    productionType: 'tv',
    paType: 'script_pa',
    rate: '$225/day',
    requirements: ['Script software experience', 'Attention to detail', 'Long-term availability'],
    applicants: ['a1', 'a3', 'a5', 'a6']
  }
];

export default function FindJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [productionTypeFilter, setProductionTypeFilter] = useState('all');
  const [paTypeFilter, setPaTypeFilter] = useState('all');
  const { toast } = useToast();

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesProductionType = productionTypeFilter === 'all' || job.productionType === productionTypeFilter;
    const matchesPaType = paTypeFilter === 'all' || job.paType === paTypeFilter;
    
    return matchesSearch && matchesLocation && matchesProductionType && matchesPaType;
  });

  const handleApply = (jobId: string) => {
    console.log('Applying to job:', jobId);
    toast({
      title: "Application Submitted",
      description: "Your application has been sent to the production company.",
    });
  };

  const handleMapJobApply = (job: Job) => {
    handleApply(job.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header userRole="assistant" />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Jobs</h1>
          <p className="text-muted-foreground">
            Discover available PA positions from production companies
          </p>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="list">Job List</TabsTrigger>
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map">
            <InteractiveJobMap onJobApply={handleMapJobApply} />
          </TabsContent>
          
          <TabsContent value="list" className="space-y-6">
            <JobSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              productionTypeFilter={productionTypeFilter}
              setProductionTypeFilter={setProductionTypeFilter}
              paTypeFilter={paTypeFilter}
              setPaTypeFilter={setPaTypeFilter}
            />

            <JobListView filteredJobs={filteredJobs} onApply={handleApply} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
