import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Lock,
  Key,
  Smartphone,
  Monitor,
  Globe,
  UserCheck,
  Activity,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export const SecuritySettings = () => {
  const { toast } = useToast();
  
  const [securityData] = useState({
    twoFactorEnabled: true,
    lastPasswordChange: '2024-01-10',
    lastLogin: '2024-01-20 14:30',
    loginLocation: 'San Francisco, CA',
    loginDevice: 'Chrome on MacBook Pro',
    
    activeSessions: [
      {
        id: '1',
        device: 'MacBook Pro',
        browser: 'Chrome',
        location: 'San Francisco, CA',
        lastActive: '2 minutes ago',
        current: true
      },
      {
        id: '2',
        device: 'iPhone 15',
        browser: 'Safari',
        location: 'San Francisco, CA',
        lastActive: '1 hour ago',
        current: false
      },
      {
        id: '3',
        device: 'Windows PC',
        browser: 'Firefox',
        location: 'New York, NY',
        lastActive: '2 days ago',
        current: false
      }
    ],
    
    securityEvents: [
      {
        id: '1',
        type: 'login',
        description: 'Successful login from new device',
        location: 'San Francisco, CA',
        timestamp: '2024-01-20 14:30',
        status: 'success'
      },
      {
        id: '2',
        type: 'password_change',
        description: 'Password changed successfully',
        location: 'San Francisco, CA',
        timestamp: '2024-01-10 09:15',
        status: 'success'
      },
      {
        id: '3',
        type: 'failed_login',
        description: 'Failed login attempt',
        location: 'Unknown',
        timestamp: '2024-01-15 22:45',
        status: 'warning'
      }
    ]
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({ 
        title: "Error", 
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }
    
    toast({ 
      title: "Password updated", 
      description: "Your password has been changed successfully" 
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRevokeSession = (sessionId: string) => {
    toast({ 
      title: "Session revoked", 
      description: "The session has been terminated" 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
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
            Security Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account security and monitor login activity
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Security Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Current security status and recent activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Lock className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                      <h3 className="font-semibold mb-1">2FA Status</h3>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Enabled
                      </Badge>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Activity className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold mb-1">Last Login</h3>
                      <p className="text-sm text-muted-foreground">{securityData.lastLogin}</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Globe className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-sm text-muted-foreground">{securityData.loginLocation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Password Security */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>Password Security</span>
                  </CardTitle>
                  <CardDescription>
                    Change your password and manage password settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 glass-subtle rounded-xl">
                    <div>
                      <h3 className="font-medium">Current Password</h3>
                      <p className="text-sm text-muted-foreground">Last changed: {securityData.lastPasswordChange}</p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Strong
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <Button onClick={handlePasswordChange} className="w-full">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5" />
                    <span>Two-Factor Authentication</span>
                  </CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 glass-subtle rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Authenticator App</h3>
                        <p className="text-sm text-muted-foreground">Use an app like Google Authenticator</p>
                      </div>
                    </div>
                    <Switch checked={securityData.twoFactorEnabled} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 glass-subtle rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Monitor className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Backup Codes</h3>
                        <p className="text-sm text-muted-foreground">Generate backup codes for emergencies</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Active Sessions</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your active login sessions across devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityData.activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 glass-subtle rounded-xl border border-border-glass">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Monitor className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{session.device}</h3>
                            {session.current && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{session.browser} • {session.location}</p>
                          <p className="text-xs text-muted-foreground">Last active: {session.lastActive}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevokeSession(session.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Events */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Security Events</span>
                  </CardTitle>
                  <CardDescription>
                    Recent security-related activities on your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityData.securityEvents.map((event) => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 glass-subtle rounded-xl border border-border-glass">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getStatusIcon(event.status)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{event.description}</h3>
                          <p className="text-sm text-muted-foreground">{event.location} • {event.timestamp}</p>
                        </div>
                        <Badge variant="outline" className={
                          event.status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          event.status === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Recommendations */}
              <Card className="glass-subtle border-amber-200/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Security Recommendations</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Use a strong, unique password for your account</p>
                        <p>• Enable two-factor authentication for added security</p>
                        <p>• Regularly review your active sessions and revoke suspicious ones</p>
                        <p>• Keep your devices and browsers updated</p>
                        <p>• Be cautious of phishing attempts and suspicious links</p>
                      </div>
                    </div>
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
