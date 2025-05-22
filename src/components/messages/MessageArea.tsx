
import { Conversation, Message as MessageType } from '@/types';
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface MessageAreaProps {
  selectedConversation: Conversation | null;
  messages: MessageType[];
  participant: {
    name: string;
    avatar: string;
  };
  currentUserId: string;
  userRole?: string;
  mockUsers: Record<string, { name: string; avatar: string; role: string }>;
  onSendMessage: (content: string) => void;
}

const MessageArea = ({
  selectedConversation,
  messages,
  participant,
  currentUserId,
  userRole,
  mockUsers,
  onSendMessage
}: MessageAreaProps) => {
  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Select a conversation to view messages</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ConversationHeader participant={participant} userRole={userRole} />
      <MessageList 
        messages={messages} 
        currentUserId={currentUserId}
        mockUsers={mockUsers}
      />
      <MessageInput onSendMessage={onSendMessage} />
    </>
  );
};

export default MessageArea;
