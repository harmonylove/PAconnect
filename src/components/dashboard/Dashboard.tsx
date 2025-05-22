
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/types';
import DashboardStats from './DashboardStats';
import DiscoverTab from './DiscoverTab';
import MapTab from './MapTab';

interface DashboardProps {
  userRole: UserRole;
  toggleUserRole: () => void;
}

const Dashboard = ({ userRole, toggleUserRole }: DashboardProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-6">
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
      <DashboardStats userRole={userRole} />
      
      {/* Main Dashboard Content */}
      <Tabs defaultValue="discover" className="space-y-4">
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover">
          <DiscoverTab userRole={userRole} />
        </TabsContent>
        
        <TabsContent value="map">
          <MapTab userRole={userRole} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
