
import { useState } from 'react';
import { format } from 'date-fns';
import { Check, Trash2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/sonner';
import { Notification, mockNotifications, NotificationType } from '@/types/notifications';

// Map notification types to badges
const notificationTypeBadge: Record<NotificationType, { label: string, variant: "default" | "secondary" | "destructive" | "outline" }> = {
  booking_request: { label: 'Request', variant: 'default' },
  booking_accepted: { label: 'Accepted', variant: 'default' },
  booking_rejected: { label: 'Rejected', variant: 'destructive' },
  message: { label: 'Message', variant: 'secondary' },
  job_application: { label: 'Application', variant: 'default' },
  job_offer: { label: 'Job Offer', variant: 'default' },
  booking_status_change: { label: 'Status Change', variant: 'outline' },
  system: { label: 'System', variant: 'secondary' }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    toast.success("Notification marked as read");
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast.success("Notification deleted");
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success("All notifications marked as read");
  };
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          
          <div className="flex space-x-2">
            {notifications.some(n => !n.read) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <Card 
                key={notification.id}
                className={`transition-all ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {notification.senderPhoto ? (
                        <Avatar className="h-10 w-10 mt-1">
                          <AvatarImage src={notification.senderPhoto} alt={notification.senderName || ''} />
                          <AvatarFallback>
                            {notification.senderName?.charAt(0) || 'S'}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mt-1">
                          <Badge variant={notificationTypeBadge[notification.type].variant}>
                            {notificationTypeBadge[notification.type].label.charAt(0)}
                          </Badge>
                        </div>
                      )}
                      
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium mr-2">{notification.title}</h3>
                          <Badge variant={notificationTypeBadge[notification.type].variant} className="text-xs">
                            {notificationTypeBadge[notification.type].label}
                          </Badge>
                          {!notification.read && (
                            <div className="ml-2 h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                        
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>
                            {format(notification.timestamp, 'MMM d, yyyy')} at {format(notification.timestamp, 'h:mm a')}
                          </span>
                          {notification.senderName && (
                            <>
                              <span className="mx-1">•</span>
                              <span>From {notification.senderName}</span>
                            </>
                          )}
                        </div>
                        
                        {notification.actionUrl && (
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-sm mt-2"
                            asChild
                          >
                            <a href={notification.actionUrl}>View Details</a>
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Badge variant="secondary" className="text-lg">0</Badge>
            </div>
            <h3 className="text-lg font-medium mb-1">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! You'll see notifications here when you have new messages, booking requests, or updates.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
