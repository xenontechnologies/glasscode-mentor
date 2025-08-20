import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Key, 
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export const ApiKeysSettings = () => {
  const { toast } = useToast();
  
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production API Key', key: 'sk_live_...abc123', created: '2024-01-15', lastUsed: '2024-01-20', usage: 45 },
    { id: '2', name: 'Development API Key', key: 'sk_test_...def456', created: '2024-01-10', lastUsed: '2024-01-19', usage: 12 },
  ]);

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskKey = (key: string) => {
    const visible = key.slice(0, 12);
    const masked = '•'.repeat(16);
    return visible + masked;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: "API key copied successfully" });
  };

  const deleteApiKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast({ title: "API Key deleted", description: "The API key has been permanently deleted" });
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
            API Keys
          </h1>
          <p className="text-muted-foreground">
            Manage your API keys and monitor usage
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Usage Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>API Usage Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Monitor your API usage and limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-subtle p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Requests</span>
                        <Badge variant="outline">57</Badge>
                      </div>
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-xs text-muted-foreground">This month</div>
                    </div>
                    
                    <div className="glass-subtle p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Active Keys</span>
                        <Badge variant="outline">2</Badge>
                      </div>
                      <div className="text-2xl font-bold">2</div>
                      <div className="text-xs text-muted-foreground">API keys</div>
                    </div>
                    
                    <div className="glass-subtle p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Usage Limit</span>
                        <Badge variant="outline">45%</Badge>
                      </div>
                      <div className="text-2xl font-bold">10,000</div>
                      <div className="text-xs text-muted-foreground">Monthly limit</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage Progress</span>
                      <span>1,234 / 10,000</span>
                    </div>
                    <Progress value={12.34} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* API Keys List */}
              <Card className="glass-subtle">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Key className="w-5 h-5" />
                        <span>Your API Keys</span>
                      </CardTitle>
                      <CardDescription>
                        Manage and monitor your API keys
                      </CardDescription>
                    </div>
                    <Button className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Create New Key</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="glass-subtle p-4 rounded-xl border border-border-glass">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{apiKey.name}</h3>
                          <p className="text-sm text-muted-foreground">Created {apiKey.created}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleApiKeyVisibility(apiKey.id)}
                          >
                            {showApiKey[apiKey.id] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteApiKey(apiKey.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-muted-foreground">API Key</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Input
                              value={showApiKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                              readOnly
                              className="font-mono text-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Last Used</Label>
                            <p className="text-sm font-medium">{apiKey.lastUsed}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Usage</Label>
                            <p className="text-sm font-medium">{apiKey.usage} requests</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="glass-subtle border-amber-200/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Security Notice</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Keep your API keys secure and never share them publicly. If you suspect a key has been compromised, 
                        delete it immediately and create a new one.
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span>Keys are encrypted at rest</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>Last rotated: 30 days ago</span>
                        </div>
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
