
import { format } from 'date-fns';
import { History } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from '@/components/ui/badge';
import { JobHistoryItem, productionTypeLabels } from '@/types';

interface JobHistoryProps {
  history: JobHistoryItem[];
  title?: string;
}

export default function JobHistory({ history, title = "Job History" }: JobHistoryProps) {
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="h-5 w-5 text-brand-blue" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {sortedHistory.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No job history to display</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company/Location</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedHistory.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>
                    {job.company}
                    <br />
                    <span className="text-xs text-muted-foreground">{job.location}</span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(job.startDate), 'MMM d, yyyy')} - {format(new Date(job.endDate), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{productionTypeLabels[job.productionType]}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {sortedHistory.length > 5 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
