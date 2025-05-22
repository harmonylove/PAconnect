
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/types';

interface UserContextType {
  userRole: UserRole;
  toggleUserRole: () => void;
  isPublic: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('assistant');
  const [isPublic] = useState<boolean>(true); // Set public access to always true for now

  const toggleUserRole = () => {
    setUserRole(prev => prev === 'assistant' ? 'production' : 'assistant');
  };

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
