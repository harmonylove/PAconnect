
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Conversation } from '@/types';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelectConversation: (conversation: Conversation) => void;
  getParticipantInfo: (participantId: string) => {
    name: string;
    avatar?: string;
  };
  currentUserId: string;
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelectConversation,
  getParticipantInfo,
  currentUserId
}: ConversationListProps) {
  return (
    <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
      {conversations.map((convo) => {
        // Find the other participant (not the current user)
        const otherParticipantId = convo.participants.find(id => id !== currentUserId) || '';
        const participant = getParticipantInfo(otherParticipantId);
        
        return (
          <div
            key={convo.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-md cursor-pointer hover:bg-muted/50 transition-colors",
              selectedId === convo.id && "bg-muted"
            )}
            onClick={() => onSelectConversation(convo)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={participant.avatar} alt={participant.name} />
              <AvatarFallback>{participant.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{participant.name}</h3>
                {convo.lastMessage && (
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(convo.lastMessage.timestamp), 'h:mm a')}
                  </span>
                )}
              </div>
              
              {convo.lastMessage ? (
                <p className="text-sm text-muted-foreground truncate">
                  {convo.lastMessage.senderId === currentUserId ? 'You: ' : ''}
                  {convo.lastMessage.content}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">Start a conversation</p>
              )}
            </div>
            
            {convo.unreadCount > 0 && (
              <Badge variant="default" className="rounded-full h-5 min-w-5 flex items-center justify-center bg-brand-blue">
                {convo.unreadCount}
              </Badge>
            )}
          </div>
        );
      })}
      
      {conversations.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          No conversations yet
        </div>
      )}
    </div>
  );
}
