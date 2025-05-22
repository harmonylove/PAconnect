
import { format } from 'date-fns';
import { Booking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingBlock from "./BookingBlock";

interface SelectedDatePanelProps {
  selectedDate: Date;
  bookings: Booking[];
  isLoading: boolean;
}

export default function SelectedDatePanel({ 
  selectedDate, 
  bookings, 
  isLoading 
}: SelectedDatePanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {format(selectedDate, 'MMMM d, yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-10">Loading...</div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map(booking => (
              <BookingBlock key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground">
            No availability blocks for this date
          </div>
        )}
      </CardContent>
    </Card>
  );
}
