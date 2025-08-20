import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Camera,
  Save,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Smartphone,
  Mail
} from 'lucide-react';
import avatar1 from '@/assets/avatar-1.jpg';

export const Settings: React.FC = () => {
  const { section = 'profile' } = useParams();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    username: 'alexdev',
    bio: 'Full-stack developer passionate about clean code and AI-powered development tools.',
    website: 'https://alexdev.com',
    location: 'San Francisco, CA',
    plan: 'Pro',
  });

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API', key: 'cm_live_1234567890abcdef', lastUsed: '2 hours ago', usage: 1250 },
    { id: '2', name: 'Development API', key: 'cm_dev_abcdef1234567890', lastUsed: '1 day ago', usage: 450 },
  ]);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  // Notifications state
  const [notifications, setNotifications] = useState({
    codeReviews: { email: true, push: false, desktop: true },
    debugSessions: { email: false, push: true, desktop: false },
    weeklyReport: { email: true, push: false, desktop: true },
    teamActivity: { email: true, push: true, desktop: false },
    productUpdates: { email: false, push: false, desktop: true },
  });

  const validSections = ['profile', 'api-keys', 'integrations', 'notifications', 'analysis', 'billing', 'security', 'export', 'delete'];
  
  if (!validSections.includes(section)) {
    return <Navigate to="/settings/profile" replace />;
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskKey = (key: string) => {
    const visible = key.slice(0, 12);
    const masked = '•'.repeat(16);
    return visible + masked;
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    // Show toast notification
  };

  const handleSaveProfile = () => {
    console.log('Profile saved');
  };

  const handleNotificationChange = (category: string, type: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: { ...prev[category as keyof typeof prev], [type]: value }
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and integrations
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <Tabs value={section} className="w-full">
            
            {/* Tab Navigation */}
            <div className="border-b border-border-glass bg-background-glass/30 px-6 py-4">
              <div className="flex flex-wrap gap-2">
                <Link to="/settings/profile">
                  <TabsTrigger value="profile" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/api-keys">
                  <TabsTrigger value="api-keys" className="flex items-center space-x-2">
                    <Key className="w-4 h-4" />
                    <span>API Keys</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/integrations">
                  <TabsTrigger value="integrations" className="flex items-center space-x-2">
                    <Github className="w-4 h-4" />
                    <span>Integrations</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/notifications">
                  <TabsTrigger value="notifications" className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/analysis">
                  <TabsTrigger value="analysis" className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Analysis</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/billing">
                  <TabsTrigger value="billing" className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Billing</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/security">
                  <TabsTrigger value="security" className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Security</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/export">
                  <TabsTrigger value="export" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </TabsTrigger>
                </Link>
                <Link to="/settings/delete">
                  <TabsTrigger value="delete" className="flex items-center space-x-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </TabsTrigger>
                </Link>
              </div>
            </div>

            {/* Profile Tab */}
            <TabsContent value="profile" className="p-6">
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
              </div>
            </TabsContent>

            {/* API Keys Tab */}
            <TabsContent value="api-keys" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    API Key Management
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Manage your API keys for integrating with external services and monitoring usage.
                  </p>
                </div>

                {/* Usage Overview */}
                <div className="glass-subtle p-6 rounded-2xl">
                  <h4 className="font-semibold text-foreground mb-4">Usage Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">1,700</div>
                      <div className="text-sm text-muted-foreground">Total Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-500">$23.50</div>
                      <div className="text-sm text-muted-foreground">Current Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">78%</div>
                      <div className="text-sm text-muted-foreground">Quota Used</div>
                    </div>
                  </div>
                </div>

                {/* API Keys List */}
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="glass-subtle p-4 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-medium text-foreground">{key.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            Last used: {key.lastUsed} • {key.usage} requests
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => toggleKeyVisibility(key.id)}
                          >
                            {showKeys[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => copyToClipboard(key.key)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="font-mono text-sm p-3 bg-background-muted rounded-lg">
                        {showKeys[key.id] ? key.key : maskKey(key.key)}
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="hero">
                  <Key className="w-4 h-4" />
                  Generate New API Key
                </Button>
              </div>
            </TabsContent>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Connected Services
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Manage your connected integrations and their health status.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="glass-subtle p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Github className="w-6 h-6" />
                        <div>
                          <div className="font-medium text-foreground">GitHub</div>
                          <div className="text-sm text-emerald-600">
                            ✓ Connected • 15 repositories accessible
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                        <Button variant="destructive" size="sm">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-subtle p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Slack</div>
                          <div className="text-sm text-muted-foreground">
                            Not connected
                          </div>
                        </div>
                      </div>
                      <Button variant="hero" size="sm">
                        Connect
                      </Button>
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
                    Notification Preferences
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Configure how and when you want to receive notifications.
                  </p>
                </div>

                <div className="space-y-6">
                  {Object.entries({
                    codeReviews: 'Code Review Completions',
                    debugSessions: 'Debug Session Results', 
                    weeklyReport: 'Weekly Activity Report',
                    teamActivity: 'Team Activity Updates',
                    productUpdates: 'Product Updates & News',
                  }).map(([key, label]) => (
                    <div key={key} className="glass-subtle p-4 rounded-2xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Receive notifications about {label.toLowerCase()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-6 ml-6">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <Button
                              variant={notifications[key as keyof typeof notifications].email ? "hero" : "outline"}
                              size="sm"
                              onClick={() => handleNotificationChange(key, 'email', !notifications[key as keyof typeof notifications].email)}
                            >
                              Email
                            </Button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-4 h-4 text-muted-foreground" />
                            <Button
                              variant={notifications[key as keyof typeof notifications].push ? "hero" : "outline"}
                              size="sm"
                              onClick={() => handleNotificationChange(key, 'push', !notifications[key as keyof typeof notifications].push)}
                            >
                              Push
                            </Button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Monitor className="w-4 h-4 text-muted-foreground" />
                            <Button
                              variant={notifications[key as keyof typeof notifications].desktop ? "hero" : "outline"}
                              size="sm"
                              onClick={() => handleNotificationChange(key, 'desktop', !notifications[key as keyof typeof notifications].desktop)}
                            >
                              Desktop
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Analysis Preferences
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Configure default analysis settings and custom rules for code review.
                  </p>
                </div>

                {/* Default Analysis Settings */}
                <div className="glass-subtle p-6 rounded-2xl">
                  <h4 className="font-medium text-foreground mb-4">Default Analysis Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Code Quality Analysis</div>
                        <div className="text-sm text-muted-foreground">
                          Analyze code structure, complexity, and maintainability
                        </div>
                      </div>
                      <Button variant="hero" size="sm">Enabled</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Security Vulnerability Scan</div>
                        <div className="text-sm text-muted-foreground">
                          Check for common security issues and vulnerabilities
                        </div>
                      </div>
                      <Button variant="hero" size="sm">Enabled</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Performance Analysis</div>
                        <div className="text-sm text-muted-foreground">
                          Identify potential performance bottlenecks
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disabled</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Documentation Coverage</div>
                        <div className="text-sm text-muted-foreground">
                          Check for missing documentation and comments
                        </div>
                      </div>
                      <Button variant="hero" size="sm">Enabled</Button>
                    </div>
                  </div>
                </div>

                {/* Custom Rules */}
                <div className="glass-subtle p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground">Custom Analysis Rules</h4>
                    <Button variant="hero" size="sm">
                      Add Rule
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border-glass rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-foreground">No console.log in production</div>
                        <div className="text-xs text-muted-foreground">JavaScript/TypeScript</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border-glass rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-foreground">Enforce type annotations</div>
                        <div className="text-xs text-muted-foreground">TypeScript</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Depth */}
                <div className="glass-subtle p-6 rounded-2xl">
                  <h4 className="font-medium text-foreground mb-4">Analysis Depth</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="depth" id="quick" className="text-primary" defaultChecked />
                      <label htmlFor="quick" className="text-sm">
                        <span className="font-medium text-foreground">Quick Analysis</span>
                        <span className="text-muted-foreground"> - Basic checks and common issues</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="depth" id="thorough" className="text-primary" />
                      <label htmlFor="thorough" className="text-sm">
                        <span className="font-medium text-foreground">Thorough Analysis</span>
                        <span className="text-muted-foreground"> - Comprehensive code review</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="depth" id="deep" className="text-primary" />
                      <label htmlFor="deep" className="text-sm">
                        <span className="font-medium text-foreground">Deep Analysis</span>
                        <span className="text-muted-foreground"> - Advanced patterns and architecture review</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Billing & Subscription
                  </h3>
                </div>

                <div className="glass-subtle p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">Pro Plan</h4>
                      <p className="text-muted-foreground">$29/month • Billed monthly</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">2,847</div>
                      <div className="text-sm text-muted-foreground">API Calls Used</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-500">12</div>
                      <div className="text-sm text-muted-foreground">Days Remaining</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">$42.30</div>
                      <div className="text-sm text-muted-foreground">Next Bill</div>
                    </div>
                  </div>
                </div>

                <div className="glass-subtle p-4 rounded-2xl">
                  <h4 className="font-medium text-foreground mb-3">Payment Method</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">••••</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                        <div className="text-xs text-muted-foreground">Expires 12/26</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Security & Privacy
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="glass-subtle p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Button variant="hero" size="sm">
                        Enable
                      </Button>
                    </div>
                  </div>

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
                        <div className="font-medium text-foreground">Security Audit Log</div>
                        <div className="text-sm text-muted-foreground">
                          View recent security events and login activity
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Log
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Export Data Tab */}
            <TabsContent value="export" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Export Your Data
                  </h3>
                  <p className="text-muted-foreground">
                    Download a copy of your data including code reviews, analysis results, and settings.
                  </p>
                </div>

                <div className="glass-subtle p-6 rounded-2xl">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Available Exports</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-border-glass rounded-lg">
                        <span className="text-sm">Code Reviews & Analysis</span>
                        <Button variant="outline" size="sm">Export</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border-glass rounded-lg">
                        <span className="text-sm">Account Settings</span>
                        <Button variant="outline" size="sm">Export</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border-glass rounded-lg">
                        <span className="text-sm">Usage Analytics</span>
                        <Button variant="outline" size="sm">Export</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Delete Account Tab */}
            <TabsContent value="delete" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-4">
                    Delete Account
                  </h3>
                  <div className="glass-subtle p-6 rounded-2xl border border-red-500/20">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-2">
                          This action cannot be undone
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Deleting your account will permanently remove all your data, including:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                          <li>• All code reviews and analysis results</li>
                          <li>• API keys and integrations</li>
                          <li>• Usage history and analytics</li>
                          <li>• Team collaborations</li>
                          <li>• Account settings and preferences</li>
                        </ul>
                        
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Type 'DELETE' to confirm"
                            className="input-glass w-full max-w-md"
                          />
                          <Button variant="destructive" disabled>
                            <Trash2 className="w-4 h-4" />
                            Delete My Account
                          </Button>
                        </div>
                      </div>
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