
import React from 'react';
import { Film } from 'lucide-react';

interface FilmRollProps {
  className?: string;
}

const FilmRoll: React.FC<FilmRollProps> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-1 -left-1 -right-1 -bottom-1 flex items-center justify-center">
        <Film 
          className="w-3/4 h-3/4 text-gray-800 dark:text-gray-600 opacity-20 animate-spin-slow" 
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
};

export default FilmRoll;
