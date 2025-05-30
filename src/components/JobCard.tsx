
import { format } from 'date-fns';
import { CalendarDays, History, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job, productionTypeLabels, paTypeLabels } from '@/types';

interface JobCardProps {
  job: Job;
  onApply?: (job: Job) => void;
  onViewDetails?: (job: Job) => void;
  onViewHistory?: (productionId: string) => void;
  alreadyApplied?: boolean;
}

export default function JobCard({ 
  job, 
  onApply, 
  onViewDetails, 
  onViewHistory,
  alreadyApplied = false 
}: JobCardProps) {
  const formattedDateRange = `${format(new Date(job.startDate), 'MMM d')} - ${format(new Date(job.endDate), 'MMM d, yyyy')}`;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge>{productionTypeLabels[job.productionType]}</Badge>
            <Badge variant="outline" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20">
              {paTypeLabels[job.paType]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarDays className="h-4 w-4 mr-1" />
          {formattedDateRange}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {job.location}
        </div>
        
        {job.rate && (
          <div className="mb-3">
            <span className="text-sm font-medium">Rate:</span>{' '}
            <span className="text-sm">{job.rate}</span>
          </div>
        )}
        
        <div className="text-sm line-clamp-3 mb-3">
          {job.description}
        </div>
        
        {job.requirements && job.requirements.length > 0 && (
          <div className="mt-2">
            <span className="text-sm font-medium">Requirements:</span>
            <ul className="list-disc list-inside text-sm mt-1">
              {job.requirements.slice(0, 2).map((req, index) => (
                <li key={index} className="text-muted-foreground">{req}</li>
              ))}
              {job.requirements.length > 2 && (
                <li className="text-muted-foreground">
                  +{job.requirements.length - 2} more requirements
                </li>
              )}
            </ul>
          </div>
        )}
        
        {onViewHistory && (
          <div className="mt-3 flex items-center">
            <Button 
              variant="link" 
              className="p-0 h-auto text-brand-blue" 
              onClick={() => onViewHistory(job.productionId)}
            >
              <History className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">View company history</span>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={() => onViewDetails && onViewDetails(job)}
        >
          View Details
        </Button>
        <Button 
          variant={alreadyApplied ? "secondary" : "default"}
          className={`flex-1 ${!alreadyApplied ? "bg-brand-teal hover:bg-brand-teal-600" : ""}`}
          onClick={() => onApply && onApply(job)}
          disabled={alreadyApplied}
        >
          {alreadyApplied ? "Applied" : "Apply Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
