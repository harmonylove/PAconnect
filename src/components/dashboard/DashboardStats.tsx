
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole, Conversation } from '@/types';

interface DashboardStatsProps {
  userRole: UserRole;
}

// Mock conversations for the stats
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

const DashboardStats = ({ userRole }: DashboardStatsProps) => {
  return (
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
  );
};

export default DashboardStats;
