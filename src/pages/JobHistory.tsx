
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import JobHistory from '@/components/JobHistory';
import { JobHistoryItem, UserRole } from '@/types';

// Mock data for job history
const mockAssistantHistory: JobHistoryItem[] = [
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
];

const mockProductionHistory: JobHistoryItem[] = [
  {
    id: '1',
    title: 'Feature Film Production',
    company: 'Self-produced',
    location: 'Los Angeles, CA',
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 3, 30),
    productionType: 'film',
    description: 'Full feature film production with a team of 50 crew members.'
  },
  {
    id: '2',
    title: 'Commercial Shoot',
    company: 'Client: Nike',
    location: 'Portland, OR',
    startDate: new Date(2024, 2, 10),
    endDate: new Date(2024, 2, 12),
    productionType: 'commercial',
    description: 'Television commercial production for major sports brand.'
  }
];

export default function JobHistoryPage() {
  const [userRole, setUserRole] = useState<UserRole>('assistant');
  
  // Switch user perspective for demonstration
  const toggleUserRole = () => {
    setUserRole(prev => prev === 'assistant' ? 'production' : 'assistant');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        userRole={userRole}
        username={userRole === 'assistant' ? 'Sara Johnson' : 'Acme Productions'}
        avatarUrl={userRole === 'assistant' ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' : undefined}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Job History</h1>
        </div>
        
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList>
            <TabsTrigger value="history">My History</TabsTrigger>
            {userRole === 'production' && <TabsTrigger value="assistants">Assistant History</TabsTrigger>}
            {userRole === 'assistant' && <TabsTrigger value="productions">Production History</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="history" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <JobHistory 
              history={userRole === 'assistant' ? mockAssistantHistory : mockProductionHistory} 
              title={userRole === 'assistant' ? "My Work History" : "Our Production History"}
            />
          </TabsContent>
          
          <TabsContent value="assistants" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <JobHistory 
              history={mockAssistantHistory}
              title="Assistant History" 
            />
          </TabsContent>
          
          <TabsContent value="productions" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <JobHistory 
              history={mockProductionHistory}
              title="Production History" 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
