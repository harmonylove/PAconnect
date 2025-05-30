
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  History,
  Menu, 
  MessageSquare, 
  User,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  const location = useLocation();
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
        <Button 
          variant={location.pathname === '/notifications' ? "default" : "ghost"} 
          size="icon" 
          aria-label="Notifications" 
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </Button>
      </Link>
      
      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 p-1">
            <Avatar className={`h-8 w-8 border-2 ${location.pathname === '/profile' ? 'border-primary' : 'border-primary/20'}`}>
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white border shadow-md">
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center w-full px-2 py-2 hover:bg-gray-100">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/connected-profile" className="flex items-center w-full px-2 py-2 hover:bg-gray-100">
              <User className="h-4 w-4 mr-2" />
              Connected Profile
            </Link>
          </DropdownMenuItem>
          {userRole === 'production' && (
            <DropdownMenuItem asChild>
              <Link to="/find-jobs" className="flex items-center w-full px-2 py-2 hover:bg-gray-100">
                <History className="h-4 w-4 mr-2" />
                Find Jobs
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm py-3 px-1 md:px-2">
      <div className="flex items-center justify-between w-full mx-auto pl-0">
        <div className="flex items-center space-x-1 md:space-x-3">
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
                  <Link to="/job-history" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Job History
                  </Link>
                  <Link to="/messages" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Messages
                  </Link>
                  <Link to="/notifications" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Notifications
                  </Link>
                  <Link to="/profile" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                    Profile
                  </Link>
                  {userRole === 'production' && (
                    <Link to="/find-jobs" className="text-lg font-semibold text-brand-blue hover:text-brand-blue-600">
                      Find Jobs
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/" className="flex items-center relative z-10 gap-0">
            <FilmRoll className="w-20 h-8" />
            <div className="relative z-10 -ml-1">
              <span className="text-xl font-extrabold text-brand-blue">PA</span>
              <span className="text-xl font-extrabold text-brand-teal">Connect</span>
            </div>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-4">
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
            <Link to="/job-history" className="font-medium text-gray-600 hover:text-brand-blue dark:text-gray-200 dark:hover:text-brand-blue-300">
              <History className="h-4 w-4 inline mr-1" />
              Job History
            </Link>
          </nav>
        )}
        
        <NavItems />
      </div>
    </header>
  );
}
