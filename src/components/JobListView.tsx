
import { Card, CardContent } from '@/components/ui/card';
import JobListCard from '@/components/JobListCard';
import { Job } from '@/types';

interface JobListViewProps {
  filteredJobs: Job[];
  onApply: (jobId: string) => void;
}

export default function JobListView({ filteredJobs, onApply }: JobListViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
        </h2>
      </div>

      {filteredJobs.map((job) => (
        <JobListCard key={job.id} job={job} onApply={onApply} />
      ))}
      
      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria to find more opportunities.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
