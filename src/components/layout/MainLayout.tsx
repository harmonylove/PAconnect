
import { ReactNode } from 'react';
import Header from '@/components/Header';
import { useUser } from '@/contexts/UserContext';

interface MainLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

export default function MainLayout({ children, hideHeader = false }: MainLayoutProps) {
  const { userRole } = useUser();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!hideHeader && (
        <Header 
          userRole={userRole} 
          username={userRole === 'assistant' ? 'Sara Johnson' : 'Acme Productions'}
          avatarUrl={userRole === 'assistant' ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' : undefined}
        />
      )}
      {children}
    </div>
  );
}
