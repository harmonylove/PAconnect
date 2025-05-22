
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Booking, BookingStatus } from '@/types';

interface CalendarViewProps {
  bookings: Booking[];
  onDayClick?: (date: Date) => void;
  onBookingClick?: (booking: Booking) => void;
}

export default function CalendarView({
  bookings = [],
  onDayClick,
  onBookingClick,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate days for the month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysList = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Navigate between months
  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Find bookings for a specific date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(new Date(booking.startDate), date) || 
      isSameDay(new Date(booking.endDate), date) ||
      (new Date(booking.startDate) <= date && date <= new Date(booking.endDate))
    );
  };

  // Status-based styling
  const getStatusStyle = (status: BookingStatus) => {
    switch(status) {
      case 'available':
        return 'booking-available';
      case 'held':
        return 'booking-held';
      case 'booked':
        return 'booking-confirmed';
      default:
        return '';
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {daysList.map((day, dayIdx) => {
          const dayBookings = getBookingsForDate(day);
          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-28 md:min-h-36 p-1 bg-white dark:bg-gray-800 overflow-y-auto",
                !isSameMonth(day, currentMonth) && "bg-gray-100 dark:bg-gray-900 text-gray-400",
                isToday(day) && "border-l-4 border-brand-teal"
              )}
              onClick={() => onDayClick && onDayClick(day)}
            >
              <div className="p-1 text-right">
                <span className={cn(
                  "inline-block w-6 h-6 text-center leading-6 rounded-full text-sm",
                  isToday(day) && "bg-brand-teal text-white"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              
              {/* Bookings for this day */}
              <div className="space-y-1 mt-1">
                {dayBookings.length > 0 ? (
                  dayBookings.map(booking => (
                    <div
                      key={booking.id}
                      onClick={e => {
                        e.stopPropagation();
                        onBookingClick && onBookingClick(booking);
                      }}
                      className={cn(
                        "text-xs p-1 rounded border truncate cursor-pointer",
                        getStatusStyle(booking.status)
                      )}
                    >
                      {booking.title}
                    </div>
                  ))
                ) : (
                  <div className="h-full min-h-[40px]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
