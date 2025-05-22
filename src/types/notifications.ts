
import { UserRole } from ".";

export type NotificationType = 
  | 'booking_request' 
  | 'booking_accepted' 
  | 'booking_rejected' 
  | 'message' 
  | 'job_application' 
  | 'job_offer' 
  | 'booking_status_change'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
  senderId?: string;
  senderName?: string;
  senderPhoto?: string;
  recipientId: string;
  recipientRole: UserRole;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking_status_change',
    title: 'Booking Status Changed',
    message: 'Your availability block for "Warner Bros Commercial" has been changed from held to booked.',
    timestamp: new Date(2024, 4, 22, 9, 30),
    read: false,
    actionUrl: '/calendar',
    metadata: {
      bookingId: 'b1',
      oldStatus: 'held',
      newStatus: 'booked'
    },
    senderName: 'Warner Bros Productions',
    recipientId: 'u1',
    recipientRole: 'assistant'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Hi Sara, are you available for a quick call about the upcoming shoot?',
    timestamp: new Date(2024, 4, 21, 14, 15),
    read: false,
    actionUrl: '/messages/c1',
    senderId: 'u2',
    senderName: 'Robert Johnson',
    senderPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
    recipientId: 'u1',
    recipientRole: 'assistant'
  },
  {
    id: '3',
    type: 'booking_request',
    title: 'New Booking Request',
    message: 'You have a new booking request from ABC Studios for a TV show from June 1-5.',
    timestamp: new Date(2024, 4, 21, 10, 0),
    read: true,
    actionUrl: '/calendar',
    metadata: {
      bookingId: 'b2',
      productionType: 'tv',
      dates: {
        start: '2024-06-01',
        end: '2024-06-05'
      }
    },
    senderName: 'ABC Studios',
    recipientId: 'u1',
    recipientRole: 'assistant'
  },
  {
    id: '4',
    type: 'job_application',
    title: 'Application Received',
    message: 'Sara Johnson has applied to your Production Assistant job posting.',
    timestamp: new Date(2024, 4, 20, 16, 45),
    read: true,
    actionUrl: '/talents/a1',
    senderId: 'a1',
    senderName: 'Sara Johnson',
    senderPhoto: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    recipientId: 'p1',
    recipientRole: 'production'
  },
  {
    id: '5',
    type: 'system',
    title: 'Welcome to PAConnect',
    message: 'Thank you for joining PAConnect! Complete your profile to start connecting with productions and finding work opportunities.',
    timestamp: new Date(2024, 4, 19, 9, 0),
    read: true,
    actionUrl: '/profile',
    recipientId: 'u1',
    recipientRole: 'assistant'
  }
];
