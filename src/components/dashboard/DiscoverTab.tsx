
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AssistantCard from '@/components/AssistantCard';
import JobCard from '@/components/JobCard';
import ProductionTypeFilter from '@/components/ProductionTypeFilter';
import { Assistant, Job, UserRole } from '@/types';

interface DiscoverTabProps {
  userRole: UserRole;
}

// Mock data
const mockAssistants: Assistant[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Sara Johnson',
    photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    bio: 'Experienced production assistant with 5+ years in TV and film. Strong organizational skills and attention to detail.',
    experience: ['NBC Universal', 'Warner Bros', 'Independent Films'],
    specialties: ['tv', 'film', 'commercial'],
    location: 'Los Angeles, CA',
    availableCities: ['New York', 'Atlanta'],
    rating: 4.8
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Mike Chen',
    photo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    bio: 'Music video specialist with 3 years experience. Worked on over 50 productions with major artists.',
    experience: ['Sony Music', 'Universal Music Group'],
    specialties: ['music_video', 'commercial'],
    location: 'Atlanta, GA',
    availableCities: ['Miami', 'Nashville'],
    rating: 4.5
  },
];

const mockJobs: Job[] = [
  {
    id: '1',
    productionId: 'prod1',
    title: 'Production Assistant - Feature Film',
    description: 'Looking for an experienced PA for a 2-week feature film shoot. Must have previous set experience.',
    startDate: new Date(2025, 5, 10),
    endDate: new Date(2025, 5, 24),
    location: 'Los Angeles, CA',
    productionType: 'film',
    rate: '$250/day',
    requirements: ['Valid driver\'s license', '2+ years set experience', 'Available for full shoot period']
  },
  {
    id: '2',
    productionId: 'prod2',
    title: 'Commercial Shoot - 3 Day PA Needed',
    description: 'Fast-paced commercial shoot needs production assistant for 3 days. Experience with commercial production preferred.',
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 5, 17),
    location: 'New York, NY',
    productionType: 'commercial',
    rate: '$300/day',
    requirements: ['Commercial experience', 'Local to NYC']
  }
];

const DiscoverTab = ({ userRole }: DiscoverTabProps) => {
  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-1/3">
          <ProductionTypeFilter 
            selected={[]} 
            onChange={() => {}} 
          />
        </div>
      </div>
      
      {userRole === 'assistant' ? (
        /* Show jobs to assistants */
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Available Jobs</h2>
            <Link to="/jobs">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockJobs.map(job => (
              <JobCard 
                key={job.id}
                job={job}
                onApply={() => {}}
                onViewDetails={() => {}}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Show assistants to productions */
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Top Production Assistants</h2>
            <Link to="/talents">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAssistants.map(assistant => (
              <AssistantCard 
                key={assistant.id}
                assistant={assistant}
                onContact={() => {}}
                onViewProfile={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverTab;
