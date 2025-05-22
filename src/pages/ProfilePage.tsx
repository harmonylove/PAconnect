
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Camera, MapPin, X, Save, Edit } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@/contexts/UserContext';
import { ProductionType, productionTypeLabels } from '@/types';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  location: z.string().min(2, {
    message: "Please enter your location.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }),
  travelingAvailable: z.boolean().optional(),
  specialties: z.array(z.string()).optional(),
  availableCities: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { userRole } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [specialties, setSpecialties] = useState<ProductionType[]>(['film', 'tv', 'documentary']);
  
  // Default values based on mock data
  const defaultValues: ProfileFormValues = {
    name: "Sara Johnson",
    email: "sara.johnson@example.com",
    phone: "(555) 123-4567",
    location: "Los Angeles, CA",
    bio: "Professional PA with 5+ years of experience in film and TV production. I specialize in keeping sets organized and running efficiently. Always punctual, detail-oriented, and ready to solve problems before they arise.",
    travelingAvailable: true,
    specialties: specialties,
    availableCities: "San Francisco, San Diego, Las Vegas",
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });
  
  function onSubmit(data: ProfileFormValues) {
    toast.success("Profile updated successfully");
    console.log(data);
    setIsEditing(false);
  }

  const addSpecialty = (type: ProductionType) => {
    if (!specialties.includes(type)) {
      setSpecialties([...specialties, type]);
    }
  };

  const removeSpecialty = (type: ProductionType) => {
    setSpecialties(specialties.filter(t => t !== type));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" form="profile-form">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Profile Picture & Personal Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-background">
                      <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" />
                      <AvatarFallback className="text-xl">SJ</AvatarFallback>
                    </Avatar>
                    
                    {isEditing && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 rounded-full">
                            <Camera className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Profile Picture</DialogTitle>
                            <DialogDescription>
                              Upload a new profile picture or choose from the gallery.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Button variant="outline">Upload Photo</Button>
                              <Button variant="outline">Use Camera</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
                <CardTitle className="mt-2">Sara Johnson</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Los Angeles, CA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-t pt-3 mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground text-sm">Role</div>
                    <div className="text-sm font-medium text-right">
                      {userRole === 'assistant' ? 'Production Assistant' : 'Production Company'}
                    </div>
                    <div className="text-muted-foreground text-sm">Member Since</div>
                    <div className="text-sm font-medium text-right">January 2023</div>
                    <div className="text-muted-foreground text-sm">Completed Jobs</div>
                    <div className="text-sm font-medium text-right">24</div>
                    <div className="text-muted-foreground text-sm">Rating</div>
                    <div className="text-sm font-medium text-right">4.9/5.0</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {specialties.map(specialty => (
                    <Badge 
                      key={specialty} 
                      variant="secondary"
                      className="text-sm flex items-center"
                    >
                      {productionTypeLabels[specialty]}
                      {isEditing && (
                        <button 
                          className="ml-1 hover:text-destructive"
                          onClick={() => removeSpecialty(specialty)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="mt-4">
                    <Select onValueChange={(value: ProductionType) => addSpecialty(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(productionTypeLabels).map(([key, label]) => (
                          <SelectItem 
                            key={key} 
                            value={key}
                            disabled={specialties.includes(key as ProductionType)}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Editable form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Update your profile information below" 
                    : "Your professional details and contact information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form 
                    id="profile-form" 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                {...field} 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(555) 123-4567" 
                                {...field} 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="City, State" 
                                {...field} 
                                disabled={!isEditing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell productions about your experience and skills" 
                              rows={6}
                              {...field} 
                              disabled={!isEditing} 
                            />
                          </FormControl>
                          <FormDescription>
                            {500 - (field.value?.length || 0)} characters remaining
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="availableCities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Cities</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter cities where you're available to work, separated by commas" 
                              {...field} 
                              disabled={!isEditing} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter cities where you're available to work, separated by commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
