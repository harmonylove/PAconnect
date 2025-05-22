
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, History, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import JobHistory from '@/components/JobHistory';
import Header from '@/components/Header';
import { Assistant, JobHistoryItem, productionTypeLabels } from '@/types';

// Mock data for a sample assistant
const mockAssistant: Assistant = {
  id: "a1",
  userId: "u1",
  name: "Sara Johnson",
  photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  bio: "Professional PA with 5+ years of experience in film and TV production. I specialize in keeping sets organized and running efficiently. Always punctual, detail-oriented, and ready to solve problems before they arise.",
  experience: [
    "Managed schedules for directors and talent on multiple award-winning productions",
    "Coordinated logistics for shoots in challenging locations",
    "Experienced with high-pressure environments and tight deadlines"
  ],
  specialties: ["film", "tv", "documentary"],
  location: "Los Angeles, CA",
  availableCities: ["San Francisco", "San Diego", "Las Vegas"],
  rating: 4.9,
  jobHistory: [
    {
      id: '1',
      title: 'Production Assistant',
      company: 'Warner Bros',
      location: 'Los Angeles, CA',
      startDate: new Date(2024, 2, 10),
      endDate: new Date(2024, 2, 24),
      productionType: 'film',
      description: 'Assisted with set operations and logistics for a feature film.'
    },
    {
      id: '2',
      title: 'PA',
      company: 'Sony Music',
      location: 'New York, NY',
      startDate: new Date(2024, 1, 5),
      endDate: new Date(2024, 1, 7),
      productionType: 'music_video',
      description: 'Worked on a music video shoot for a major artist.'
    },
    {
      id: '3',
      title: 'Assistant',
      company: 'ABC Studios',
      location: 'Los Angeles, CA',
      startDate: new Date(2023, 11, 15),
      endDate: new Date(2024, 0, 15),
      productionType: 'tv',
      description: 'Month-long contract for a TV series production.'
    }
  ]
};

// In a real app, we would fetch the assistant data based on the ID from params
export default function AssistantProfile() {
  const { id } = useParams();
  const assistant = mockAssistant; // In real app: Would fetch based on id

  // For a real implementation, this would be a loading state until data is fetched
  if (!assistant) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
          <div>Loading assistant profile...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="mb-6">
          <Link to="/talents" className="inline-flex items-center text-brand-blue hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Assistants
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Header/Banner section */}
          <div className="relative h-40 bg-gradient-to-r from-brand-blue-100 to-brand-teal-50">
            <div className="absolute bottom-0 left-0 w-full p-6 pt-20 pb-0">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={assistant.photo} alt={assistant.name} />
                <AvatarFallback className="text-xl font-semibold bg-brand-blue text-white">
                  {assistant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="pt-12 px-6 pb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
              <div>
                <h1 className="text-2xl font-bold">{assistant.name}</h1>
                <div className="flex items-center mt-1">
                  <span className="text-muted-foreground">{assistant.location}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{assistant.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button className="bg-brand-teal hover:bg-brand-teal-600">
                  Contact
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Left column - Bio and Experience */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="font-semibold text-lg mb-2">About</h2>
                  <p className="text-muted-foreground">{assistant.bio}</p>
                </div>
                
                <div>
                  <h2 className="font-semibold text-lg mb-2">Experience</h2>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {assistant.experience.map((exp, index) => (
                      <li key={index}>{exp}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="font-semibold text-lg mb-2">Job History</h2>
                  <JobHistory history={assistant.jobHistory || []} title="" />
                </div>
              </div>
              
              {/* Right column - Details and Specialties */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-semibold text-lg mb-2">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {assistant.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-sm">
                        {productionTypeLabels[specialty]}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="font-semibold text-lg mb-2">Available Locations</h2>
                  <div className="text-muted-foreground">
                    <div className="font-medium text-foreground">{assistant.location}</div>
                    {assistant.availableCities.length > 0 && (
                      <div className="mt-1">
                        Also available in: {assistant.availableCities.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
