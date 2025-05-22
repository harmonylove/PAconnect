
import Dashboard from '@/components/dashboard/Dashboard';
import MainLayout from '@/components/layout/MainLayout';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { useEffect } from 'react';

const Index = () => {
  const { userRole, toggleUserRole, isPublic } = useUser();
  
  useEffect(() => {
    if (!isPublic) {
      toast.success("Application is now private!", {
        description: "Authentication is required to access this application",
        duration: 5000,
      });
    }
  }, [isPublic]);
  
  return (
    <MainLayout>
      <Dashboard userRole={userRole} toggleUserRole={toggleUserRole} />
    </MainLayout>
  );
};

export default Index;
