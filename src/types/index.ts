
export type UserRole = 'assistant' | 'production';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type PAType = 'truck_pa' | 'set_pa' | 'ad_pa' | 'events_pa' | 'photoshoot_pa' | 'script_pa' | 'office_pa' | 'locations_pa';

export const paTypeLabels: Record<PAType, string> = {
  truck_pa: 'Truck PA',
  set_pa: 'Set PA',
  ad_pa: 'AD (Assistant Director)',
  events_pa: 'Events PA',
  photoshoot_pa: 'Photoshoot PA',
  script_pa: 'Script PA',
  office_pa: 'Office PA',
  locations_pa: 'Locations PA'
};

export interface Assistant {
  id: string;
  userId: string;
  name: string;
  photo: string;
  bio: string;
  experience: string[];
  specialties: ProductionType[];
  paTypes: PAType[];
  location: string;
  availableCities: string[];
  rating: number;
  jobHistory?: JobHistoryItem[];
  resumeUrl?: string;
}

export interface Production {
  id: string;
  userId: string;
  name: string;
  logo: string;
  description: string;
  specialties: ProductionType[];
  location: string;
  rating: number;
  jobHistory?: JobHistoryItem[];
}

export interface JobHistoryItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  productionType: ProductionType;
  paType?: PAType;
  description?: string;
}

export type ProductionType = 'music_video' | 'commercial' | 'film' | 'tv' | 'documentary' | 'corporate' | 'other';

export const productionTypeLabels: Record<ProductionType, string> = {
  music_video: 'Music Video',
  commercial: 'Commercial',
  film: 'Film',
  tv: 'TV Show',
  documentary: 'Documentary',
  corporate: 'Corporate',
  other: 'Other'
};

export type BookingStatus = 'available' | 'held' | 'booked';

export interface Booking {
  id: string;
  assistantId: string;
  productionId?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  productionType?: ProductionType;
  paType?: PAType;
  description?: string;
  location?: string;
}

export interface Job {
  id: string;
  productionId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  productionType: ProductionType;
  paType: PAType;
  rate?: string;
  requirements?: string[];
  applicants?: string[]; // assistant IDs
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}
