
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ConversationHeaderProps {
  participant: {
    name: string;
    avatar: string;
  };
  userRole?: string;
}

const ConversationHeader = ({ participant, userRole }: ConversationHeaderProps) => {
  return (
    <div className="p-4 border-b flex items-center">
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={participant.avatar} alt={participant.name} />
        <AvatarFallback>{participant.name[0] || '?'}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-medium">{participant.name}</h3>
        <p className="text-sm text-muted-foreground">
          {userRole === 'assistant' ? 'Production Company' : 'Assistant'}
        </p>
      </div>
    </div>
  );
};

export default ConversationHeader;
