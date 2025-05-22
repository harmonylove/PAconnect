
import { format } from 'date-fns';
import { Booking, BookingStatus } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface BookingBlockProps {
  booking: Booking;
  onStatusChange?: (bookingId: string, newStatus: BookingStatus) => void;
}

export default function BookingBlock({ booking, onStatusChange }: BookingBlockProps) {
  const handleStatusChange = (newStatus: BookingStatus) => {
    if (onStatusChange) {
      onStatusChange(booking.id, newStatus);
    }
  };

  return (
    <div 
      className={`p-3 rounded-lg border ${
        booking.status === 'booked' 
          ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' 
          : booking.status === 'held' 
            ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
            : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
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
        
        {onStatusChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {booking.status !== 'available' && (
                <DropdownMenuItem onClick={() => handleStatusChange('available')}>
                  Mark as Available
                </DropdownMenuItem>
              )}
              {booking.status !== 'held' && (
                <DropdownMenuItem onClick={() => handleStatusChange('held')}>
                  Mark as Held
                </DropdownMenuItem>
              )}
              {booking.status !== 'booked' && (
                <DropdownMenuItem onClick={() => handleStatusChange('booked')}>
                  Mark as Booked
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
