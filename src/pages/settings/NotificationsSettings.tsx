import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Monitor, 
  ArrowLeft,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export const NotificationsSettings = () => {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    email: {
      projectUpdates: true,
      securityAlerts: true,
      marketingEmails: false,
      weeklyDigest: true
    },
    push: {
      deployments: true,
      errors: true,
      collaboratorUpdates: false
    },
    desktop: {
      enabled: true,
      buildCompletions: true,
      mentions: true
    },
    codeReviews: {
      email: true,
      push: true,
      desktop: true
    },
    debugSessions: {
      email: true,
      push: false,
      desktop: true
    },
    weeklyReport: {
      email: true,
      push: false,
      desktop: false
    },
    teamActivity: {
      email: false,
      push: true,
      desktop: true
    },
    productUpdates: {
      email: true,
      push: false,
      desktop: false
    }
  });

  const handleNotificationChange = (category: string, setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({ 
      title: "Settings saved", 
      description: "Your notification preferences have been updated" 
    });
  };

  const NotificationSection = ({ 
    title, 
    description, 
    icon: Icon, 
    category, 
    settings 
  }: {
    title: string;
    description: string;
    icon: any;
    category: string;
    settings: { [key: string]: boolean };
  }) => (
    <Card className="glass-subtle">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
              <p className="text-xs text-muted-foreground">
                Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </p>
            </div>
            <Switch
              checked={value}
              onCheckedChange={(checked) => handleNotificationChange(category, key, checked)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );

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
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Configure how and when you receive notifications
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Notification Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your notification preferences across different channels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Mail className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">4 active notifications</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Smartphone className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-semibold mb-1">Push</h3>
                      <p className="text-sm text-muted-foreground">2 active notifications</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Monitor className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-semibold mb-1">Desktop</h3>
                      <p className="text-sm text-muted-foreground">5 active notifications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Notifications */}
              <NotificationSection
                title="Email Notifications"
                description="Configure email notification preferences"
                icon={Mail}
                category="email"
                settings={notifications.email}
              />

              {/* Push Notifications */}
              <NotificationSection
                title="Push Notifications"
                description="Manage mobile push notifications"
                icon={Smartphone}
                category="push"
                settings={notifications.push}
              />

              {/* Desktop Notifications */}
              <NotificationSection
                title="Desktop Notifications"
                description="Configure desktop notification settings"
                icon={Monitor}
                category="desktop"
                settings={notifications.desktop}
              />

              <Separator />

              {/* Specific Notification Types */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Specific Notifications</h2>
                
                <NotificationSection
                  title="Code Reviews"
                  description="Notifications for code review activities"
                  icon={Bell}
                  category="codeReviews"
                  settings={notifications.codeReviews}
                />

                <NotificationSection
                  title="Debug Sessions"
                  description="Notifications during debugging sessions"
                  icon={Bell}
                  category="debugSessions"
                  settings={notifications.debugSessions}
                />

                <NotificationSection
                  title="Weekly Reports"
                  description="Weekly summary and analytics reports"
                  icon={Bell}
                  category="weeklyReport"
                  settings={notifications.weeklyReport}
                />

                <NotificationSection
                  title="Team Activity"
                  description="Notifications about team member activities"
                  icon={Bell}
                  category="teamActivity"
                  settings={notifications.teamActivity}
                />

                <NotificationSection
                  title="Product Updates"
                  description="New features and product announcements"
                  icon={Bell}
                  category="productUpdates"
                  settings={notifications.productUpdates}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Notification Settings</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
