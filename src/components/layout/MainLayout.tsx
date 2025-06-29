
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Header from '@/components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Sign out button in top right */}
      <div className="fixed top-4 right-4 z-50">
        {user && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="bg-white/90 backdrop-blur-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        )}
      </div>
      
      <main>{children}</main>
    </div>
  );
}
