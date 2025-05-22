
import Dashboard from '@/components/dashboard/Dashboard';
import MainLayout from '@/components/layout/MainLayout';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { useEffect } from 'react';

const IndexContent = () => {
  const { userRole, toggleUserRole, isPublic } = useUser();
  
  useEffect(() => {
    if (isPublic) {
      toast.success("Application is now public!", {
        description: "Anyone can access this application without authentication",
        duration: 5000,
      });
    }
  }, [isPublic]);
  
  return (
    <Dashboard userRole={userRole} toggleUserRole={toggleUserRole} />
  );
};

const Index = () => {
  return (
    <UserProvider>
      <MainLayout>
        <IndexContent />
      </MainLayout>
    </UserProvider>
  );
};

export default Index;
