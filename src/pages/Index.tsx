
import Dashboard from '@/components/dashboard/Dashboard';
import MainLayout from '@/components/layout/MainLayout';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { userRole, toggleUserRole, isPublic } = useUser();
  const { user } = useAuth();
  
  return (
    <MainLayout>
      <Dashboard userRole={userRole} toggleUserRole={toggleUserRole} />
    </MainLayout>
  );
};

export default Index;
