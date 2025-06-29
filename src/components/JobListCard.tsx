
import { MapPin, Calendar, DollarSign, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job, productionTypeLabels, paTypeLabels } from '@/types';

interface JobListCardProps {
  job: Job;
  onApply: (jobId: string) => void;
}

export default function JobListCard({ job, onApply }: JobListCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-green-600">{job.rate}</div>
            <div className="text-sm text-muted-foreground">
              {job.applicants?.length || 0} applicants
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{job.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">
            {productionTypeLabels[job.productionType]}
          </Badge>
          <Badge variant="outline" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20">
            {paTypeLabels[job.paType]}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {job.startDate.toLocaleDateString()} - {job.endDate.toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            {job.rate}
          </div>
        </div>
        
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Requirements:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-1" />
            Posted by verified production company
          </div>
          <Button 
            onClick={() => onApply(job.id)}
            className="bg-brand-teal hover:bg-brand-teal-600"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
