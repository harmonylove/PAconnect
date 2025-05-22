
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation, Message as MessageType, UserRole } from '@/types';
import ConversationList from '@/components/ConversationList';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { format } from 'date-fns';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Mock users until we have proper user authentication
const mockUsers = {
  'user1': { name: 'Sara Anderson', avatar: '/placeholder.svg', role: 'assistant' as UserRole },
  'prod1': { name: 'Acme Productions', avatar: '/placeholder.svg', role: 'production' as UserRole },
  'prod2': { name: 'Metro Films', avatar: '/placeholder.svg', role: 'production' as UserRole },
  'prod3': { name: 'Apex Studios', avatar: '/placeholder.svg', role: 'production' as UserRole },
};

// Message component
const Message = ({ message, currentUserId }: { message: MessageType, currentUserId: string }) => {
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

// Messages content component
const MessagesContent = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { userRole } = useUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participant, setParticipant] = useState({ name: '', avatar: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Current user ID (for this mock, we're using user1 as the current user)
  const currentUserId = 'user1';
  
  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Fetch conversations from Supabase
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // In a real app with Supabase auth, we would get conversations based on the logged-in user
        // For now, using mock data to simulate fetching from database
        
        // Using mock data until we implement authentication
        const mockConversations: Conversation[] = [
          {
            id: '1',
            participants: ['user1', 'prod1'],
            lastMessage: {
              id: 'msg1',
              senderId: 'prod1',
              receiverId: 'user1',
              content: 'Thanks for your interest in the position. Can we schedule a call?',
              timestamp: new Date(2025, 5, 1, 14, 30),
              read: false
            },
            unreadCount: 1
          },
          {
            id: '2',
            participants: ['user1', 'prod2'],
            lastMessage: {
              id: 'msg2',
              senderId: 'user1',
              receiverId: 'prod2',
              content: 'I\'ve attached my resume for your review.',
              timestamp: new Date(2025, 4, 29, 10, 15),
              read: true
            },
            unreadCount: 0
          },
          {
            id: '3',
            participants: ['user1', 'prod3'],
            lastMessage: {
              id: 'msg3',
              senderId: 'prod3',
              receiverId: 'user1',
              content: 'We would like to move forward with your application. Are you available next week?',
              timestamp: new Date(2025, 5, 2, 9, 45),
              read: false
            },
            unreadCount: 2
          }
        ];
        
        setConversations(mockConversations);
        
        // If conversationId is provided in URL, select that conversation
        if (conversationId) {
          const convo = mockConversations.find(c => c.id === conversationId);
          if (convo) {
            handleSelectConversation(convo);
          } else {
            navigate('/messages');
          }
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
        toast.error('Failed to load conversations');
      }
    };
    
    fetchConversations();
    
    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, (payload) => {
        console.log('New message received:', payload);
        // Update messages if the new message belongs to the current conversation
        if (selectedConversation && payload.new.conversation_id === selectedConversation.id) {
          const newMsg: MessageType = {
            id: payload.new.id,
            senderId: payload.new.sender_id,
            receiverId: '', // This would be populated in a real app
            content: payload.new.content,
            timestamp: new Date(payload.new.timestamp),
            read: payload.new.read
          };
          setMessages(prev => [...prev, newMsg]);
        }
        
        // Update conversations list to show the latest message
        // This would be implemented with proper data in a real app
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, navigate, selectedConversation]);
  
  // Messages for each conversation - using mock data for now
  const mockMessages: Record<string, MessageType[]> = {
    '1': [
      {
        id: 'msg1-1',
        senderId: 'user1',
        receiverId: 'prod1',
        content: 'Hello, I saw your job posting for a production assistant and I\'m very interested.',
        timestamp: new Date(2025, 5, 1, 12, 15),
        read: true
      },
      {
        id: 'msg1-2',
        senderId: 'prod1',
        receiverId: 'user1',
        content: 'Hi Sara, thanks for reaching out! Do you have previous experience in similar roles?',
        timestamp: new Date(2025, 5, 1, 13, 20),
        read: true
      },
      {
        id: 'msg1-3',
        senderId: 'user1',
        receiverId: 'prod1',
        content: 'Yes, I\'ve worked on two indie films and a music video last year. I can send you my portfolio if you\'d like.',
        timestamp: new Date(2025, 5, 1, 14, 0),
        read: true
      },
      {
        id: 'msg1-4',
        senderId: 'prod1',
        receiverId: 'user1',
        content: 'That would be great! Also, thanks for your interest in the position. Can we schedule a call to discuss more details?',
        timestamp: new Date(2025, 5, 1, 14, 30),
        read: false
      }
    ],
    '2': [
      {
        id: 'msg2-1',
        senderId: 'user1',
        receiverId: 'prod2',
        content: 'Hi, I\'m interested in applying for the PA position on your upcoming documentary.',
        timestamp: new Date(2025, 4, 29, 9, 30),
        read: true
      },
      {
        id: 'msg2-2',
        senderId: 'prod2',
        receiverId: 'user1',
        content: 'Hello Sara, we\'d love to review your application. Can you share your resume?',
        timestamp: new Date(2025, 4, 29, 10, 0),
        read: true
      },
      {
        id: 'msg2-3',
        senderId: 'user1',
        receiverId: 'prod2',
        content: 'I\'ve attached my resume for your review.',
        timestamp: new Date(2025, 4, 29, 10, 15),
        read: true
      }
    ],
    '3': [
      {
        id: 'msg3-1',
        senderId: 'user1',
        receiverId: 'prod3',
        content: 'Hello, I\'m Sara and I\'m interested in the production assistant role for your TV series.',
        timestamp: new Date(2025, 5, 2, 8, 0),
        read: true
      },
      {
        id: 'msg3-2',
        senderId: 'prod3',
        receiverId: 'user1',
        content: 'Hi Sara, thanks for your interest. Your profile looks promising!',
        timestamp: new Date(2025, 5, 2, 9, 0),
        read: false
      },
      {
        id: 'msg3-3',
        senderId: 'prod3',
        receiverId: 'user1',
        content: 'We would like to move forward with your application. Are you available next week?',
        timestamp: new Date(2025, 5, 2, 9, 45),
        read: false
      }
    ]
  };
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Find the other participant (not the current user)
    const otherParticipantId = conversation.participants.find(id => id !== currentUserId) || '';
    setParticipant({
      name: mockUsers[otherParticipantId]?.name || 'Unknown User',
      avatar: mockUsers[otherParticipantId]?.avatar || ''
    });
    
    // Load messages for the selected conversation
    if (mockMessages[conversation.id]) {
      setMessages(mockMessages[conversation.id]);
      
      // Mark messages as read
      if (conversation.unreadCount > 0) {
        const updatedConversations = conversations.map(c => {
          if (c.id === conversation.id) {
            return { ...c, unreadCount: 0 };
          }
          return c;
        });
        setConversations(updatedConversations);
      }
    } else {
      setMessages([]);
    }
    
    // Update URL
    if (!conversationId || conversationId !== conversation.id) {
      navigate(`/messages/${conversation.id}`);
    }
  };
  
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedConversation || !newMessage.trim()) return;
    
    try {
      // In a real app with Supabase auth:
      // const { error } = await supabase
      //   .from('messages')
      //   .insert({
      //     conversation_id: selectedConversation.id,
      //     sender_id: auth.user.id,
      //     content: newMessage.trim(),
      //   });
      //
      // if (error) throw error;
      
      // For now, using mock data to simulate sending to database
      const otherParticipantId = selectedConversation.participants.find(id => id !== currentUserId) || '';
      
      // Create a new message
      const newMsg: MessageType = {
        id: `new-${Date.now()}`,
        senderId: currentUserId,
        receiverId: otherParticipantId,
        content: newMessage.trim(),
        timestamp: new Date(),
        read: false
      };
      
      // Update messages state
      const updatedMessages = [...messages, newMsg];
      setMessages(updatedMessages);
      
      // Update conversation with new last message
      const updatedConversations = conversations.map(c => {
        if (c.id === selectedConversation.id) {
          return {
            ...c,
            lastMessage: newMsg,
            unreadCount: 0
          };
        }
        return c;
      });
      
      // Update mock data (in a real app, this would be an API call)
      mockMessages[selectedConversation.id] = updatedMessages;
      
      // Update state
      setConversations(updatedConversations);
      setNewMessage('');
      
      // Show toast notification
      toast.success("Message sent");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };
  
  const getParticipantInfo = (participantId: string) => {
    return {
      name: mockUsers[participantId]?.name || 'Unknown User',
      avatar: mockUsers[participantId]?.avatar || ''
    };
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="md:col-span-1 border rounded-lg p-4 bg-card">
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          <ConversationList 
            conversations={conversations}
            selectedId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            getParticipantInfo={getParticipantInfo}
            currentUserId={currentUserId}
          />
        </div>
        
        {/* Message Area */}
        <div className="md:col-span-2 border rounded-lg flex flex-col h-[70vh] bg-card">
          {selectedConversation ? (
            <>
              {/* Header */}
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
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
                {messages.length > 0 ? (
                  messages.map(message => (
                    <Message 
                      key={message.id} 
                      message={message} 
                      currentUserId={currentUserId} 
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Select a conversation to view messages</p>
                {conversations.length === 0 && (
                  <p className="text-muted-foreground">No conversations yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Messages page with UserProvider
const Messages = () => {
  return (
    <UserProvider>
      <MainLayout>
        <MessagesContent />
      </MainLayout>
    </UserProvider>
  );
};

export default Messages;
