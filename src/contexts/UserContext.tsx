
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole } from '@/types';
import { supabase } from '@/integrations/supabase/client';

interface UserContextType {
  userRole: UserRole;
  toggleUserRole: () => void;
  isPublic: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('assistant');
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const toggleUserRole = () => {
    setUserRole(prev => prev === 'assistant' ? 'production' : 'assistant');
  };

  // Check Supabase connection on load to confirm public access
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('health_check').select('*').limit(1);
        if (error) {
          console.log('Public access status:', false);
        } else {
          console.log('Public access status:', true);
        }
      } catch (err) {
        console.error('Error checking Supabase connection:', err);
      }
    };
    
    checkConnection();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, toggleUserRole, isPublic }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
