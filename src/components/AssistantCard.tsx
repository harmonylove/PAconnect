
import { History, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Assistant, productionTypeLabels, paTypeLabels } from '@/types';

interface AssistantCardProps {
  assistant: Assistant;
  onContact?: (assistant: Assistant) => void;
  onViewProfile?: (assistant: Assistant) => void;
  onViewHistory?: (assistantId: string) => void;
}

export default function AssistantCard({ 
  assistant, 
  onContact, 
  onViewProfile,
  onViewHistory 
}: AssistantCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-32 bg-gradient-to-r from-brand-blue-100 to-brand-teal-50">
          <Avatar className="h-24 w-24 absolute -bottom-12 left-6 border-4 border-white shadow-md">
            <AvatarImage src={assistant.photo} alt={assistant.name} />
            <AvatarFallback className="text-xl font-semibold bg-brand-blue text-white">
              {assistant.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-14 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{assistant.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{assistant.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Location:</span> {assistant.location}
        </div>
        
        {assistant.availableCities.length > 0 && (
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Also available in:</span> {assistant.availableCities.join(', ')}
          </div>
        )}
        
        <div className="mt-3 line-clamp-3 text-sm text-muted-foreground">
          {assistant.bio}
        </div>
        
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-600 mb-2">Production Types:</div>
          <div className="flex flex-wrap gap-1 mb-3">
            {assistant.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {productionTypeLabels[specialty]}
              </Badge>
            ))}
          </div>
          
          <div className="text-xs font-medium text-gray-600 mb-2">PA Specialties:</div>
          <div className="flex flex-wrap gap-1">
            {assistant.paTypes.map((paType) => (
              <Badge key={paType} variant="outline" className="text-xs bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                {paTypeLabels[paType]}
              </Badge>
            ))}
          </div>
        </div>
        
        {onViewHistory && (
          <div className="mt-3 flex items-center">
            <Button 
              variant="link" 
              className="p-0 h-auto text-brand-blue" 
              onClick={() => onViewHistory(assistant.id)}
            >
              <History className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">View work history</span>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          asChild
        >
          <Link to={`/assistant/${assistant.id}`}>View Profile</Link>
        </Button>
        <Button 
          variant="default" 
          className="flex-1 bg-brand-teal hover:bg-brand-teal-600"
          onClick={() => onContact && onContact(assistant)}
        >
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
}
