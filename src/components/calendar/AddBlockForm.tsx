
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BookingStatus } from "@/types";
import { toast } from "sonner";

interface AddBlockFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string, startTime: string, endTime: string, status: BookingStatus) => void;
}

export default function AddBlockForm({ 
  isOpen, 
  onOpenChange,
  onSave
}: AddBlockFormProps) {
  const [blockTitle, setBlockTitle] = useState('');
  const [blockStartTime, setBlockStartTime] = useState('09:00');
  const [blockEndTime, setBlockEndTime] = useState('17:00');
  const [blockStatus, setBlockStatus] = useState<BookingStatus>('held');

  const handleSave = () => {
    if (!blockTitle) {
      toast.error("Please provide a title for this block");
      return;
    }
    
    onSave(blockTitle, blockStartTime, blockEndTime, blockStatus);
    
    // Reset form
    setBlockTitle('');
    onOpenChange(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Block
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
