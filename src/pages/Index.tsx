
import Dashboard from '@/components/dashboard/Dashboard';
import MainLayout from '@/components/layout/MainLayout';
import { UserProvider, useUser } from '@/contexts/UserContext';

const IndexContent = () => {
  const { userRole, toggleUserRole } = useUser();
  
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
