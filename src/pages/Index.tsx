
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import AssistantCard from '@/components/AssistantCard';
import JobCard from '@/components/JobCard';
import MapComponent from '@/components/MapComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Assistant, Job, UserRole, Booking, Conversation } from '@/types';
import ProductionTypeFilter from '@/components/ProductionTypeFilter';

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

const mockBookings: Booking[] = [
  {
    id: '1',
    assistantId: '1',
    productionId: 'prod1',
    title: 'Feature Film Booking',
    startDate: new Date(2025, 5, 10),
    endDate: new Date(2025, 5, 24),
    status: 'booked',
    productionType: 'film',
    location: 'Los Angeles, CA'
  },
  {
    id: '2',
    assistantId: '1',
    title: 'Available',
    startDate: new Date(2025, 5, 3),
    endDate: new Date(2025, 5, 8),
    status: 'available',
  },
  {
    id: '3',
    assistantId: '1',
    productionId: 'prod3',
    title: 'Music Video Hold',
    startDate: new Date(2025, 5, 28),
    endDate: new Date(2025, 5, 30),
    status: 'held',
    productionType: 'music_video',
    location: 'Los Angeles, CA'
  }
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['user1', 'prod1'],
    lastMessage: {
      id: 'msg1',
      senderId: 'prod1',
      receiverId: 'user1',
      content: 'Thanks for your interest in the position. Can we schedule a call?',
      timestamp: new Date(2025, 5, 1, 14, 30),
      read: false
    },
    unreadCount: 1
  },
  {
    id: '2',
    participants: ['user1', 'prod2'],
    lastMessage: {
      id: 'msg2',
      senderId: 'user1',
      receiverId: 'prod2',
      content: 'I\'ve attached my resume for your review.',
      timestamp: new Date(2025, 4, 29, 10, 15),
      read: true
    },
    unreadCount: 0
  }
];

// Main Dashboard Component
const Index = () => {
  // State for user role (togglable for demo purposes)
  const [userRole, setUserRole] = useState<UserRole>('assistant');
  
  // Switch user perspective for demonstration
  const toggleUserRole = () => {
    setUserRole(prev => prev === 'assistant' ? 'production' : 'assistant');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header 
        userRole={userRole} 
        username={userRole === 'assistant' ? 'Sara Johnson' : 'Acme Productions'}
        avatarUrl={userRole === 'assistant' ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' : undefined}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome, {userRole === 'assistant' ? 'Sara' : 'Acme Productions'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {userRole === 'assistant' 
                ? 'Manage your availability and find new jobs' 
                : 'Find production assistants and manage your projects'}
            </p>
          </div>
          
          {/* For demo purposes only - toggle between user types */}
          <Button variant="outline" onClick={toggleUserRole} className="w-full md:w-auto">
            Switch to {userRole === 'assistant' ? 'Production' : 'Assistant'} View
          </Button>
        </div>
        
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-brand-blue" />
                Calendar
              </CardTitle>
              <CardDescription>Your upcoming schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                {userRole === 'assistant' ? '1 booking, 1 hold' : '2 productions scheduled'}
              </p>
              <Link to="/calendar">
                <Button variant="link" className="p-0 h-auto text-brand-blue">View Calendar</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-brand-blue" />
                Messages
              </CardTitle>
              <CardDescription>Recent conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                {mockConversations.filter(c => c.unreadCount > 0).length} unread messages
              </p>
              <Link to="/messages">
                <Button variant="link" className="p-0 h-auto text-brand-blue">View Messages</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                {userRole === 'assistant' ? (
                  <>
                    <Clock className="mr-2 h-5 w-5 text-brand-blue" />
                    Availability
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-5 w-5 text-brand-blue" />
                    Locations
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {userRole === 'assistant' ? 'Your current status' : 'Active projects'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                {userRole === 'assistant' ? 'Available next week' : 'Projects in 3 cities'}
              </p>
              <Link to={userRole === 'assistant' ? "/calendar" : "/projects"}>
                <Button variant="link" className="p-0 h-auto text-brand-blue">
                  {userRole === 'assistant' ? 'Update Availability' : 'View Projects'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <Tabs defaultValue="discover" className="space-y-4">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          
          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
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
          </TabsContent>
          
          {/* Map Tab */}
          <TabsContent value="map">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">
                {userRole === 'assistant' ? 'Jobs Near You' : 'Available Talent Near You'}
              </h2>
              <div className="h-[400px]">
                <MapComponent 
                  locations={[
                    { lat: 34.0522, lng: -118.2437, title: 'Los Angeles, CA' },
                    { lat: 40.7128, lng: -74.0060, title: 'New York, NY' },
                    { lat: 33.7490, lng: -84.3880, title: 'Atlanta, GA' }
                  ]}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
