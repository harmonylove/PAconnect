
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// This is a placeholder that will be replaced with a real map implementation
// In a real implementation, we would use a library like Mapbox or Google Maps

interface MapComponentProps {
  className?: string;
  locations?: Array<{
    lat: number;
    lng: number;
    title: string;
  }>;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function MapComponent({ 
  className,
  locations = [],
  center = { lat: 34.0522, lng: -118.2437 }, // Default to Los Angeles
  zoom = 10
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is where we'd initialize the map library
    // For now we're just setting a background image as placeholder
    if (mapRef.current) {
      console.log('Map would be initialized here with', { center, zoom, locations });
    }
  }, [center, zoom, locations]);

  return (
    <div 
      ref={mapRef} 
      className={cn(
        "w-full h-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden relative",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-50 to-brand-teal-50 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold text-brand-blue-800">Interactive Map</h3>
          <p className="text-sm text-gray-500 mt-2">
            Find productions and assistants near you
          </p>
          {locations.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Locations:</h4>
              <ul className="mt-2 space-y-1">
                {locations.map((location, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {location.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
