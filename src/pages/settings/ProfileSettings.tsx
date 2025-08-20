import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Key, 
  Github, 
  Bell, 
  BarChart3, 
  CreditCard, 
  Shield, 
  Download, 
  Trash2,
  CheckCircle,
  Camera,
  Save,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import avatar1 from '@/assets/avatar-1.jpg';

export const ProfileSettings = () => {
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    website: 'https://johndoe.dev',
    bio: 'Full-stack developer passionate about AI and modern web technologies.',
    location: 'San Francisco, CA',
    company: 'Acme Inc',
    plan: 'Pro'
  });

  const handleSaveProfile = () => {
    toast({ title: "Profile saved", description: "Your profile has been updated successfully" });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Settings</span>
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and account details
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Profile Overview */}
              <div className="glass-subtle p-6 rounded-2xl">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <img 
                      src={avatar1} 
                      alt="Profile"
                      className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20"
                    />
                    <Button 
                      variant="glass-primary" 
                      size="icon-sm"
                      className="absolute -bottom-2 -right-2"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                    <p className="text-muted-foreground mb-2">@{profileData.username}</p>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 text-sm">{profileData.plan} Plan</span>
                    </div>
                  </div>

                  <Button variant="hero">
                    Upgrade Plan
                  </Button>
                </div>
              </div>

              {/* Profile Form */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="Enter your username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://your-website.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveProfile} className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
