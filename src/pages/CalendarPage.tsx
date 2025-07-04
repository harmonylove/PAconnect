
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Booking, BookingStatus } from '@/types';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import CalendarView from '@/components/CalendarView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [view, setView] = useState<'month' | 'availability'>('month');

  const handleAvailabilityChange = (updatedBookings: Booking[]) => {
    // Check if any booking status changed from held to booked
    const newBookedBookings = updatedBookings.filter(newBooking => {
      const oldBooking = bookings.find(booking => booking.id === newBooking.id);
      return oldBooking?.status === 'held' && newBooking.status === 'booked';
    });
    
    // Show notifications for newly booked availabilities
    if (newBookedBookings.length > 0) {
      newBookedBookings.forEach(booking => {
        toast.success(`Booking confirmed!`, {
          description: `${booking.title} has been booked.`,
          duration: 5000,
        });
      });
    }
    
    setBookings(updatedBookings);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your availability and view upcoming bookings
            </p>
          </div>
        </div>

        <Tabs defaultValue="month" onValueChange={(value) => setView(value as 'month' | 'availability')}>
          <TabsList className="mb-4">
            <TabsTrigger value="month">Month View</TabsTrigger>
            <TabsTrigger value="availability">Manage Availability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="month">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Calendar</CardTitle>
                <CardDescription>
                  Overview of your schedule and bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarView 
                  bookings={bookings} 
                  onDayClick={(date) => console.log('Day clicked:', date)}
                  onBookingClick={(booking) => console.log('Booking clicked:', booking)}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="availability">
            <AvailabilityCalendar 
              onAvailabilityChange={handleAvailabilityChange} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
