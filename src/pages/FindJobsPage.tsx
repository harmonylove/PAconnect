import { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Filter, Star, Map } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import InteractiveJobMap from '@/components/InteractiveJobMap';
import { Job, productionTypeLabels, paTypeLabels } from '@/types';
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
            {/* Search and Filters */}
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

            {/* Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                </h2>
              </div>

              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{job.rate}</div>
                        <div className="text-sm text-muted-foreground">
                          {job.applicants?.length || 0} applicants
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">
                        {productionTypeLabels[job.productionType]}
                      </Badge>
                      <Badge variant="outline" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                        {paTypeLabels[job.paType]}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {job.startDate.toLocaleDateString()} - {job.endDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {job.rate}
                      </div>
                    </div>
                    
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 mr-1" />
                        Posted by verified production company
                      </div>
                      <Button 
                        onClick={() => handleApply(job.id)}
                        className="bg-brand-teal hover:bg-brand-teal-600"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredJobs.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria to find more opportunities.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
