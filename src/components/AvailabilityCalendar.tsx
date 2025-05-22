
import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { CalendarIcon, Clock } from "lucide-react";
import { Booking, BookingStatus } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AvailabilityCalendarProps {
  userId?: string;
  onAvailabilityChange?: (bookings: Booking[]) => void;
}

export default function AvailabilityCalendar({ 
  userId, 
  onAvailabilityChange 
}: AvailabilityCalendarProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [blockTitle, setBlockTitle] = useState('');
  const [blockStartTime, setBlockStartTime] = useState('09:00');
  const [blockEndTime, setBlockEndTime] = useState('17:00');
  const [blockStatus, setBlockStatus] = useState<BookingStatus>('held');

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

  // Mock function to simulate fetching bookings (replace with Supabase)
  const getMockBookings = (userId?: string): Booking[] => {
    const today = new Date();
    return [
      {
        id: '1',
        assistantId: userId || 'current-user',
        title: 'Available',
        startDate: today,
        endDate: addDays(today, 1),
        status: 'available',
      },
      {
        id: '2',
        assistantId: userId || 'current-user',
        title: 'Booked - Commercial Shoot',
        startDate: addDays(today, 3),
        endDate: addDays(today, 5),
        status: 'booked',
      },
      {
        id: '3',
        assistantId: userId || 'current-user',
        title: 'Held - Music Video',
        startDate: addDays(today, 7),
        endDate: addDays(today, 8),
        status: 'held',
      },
    ];
  };

  const handleSaveBlock = () => {
    if (!blockTitle) {
      toast({
        title: "Error",
        description: "Please provide a title for this block",
        variant: "destructive"
      });
      return;
    }

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
    
    toast({
      title: "Success",
      description: "Availability block has been added",
    });
    
    // Reset form
    setBlockTitle('');
    setIsAddingBlock(false);
    refetch();
  };

  // Helper function to combine date and time
  const combineDateTime = (date: Date, timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  // Get bookings for the selected date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      (date >= new Date(booking.startDate) && date <= new Date(booking.endDate))
    );
  };
  
  const selectedDateBookings = getBookingsForDate(selectedDate);
  
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
                  booked: bookings
                    .filter(booking => booking.status === 'booked')
                    .flatMap(booking => {
                      const start = new Date(booking.startDate);
                      const end = new Date(booking.endDate);
                      const range = [];
                      let current = new Date(start);
                      while (current <= end) {
                        range.push(new Date(current));
                        current.setDate(current.getDate() + 1);
                      }
                      return range;
                    }),
                  held: bookings
                    .filter(booking => booking.status === 'held')
                    .flatMap(booking => {
                      const start = new Date(booking.startDate);
                      const end = new Date(booking.endDate);
                      const range = [];
                      let current = new Date(start);
                      while (current <= end) {
                        range.push(new Date(current));
                        current.setDate(current.getDate() + 1);
                      }
                      return range;
                    }),
                  available: bookings
                    .filter(booking => booking.status === 'available')
                    .flatMap(booking => {
                      const start = new Date(booking.startDate);
                      const end = new Date(booking.endDate);
                      const range = [];
                      let current = new Date(start);
                      while (current <= end) {
                        range.push(new Date(current));
                        current.setDate(current.getDate() + 1);
                      }
                      return range;
                    }),
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
        
        <Card>
          <CardHeader>
            <CardTitle>
              {format(selectedDate, 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">Loading...</div>
            ) : selectedDateBookings.length > 0 ? (
              <div className="space-y-4">
                {selectedDateBookings.map(booking => (
                  <div 
                    key={booking.id}
                    className={`p-3 rounded-lg border ${
                      booking.status === 'booked' 
                        ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' 
                        : booking.status === 'held' 
                          ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                          : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    }`}
                  >
                    <h4 className="font-medium">{booking.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.startDate), 'MMM d')} - {format(new Date(booking.endDate), 'MMM d, yyyy')}
                    </p>
                    <div className="mt-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        booking.status === 'booked' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : booking.status === 'held' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                No availability blocks for this date
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Block Dialog */}
      <Popover open={isAddingBlock} onOpenChange={setIsAddingBlock}>
        <PopoverTrigger asChild>
          <span className="hidden">Add Block</span>
        </PopoverTrigger>
        <PopoverContent className="w-80 sm:w-96 p-4 shadow-lg">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Add Availability Block</h3>
            
            <div className="space-y-2">
              <Label htmlFor="blockTitle">Title</Label>
              <Input 
                id="blockTitle" 
                value={blockTitle} 
                onChange={(e) => setBlockTitle(e.target.value)} 
                placeholder="E.g., Music Video Shoot"
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={blockStartTime} 
                    onChange={(e) => setBlockStartTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <Input 
                    id="endTime" 
                    type="time" 
                    value={blockEndTime} 
                    onChange={(e) => setBlockEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex flex-wrap gap-2">
                <Toggle 
                  pressed={blockStatus === 'available'} 
                  onPressedChange={() => setBlockStatus('available')}
                  className={blockStatus === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                >
                  Available
                </Toggle>
                <Toggle 
                  pressed={blockStatus === 'held'} 
                  onPressedChange={() => setBlockStatus('held')}
                  className={blockStatus === 'held' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' : ''}
                >
                  Held
                </Toggle>
                <Toggle 
                  pressed={blockStatus === 'booked'} 
                  onPressedChange={() => setBlockStatus('booked')}
                  className={blockStatus === 'booked' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                >
                  Booked
                </Toggle>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingBlock(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveBlock}>
                Save Block
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
