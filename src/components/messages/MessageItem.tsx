
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message as MessageType } from '@/types';

interface MessageItemProps {
  message: MessageType;
  currentUserId: string;
  mockUsers: Record<string, { name: string; avatar: string; role: string }>;
}

const MessageItem = ({ message, currentUserId, mockUsers }: MessageItemProps) => {
  const isOwnMessage = message.senderId === currentUserId;
  const sender = mockUsers[message.senderId];

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isOwnMessage && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={sender?.avatar} alt={sender?.name} />
          <AvatarFallback>{sender?.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[75%] ${isOwnMessage ? 'bg-brand-blue text-white' : 'bg-muted'} rounded-lg p-3`}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwnMessage ? 'text-brand-light/80' : 'text-muted-foreground'}`}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </p>
      </div>
      {isOwnMessage && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src={mockUsers[currentUserId]?.avatar} alt={mockUsers[currentUserId]?.name} />
          <AvatarFallback>{mockUsers[currentUserId]?.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageItem;
