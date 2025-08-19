import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Github, 
  Mail, 
  Globe,
  Camera,
  Save,
  Moon,
  Sun,
  Code2,
  CheckCircle
} from 'lucide-react';
import avatar1 from '@/assets/avatar-1.jpg';

export const Profile: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState({
    codeReviews: true,
    debugSessions: false,
    weeklyReport: true,
    teamActivity: true,
    productUpdates: false,
  });

  const [profileData, setProfileData] = useState({
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    username: 'alexdev',
    bio: 'Full-stack developer passionate about clean code and AI-powered development tools.',
    website: 'https://alexdev.com',
    location: 'San Francisco, CA',
    githubConnected: true,
    plan: 'Pro',
  });

  const handleSaveProfile = () => {
    // Save profile logic
    console.log('Profile saved');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Overview Card */}
        <div className="glass-card p-8 rounded-3xl mb-8">
          <div className="flex items-center space-x-6">
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
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600">{profileData.plan} Plan</span>
                </div>
                {profileData.githubConnected && (
                  <div className="flex items-center space-x-1">
                    <Github className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">GitHub Connected</span>
                  </div>
                )}
              </div>
            </div>

            <Button variant="hero">
              Upgrade Plan
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <Tabs defaultValue="profile" className="w-full">
            
            {/* Tab Navigation */}
            <div className="border-b border-border-glass bg-background-glass/30 px-6 py-4">
              <TabsList className="glass-subtle p-1">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Profile Tab */}
            <TabsContent value="profile" className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-glass w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                      className="input-glass w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="input-glass w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      className="input-glass w-full"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="input-glass w-full h-24 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="input-glass w-full"
                    placeholder="City, Country"
                  />
                </div>

                <Button onClick={handleSaveProfile} variant="hero">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="p-6">
              <div className="space-y-8">
                
                {/* Theme Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Appearance
                  </h3>
                  <div className="glass-subtle p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        <div>
                          <div className="font-medium text-foreground">Dark Mode</div>
                          <div className="text-sm text-muted-foreground">
                            Switch between light and dark themes
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDark(!isDark)}
                      >
                        {isDark ? 'Light' : 'Dark'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Editor Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Editor Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="glass-subtle p-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">Auto-save</div>
                          <div className="text-sm text-muted-foreground">
                            Automatically save your code changes
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>
                    </div>

                    <div className="glass-subtle p-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">Font Size</div>
                          <div className="text-sm text-muted-foreground">
                            Adjust code editor font size
                          </div>
                        </div>
                        <select className="input-glass px-3 py-1 text-sm">
                          <option>12px</option>
                          <option selected>14px</option>
                          <option>16px</option>
                          <option>18px</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    AI Assistant
                  </h3>
                  <div className="space-y-4">
                    <div className="glass-subtle p-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">Response Detail</div>
                          <div className="text-sm text-muted-foreground">
                            How detailed should AI responses be?
                          </div>
                        </div>
                        <select className="input-glass px-3 py-1 text-sm">
                          <option>Concise</option>
                          <option selected>Detailed</option>
                          <option>Comprehensive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    {Object.entries({
                      codeReviews: 'Code Review Completions',
                      debugSessions: 'Debug Session Results',
                      weeklyReport: 'Weekly Activity Report',
                      teamActivity: 'Team Activity Updates',
                      productUpdates: 'Product Updates & News',
                    }).map(([key, label]) => (
                      <div key={key} className="glass-subtle p-4 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground">{label}</div>
                            <div className="text-sm text-muted-foreground">
                              Receive notifications about {label.toLowerCase()}
                            </div>
                          </div>
                          <Button
                            variant={notifications[key as keyof typeof notifications] ? "hero" : "outline"}
                            size="sm"
                            onClick={() => handleNotificationChange(key, !notifications[key as keyof typeof notifications])}
                          >
                            {notifications[key as keyof typeof notifications] ? 'On' : 'Off'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="p-6">
              <div className="space-y-8">
                
                {/* Connected Accounts */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Connected Accounts
                  </h3>
                  <div className="glass-subtle p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Github className="w-6 h-6" />
                        <div>
                          <div className="font-medium text-foreground">GitHub</div>
                          <div className="text-sm text-muted-foreground">
                            Connected • Access to repositories
                          </div>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Password Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Password & Authentication
                  </h3>
                  <div className="space-y-4">
                    <div className="glass-subtle p-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">Change Password</div>
                          <div className="text-sm text-muted-foreground">
                            Last updated 3 months ago
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>

                    <div className="glass-subtle p-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">Two-Factor Authentication</div>
                          <div className="text-sm text-muted-foreground">
                            Add an extra layer of security
                          </div>
                        </div>
                        <Button variant="hero" size="sm">
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4">
                    Danger Zone
                  </h3>
                  <div className="glass-subtle p-4 rounded-2xl border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Delete Account</div>
                        <div className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};