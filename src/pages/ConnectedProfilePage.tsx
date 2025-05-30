
import { useState } from 'react';
import { ArrowLeft, Edit2, Save, X, Star, Plus, Minus, MapPin, Mail, Phone, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import { UserRole, productionTypeLabels, paTypeLabels } from '@/types';

// Mock data with proper typing
const mockProfile = {
  assistant: {
    id: "a1",
    name: "Sara Johnson",
    email: "sara.johnson@email.com",
    phone: "+1 (555) 123-4567",
    photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    bio: "Professional PA with 5+ years of experience in film and TV production. I specialize in keeping sets organized and running efficiently.",
    location: "Los Angeles, CA",
    availableCities: ["San Francisco", "San Diego", "Las Vegas"],
    specialties: ["film", "tv", "documentary"],
    paTypes: ["set_pa", "truck_pa", "script_pa"],
    rating: 4.9
  },
  production: {
    id: "p1",
    name: "Acme Productions",
    email: "contact@acmeproductions.com",
    phone: "+1 (555) 987-6543",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    description: "Award-winning production company specializing in commercials and music videos. We work with top brands and artists.",
    location: "Los Angeles, CA",
    specialties: ["commercial", "music_video", "film"],
    rating: 4.7
  }
};

export default function ConnectedProfilePage() {
  const [userRole] = useState<UserRole>('production'); // Default to production for demo
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(mockProfile[userRole]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...mockProfile[userRole] });
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...mockProfile[userRole] });
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setEditedProfile(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handlePATypeToggle = (paType: string) => {
    if (userRole === 'assistant') {
      const assistantProfile = editedProfile as typeof mockProfile.assistant;
      setEditedProfile(prev => ({
        ...prev,
        paTypes: assistantProfile.paTypes.includes(paType)
          ? assistantProfile.paTypes.filter(pt => pt !== paType)
          : [...assistantProfile.paTypes, paType]
      }));
    }
  };

  const currentProfile = isEditing ? editedProfile : mockProfile[userRole];
  const assistantProfile = userRole === 'assistant' ? currentProfile as typeof mockProfile.assistant : null;
  const productionProfile = userRole === 'production' ? currentProfile as typeof mockProfile.production : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header userRole={userRole} />
      
      <main className="max-w-4xl mx-auto px-4 py-6 md:px-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-brand-blue hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="relative h-40 bg-gradient-to-r from-brand-blue-100 to-brand-teal-50">
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <Button onClick={handleEdit} variant="outline" size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 pt-20 pb-0">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage 
                  src={assistantProfile?.photo || productionProfile?.logo} 
                  alt={currentProfile.name} 
                />
                <AvatarFallback className="text-xl font-semibold bg-brand-blue text-white">
                  {currentProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-12 px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Name and Rating */}
                <div>
                  {isEditing ? (
                    <Input
                      value={currentProfile.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className="text-2xl font-bold border-0 p-0 h-auto"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{currentProfile.name}</h1>
                  )}
                  
                  <div className="flex items-center mt-2 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      {isEditing ? (
                        <Input
                          value={currentProfile.location}
                          onChange={(e) => handleFieldChange('location', e.target.value)}
                          className="border-0 p-0 h-auto"
                        />
                      ) : (
                        <span className="text-muted-foreground">{currentProfile.location}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{currentProfile.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <h2 className="font-semibold text-lg">Contact Information</h2>
                  
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                    {isEditing ? (
                      <Input
                        type="email"
                        value={currentProfile.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className="border-0 p-0 h-auto"
                      />
                    ) : (
                      <span>{currentProfile.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-muted-foreground mr-3" />
                    {isEditing ? (
                      <Input
                        value={currentProfile.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className="border-0 p-0 h-auto"
                      />
                    ) : (
                      <span>{currentProfile.phone}</span>
                    )}
                  </div>
                </div>
                
                {/* Bio/Description */}
                <div>
                  <h2 className="font-semibold text-lg mb-2">
                    {userRole === 'assistant' ? 'About' : 'Company Description'}
                  </h2>
                  {isEditing ? (
                    <Textarea
                      value={assistantProfile?.bio || productionProfile?.description || ''}
                      onChange={(e) => handleFieldChange(
                        userRole === 'assistant' ? 'bio' : 'description', 
                        e.target.value
                      )}
                      className="min-h-24"
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      {assistantProfile?.bio || productionProfile?.description}
                    </p>
                  )}
                </div>
                
                {/* Available Cities (Assistant only) */}
                {userRole === 'assistant' && assistantProfile && (
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Available Locations</h2>
                    <div className="text-muted-foreground">
                      <div className="font-medium text-foreground">{currentProfile.location}</div>
                      {assistantProfile.availableCities.length > 0 && (
                        <div className="mt-1">
                          Also available in: {assistantProfile.availableCities.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column - Specialties and Skills */}
              <div className="space-y-6">
                {/* Production Specialties */}
                <div>
                  <h2 className="font-semibold text-lg mb-3">Production Specialties</h2>
                  {isEditing ? (
                    <div className="space-y-2">
                      {Object.entries(productionTypeLabels).map(([key, label]) => (
                        <label key={key} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentProfile.specialties.includes(key)}
                            onChange={() => handleSpecialtyToggle(key)}
                            className="rounded"
                          />
                          <span className="text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {currentProfile.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-sm">
                          {productionTypeLabels[specialty]}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* PA Types (Assistant only) */}
                {userRole === 'assistant' && assistantProfile && (
                  <div>
                    <h2 className="font-semibold text-lg mb-3">PA Types</h2>
                    {isEditing ? (
                      <div className="space-y-2">
                        {Object.entries(paTypeLabels).map(([key, label]) => (
                          <label key={key} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={assistantProfile.paTypes.includes(key)}
                              onChange={() => handlePATypeToggle(key)}
                              className="rounded"
                            />
                            <span className="text-sm">{label}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {assistantProfile.paTypes.map((paType) => (
                          <Badge key={paType} variant="outline" className="text-sm bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                            {paTypeLabels[paType]}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Rating Section for Production Company */}
                {userRole === 'production' && (
                  <div>
                    <h2 className="font-semibold text-lg mb-3">Rate this Assistant</h2>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-6 w-6 cursor-pointer hover:text-yellow-400 transition-colors"
                            fill={star <= 4 ? "currentColor" : "none"}
                            color={star <= 4 ? "#facc15" : "#d1d5db"}
                          />
                        ))}
                      </div>
                      <Textarea
                        placeholder="Leave a review for this assistant..."
                        className="min-h-20"
                      />
                      <Button className="w-full bg-brand-teal hover:bg-brand-teal-600">
                        Submit Rating
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
