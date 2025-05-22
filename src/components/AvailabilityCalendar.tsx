
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Booking, BookingStatus } from "@/types";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import SelectedDatePanel from './calendar/SelectedDatePanel';
import AddBlockForm from './calendar/AddBlockForm';
import { combineDateTime, getBookingsForDate, getMockBookings, generateDateRange } from '@/services/calendarService';

interface AvailabilityCalendarProps {
  userId?: string;
  onAvailabilityChange?: (bookings: Booking[]) => void;
}

export default function AvailabilityCalendar({ 
  userId, 
  onAvailabilityChange 
}: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddingBlock, setIsAddingBlock] = useState(false);

  // Fetch user bookings
  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: async () => {
      try {
        // This would be replaced with actual Supabase query once the table is created
        // For now we're using mock data
        return getMockBookings(userId);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        return [];
      }
    },
  });

  const handleSaveBlock = (
    blockTitle: string, 
    blockStartTime: string, 
    blockEndTime: string, 
    blockStatus: BookingStatus
  ) => {
    // Create a new availability block
    const startDateTime = combineDateTime(selectedDate, blockStartTime);
    const endDateTime = combineDateTime(selectedDate, blockEndTime);

    const newBlock: Booking = {
      id: `temp-${Date.now()}`,
      assistantId: userId || 'current-user',
      title: blockTitle,
      startDate: startDateTime,
      endDate: endDateTime,
      status: blockStatus,
    };

    // In a real app, save to Supabase here
    // For now, just update the local state
    const updatedBookings = [...bookings, newBlock];
    if (onAvailabilityChange) {
      onAvailabilityChange(updatedBookings);
    }
    
    if (blockStatus === 'held') {
      toast.info("Availability held for potential job", {
        description: "You'll be notified if this becomes booked.",
      });
    } else if (blockStatus === 'booked') {
      toast.success("Booking confirmed!");
    }

    setIsAddingBlock(false);
    refetch();
  };

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus } 
        : booking
    );
    
    if (onAvailabilityChange) {
      onAvailabilityChange(updatedBookings);
    }
    
    if (newStatus === 'booked') {
      const booking = bookings.find(b => b.id === bookingId);
      toast.success(`Booking confirmed!`, {
        description: `${booking?.title || 'Availability'} has been booked.`,
      });
    }
    
    refetch();
  };
  
  const selectedDateBookings = getBookingsForDate(selectedDate, bookings);
  
  // Create date ranges for different booking statuses
  const bookedDates = bookings
    .filter(booking => booking.status === 'booked')
    .flatMap(booking => generateDateRange(
      new Date(booking.startDate),
      new Date(booking.endDate)
    ));
    
  const heldDates = bookings
    .filter(booking => booking.status === 'held')
    .flatMap(booking => generateDateRange(
      new Date(booking.startDate),
      new Date(booking.endDate)
    ));
    
  const availableDates = bookings
    .filter(booking => booking.status === 'available')
    .flatMap(booking => generateDateRange(
      new Date(booking.startDate),
      new Date(booking.endDate)
    ));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Availability Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                modifiers={{
                  booked: bookedDates,
                  held: heldDates,
                  available: availableDates,
                }}
                modifiersStyles={{
                  booked: { 
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: 'rgb(239, 68, 68)',
                    fontWeight: 'bold'
                  },
                  held: { 
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    color: 'rgb(245, 158, 11)',
                    fontWeight: 'bold'
                  },
                  available: { 
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: 'rgb(34, 197, 94)',
                    fontWeight: 'bold'
                  }
                }}
                className="border rounded-md p-4"
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => setIsAddingBlock(true)}
                className="w-full"
              >
                Add Availability Block
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <SelectedDatePanel 
          selectedDate={selectedDate}
          bookings={selectedDateBookings}
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Add Block Dialog */}
      <AddBlockForm
        isOpen={isAddingBlock}
        onOpenChange={setIsAddingBlock}
        onSave={handleSaveBlock}
      />
    </div>
  );
}
