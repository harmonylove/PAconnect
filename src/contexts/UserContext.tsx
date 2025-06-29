
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserContextType {
  userRole: UserRole;
  toggleUserRole: () => void;
  isPublic: boolean;
  userProfile: any;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, session } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('assistant');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPublic] = useState<boolean>(false); // Keep private access

  // Fetch user profile when user changes
  useEffect(() => {
    async function fetchUserProfile() {
      if (!user) {
        setUserProfile(null);
        setUserRole('assistant');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching profile for user:', user.id);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // If profile doesn't exist, create one
          if (error.code === 'PGRST116') {
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                name: user.user_metadata?.name || user.email,
                email: user.email,
                user_role: user.user_metadata?.user_role || 'assistant'
              })
              .select()
              .single();

            if (insertError) {
              console.error('Error creating profile:', insertError);
            } else {
              setUserProfile(newProfile);
              setUserRole(newProfile.user_role as UserRole);
            }
          }
        } else {
          setUserProfile(profile);
          setUserRole(profile.user_role as UserRole);
        }
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user]);

  const toggleUserRole = async () => {
    if (!user || !userProfile) return;

    const newRole = userRole === 'assistant' ? 'production' : 'assistant';
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_role: newRole })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user role:', error);
      } else {
        setUserRole(newRole);
        setUserProfile({ ...userProfile, user_role: newRole });
      }
    } catch (error) {
      console.error('Error in toggleUserRole:', error);
    }
  };

  return (
    <UserContext.Provider value={{ 
      userRole, 
      toggleUserRole, 
      isPublic, 
      userProfile, 
      loading 
    }}>
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
