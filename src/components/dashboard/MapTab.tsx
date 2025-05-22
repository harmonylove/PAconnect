
import MapComponent from '@/components/MapComponent';
import { UserRole } from '@/types';

interface MapTabProps {
  userRole: UserRole;
}

const MapTab = ({ userRole }: MapTabProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">
        {userRole === 'assistant' ? 'Jobs Near You' : 'Available Talent Near You'}
      </h2>
      <div className="h-[400px]">
        <MapComponent 
          locations={[
            { lat: 34.0522, lng: -118.2437, title: 'Los Angeles, CA' },
            { lat: 40.7128, lng: -74.0060, title: 'New York, NY' },
            { lat: 33.7490, lng: -84.3880, title: 'Atlanta, GA' }
          ]}
        />
      </div>
    </div>
  );
};

export default MapTab;
