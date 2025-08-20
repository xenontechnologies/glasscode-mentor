import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Slack, 
  Mail, 
  Smartphone, 
  Monitor, 
  FileText, 
  Code, 
  Database,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Settings,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const IntegrationsSettings = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = useState([
    { id: 'github', name: 'GitHub', status: 'connected', icon: Github, description: 'Sync your repositories', lastSync: '2 minutes ago' },
    { id: 'slack', name: 'Slack', status: 'pending', icon: Slack, description: 'Get notifications in Slack', lastSync: 'Never' },
    { id: 'email', name: 'Email', status: 'connected', icon: Mail, description: 'Email notifications', lastSync: '1 hour ago' },
    { id: 'mobile', name: 'Mobile App', status: 'disconnected', icon: Smartphone, description: 'Push notifications', lastSync: 'Never' },
    { id: 'desktop', name: 'Desktop App', status: 'connected', icon: Monitor, description: 'Desktop notifications', lastSync: '5 minutes ago' },
    { id: 'docs', name: 'Documentation', status: 'disconnected', icon: FileText, description: 'Sync documentation', lastSync: 'Never' },
    { id: 'api', name: 'API Integration', status: 'connected', icon: Code, description: 'Custom API endpoints', lastSync: '30 minutes ago' },
    { id: 'database', name: 'Database', status: 'disconnected', icon: Database, description: 'Database connections', lastSync: 'Never' },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'disconnected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Disconnected</Badge>;
      default:
        return null;
    }
  };

  const handleConnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'pending' as const }
        : integration
    ));
    
    // Simulate connection process
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'connected' as const, lastSync: 'Just now' }
          : integration
      ));
      toast({ title: "Connected", description: "Integration connected successfully" });
    }, 2000);
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'disconnected' as const, lastSync: 'Never' }
        : integration
    ));
    toast({ title: "Disconnected", description: "Integration disconnected successfully" });
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
            Integrations
          </h1>
          <p className="text-muted-foreground">
            Connect external services and tools to enhance your workflow
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Integration Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Github className="w-5 h-5" />
                    <span>Integration Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your connected services and tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-emerald-600">4</div>
                      <div className="text-sm text-muted-foreground">Connected</div>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-yellow-600">1</div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <div className="text-sm text-muted-foreground">Disconnected</div>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations Grid */}
              <Card className="glass-subtle">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5" />
                        <span>Available Integrations</span>
                      </CardTitle>
                      <CardDescription>
                        Connect and manage your external services
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Custom</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {integrations.map((integration) => {
                      const Icon = integration.icon;
                      return (
                        <div key={integration.id} className="glass-subtle p-6 rounded-xl border border-border-glass">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">{integration.name}</h3>
                                {getStatusBadge(integration.status)}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            {integration.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Last sync:</span>
                              <span>{integration.lastSync}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {integration.status === 'connected' ? (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleDisconnect(integration.id)}
                                  >
                                    Disconnect
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-1"
                                  >
                                    <Settings className="w-3 h-3" />
                                  </Button>
                                </>
                              ) : integration.status === 'pending' ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  disabled
                                >
                                  <Clock className="w-3 h-3 mr-1" />
                                  Connecting...
                                </Button>
                              ) : (
                                <Button
                                  variant="hero"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleConnect(integration.id)}
                                >
                                  Connect
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Integrations */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="w-5 h-5" />
                    <span>Popular Integrations</span>
                  </CardTitle>
                  <CardDescription>
                    Discover popular integrations used by other developers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: 'Discord', icon: '🎮', users: '2.5k' },
                      { name: 'Telegram', icon: '📱', users: '1.8k' },
                      { name: 'Notion', icon: '📝', users: '3.2k' },
                      { name: 'Figma', icon: '🎨', users: '1.1k' },
                    ].map((integration) => (
                      <div key={integration.name} className="glass-subtle p-4 rounded-xl text-center border border-border-glass hover:border-primary/20 transition-colors cursor-pointer">
                        <div className="text-2xl mb-2">{integration.icon}</div>
                        <h3 className="font-semibold text-foreground mb-1">{integration.name}</h3>
                        <p className="text-xs text-muted-foreground">{integration.users} users</p>
                      </div>
                    ))}
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
