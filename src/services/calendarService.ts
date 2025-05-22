
import { addDays } from 'date-fns';
import { Booking } from "@/types";

// Helper function to combine date and time
export const combineDateTime = (date: Date, timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
};

// Get bookings for a specific date
export const getBookingsForDate = (date: Date, bookings: Booking[]) => {
  return bookings.filter(booking => 
    (date >= new Date(booking.startDate) && date <= new Date(booking.endDate))
  );
};

// Generate date range from start to end date
export const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  const range: Date[] = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    range.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return range;
};

// Mock function to simulate fetching bookings (replace with Supabase)
export const getMockBookings = (userId?: string): Booking[] => {
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
