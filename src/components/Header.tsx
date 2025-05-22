
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  Menu, 
  MessageSquare, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserRole } from '@/types';
import FilmRoll from './FilmRoll';

interface HeaderProps {
  userRole?: UserRole;
  username?: string;
  avatarUrl?: string;
}

export default function Header({ userRole = 'assistant', username = 'Guest', avatarUrl }: HeaderProps) {
  const isMobile = useIsMobile();
  const [unreadMessages] = useState(2);
  const [unreadNotifications] = useState(3);
  
  const NavItems = () => (
    <div className="flex gap-2 md:gap-4 items-center">
      <Link to="/calendar">
        <Button variant="ghost" size="icon" aria-label="Calendar">
          <Calendar className="h-5 w-5" />
        </Button>
      </Link>
      <Link to="/messages">
        <Button variant="ghost" size="icon" aria-label="Messages" className="relative">
          <MessageSquare className="h-5 w-5" />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
        </Button>
      </Link>
      <Link to="/notifications">
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </Button>
      </Link>
      <Link to="/profile">
        <Avatar className="h-8 w-8 border-2 border-primary/20">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm py-3 px-4 md:px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 pt-10">
                <div className="flex flex-col gap-4 mt-4">
                  <Link to="/" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Dashboard
                  </Link>
                  <Link to="/calendar" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Calendar
                  </Link>
                  <Link to="/jobs" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    {userRole === 'assistant' ? 'Find Jobs' : 'Post Jobs'}
                  </Link>
                  <Link to="/talents" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    {userRole === 'assistant' ? 'My Profile' : 'Find Assistants'}
                  </Link>
                  <Link to="/messages" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Messages
                  </Link>
                  <Link to="/profile" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Profile
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/" className="flex items-center relative z-10">
            <FilmRoll className="w-24 h-10" />
            <div className="relative z-10">
              <span className="text-xl font-bold text-brand-blue font-cursive">PA</span>
              <span className="text-xl font-bold text-brand-teal font-cursive">Connect</span>
            </div>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-600 hover:text-brand-blue dark:text-gray-200 dark:hover:text-brand-blue-300">
              Dashboard
            </Link>
            <Link to="/calendar" className="font-medium text-gray-600 hover:text-brand-blue dark:text-gray-200 dark:hover:text-brand-blue-300">
              Calendar
            </Link>
            <Link to="/jobs" className="font-medium text-gray-600 hover:text-brand-blue dark:text-gray-200 dark:hover:text-brand-blue-300">
              {userRole === 'assistant' ? 'Find Jobs' : 'Post Jobs'}
            </Link>
            <Link to="/talents" className="font-medium text-gray-600 hover:text-brand-blue dark:text-gray-200 dark:hover:text-brand-blue-300">
              {userRole === 'assistant' ? 'My Profile' : 'Find Assistants'}
            </Link>
          </nav>
        )}
        
        <NavItems />
      </div>
    </header>
  );
}
