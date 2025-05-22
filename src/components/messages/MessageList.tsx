
import { useRef, useEffect } from 'react';
import { Message as MessageType } from '@/types';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: MessageType[];
  currentUserId: string;
  mockUsers: Record<string, { name: string; avatar: string; role: string }>;
}

const MessageList = ({ messages, currentUserId, mockUsers }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
      {messages.length > 0 ? (
        messages.map(message => (
          <MessageItem 
            key={message.id}
            message={message}
            currentUserId={currentUserId}
            mockUsers={mockUsers}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
