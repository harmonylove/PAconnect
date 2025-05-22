
import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/dashboard/Dashboard';
import { UserRole } from '@/types';

const Index = () => {
  // State for user role (togglable for demo purposes)
  const [userRole, setUserRole] = useState<UserRole>('assistant');
  
  // Switch user perspective for demonstration
  const toggleUserRole = () => {
    setUserRole(prev => prev === 'assistant' ? 'production' : 'assistant');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header 
        userRole={userRole} 
        username={userRole === 'assistant' ? 'Sara Johnson' : 'Acme Productions'}
        avatarUrl={userRole === 'assistant' ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' : undefined}
      />
      
      {/* Main Content */}
      <Dashboard userRole={userRole} toggleUserRole={toggleUserRole} />
    </div>
  );
};

export default Index;
