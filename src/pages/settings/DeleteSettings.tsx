import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  ArrowLeft,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Shield,
  Download,
  Clock,
  UserX,
  Database,
  FileText,
  Settings,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export const DeleteSettings = () => {
  const { toast } = useToast();
  
  const [deleteOptions, setDeleteOptions] = useState({
    deleteProfile: true,
    deleteProjects: true,
    deleteAnalysisHistory: true,
    deleteApiKeys: true,
    deleteIntegrations: true,
    deleteBillingHistory: false,
    deleteSettings: true,
    deleteCustomRules: true
  });

  const [confirmationText, setConfirmationText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteOptionChange = (option: string, value: boolean) => {
    setDeleteOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleDeleteAccount = () => {
    if (confirmationText !== 'DELETE') {
      toast({ 
        title: "Error", 
        description: "Please type 'DELETE' to confirm",
        variant: "destructive"
      });
      return;
    }

    setIsDeleting(true);
    
    // Simulate deletion process
    setTimeout(() => {
      setIsDeleting(false);
      toast({ 
        title: "Account deleted", 
        description: "Your account has been permanently deleted",
        variant: "destructive"
      });
    }, 3000);
  };

  const dataTypes = [
    { key: 'deleteProfile', label: 'Profile Information', description: 'Personal details and account settings', icon: UserX },
    { key: 'deleteProjects', label: 'Projects', description: 'All your projects and their configurations', icon: FileText },
    { key: 'deleteAnalysisHistory', label: 'Analysis History', description: 'Complete history of code analyses', icon: Database },
    { key: 'deleteApiKeys', label: 'API Keys', description: 'Your API keys and usage data', icon: Settings },
    { key: 'deleteIntegrations', label: 'Integrations', description: 'Connected services and configurations', icon: Settings },
    { key: 'deleteBillingHistory', label: 'Billing History', description: 'Payment history and invoices', icon: FileText },
    { key: 'deleteSettings', label: 'Settings', description: 'All your preferences and configurations', icon: Settings },
    { key: 'deleteCustomRules', label: 'Custom Rules', description: 'Your custom analysis rules', icon: Settings }
  ];

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
            Delete Account
          </h1>
          <p className="text-muted-foreground">
            Permanently delete your account and all associated data
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Warning Banner */}
              <Card className="glass-subtle border-red-200/20 bg-red-50/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-700 mb-2">⚠️ This action cannot be undone</h3>
                      <p className="text-sm text-red-600 mb-3">
                        Deleting your account will permanently remove all your data, projects, and settings. 
                        This action is irreversible and cannot be recovered.
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-red-600">
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-3 h-3" />
                          <span>All data will be permanently deleted</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-3 h-3" />
                          <span>No recovery possible</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-3 h-3" />
                          <span>Account cannot be restored</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserX className="w-5 h-5" />
                    <span>Account Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Summary of data that will be deleted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Database className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <h3 className="font-semibold mb-1">Data Size</h3>
                      <p className="text-sm text-muted-foreground">~5.2 MB</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <h3 className="font-semibold mb-1">Projects</h3>
                      <p className="text-sm text-muted-foreground">12 projects</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <h3 className="font-semibold mb-1">Account Age</h3>
                      <p className="text-sm text-muted-foreground">6 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Selection */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Select Data to Delete</span>
                  </CardTitle>
                  <CardDescription>
                    Choose which data types to permanently delete
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dataTypes.map((dataType) => {
                    const Icon = dataType.icon;
                    return (
                      <div key={dataType.key} className="flex items-center justify-between p-4 glass-subtle rounded-xl border border-border-glass">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Icon className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{dataType.label}</h3>
                            <p className="text-sm text-muted-foreground">{dataType.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={deleteOptions[dataType.key as keyof typeof deleteOptions]}
                          onCheckedChange={(checked) => handleDeleteOptionChange(dataType.key, checked)}
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Export Data First */}
              <Card className="glass-subtle border-amber-200/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Export Your Data First</span>
                  </CardTitle>
                  <CardDescription>
                    We strongly recommend exporting your data before deletion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 glass-subtle rounded-xl">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Backup Your Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Download a complete backup of your account data before proceeding
                      </p>
                    </div>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export Data</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Confirmation */}
              <Card className="glass-subtle border-red-200/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Final Confirmation</span>
                  </CardTitle>
                  <CardDescription>
                    Confirm that you understand the consequences and want to proceed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 glass-subtle rounded-xl">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">I understand the consequences</h3>
                        <p className="text-sm text-muted-foreground">
                          I acknowledge that this action is permanent and irreversible
                        </p>
                      </div>
                      <Switch
                        checked={showConfirmation}
                        onCheckedChange={setShowConfirmation}
                      />
                    </div>
                    
                    {showConfirmation && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="confirmation-text">
                            Type "DELETE" to confirm account deletion
                          </Label>
                          <Input
                            id="confirmation-text"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            placeholder="Type DELETE to confirm"
                            className="border-red-200 focus:border-red-500"
                          />
                        </div>
                        
                        <Button 
                          onClick={handleDeleteAccount}
                          disabled={confirmationText !== 'DELETE' || isDeleting}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          {isDeleting ? (
                            <>
                              <Clock className="w-4 h-4 mr-2 animate-spin" />
                              Deleting Account...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Permanently Delete Account
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Alternative Actions */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Alternative Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Consider these alternatives before deleting your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 glass-subtle rounded-xl border border-border-glass">
                      <h3 className="font-medium mb-2">Deactivate Account</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Temporarily disable your account instead of permanent deletion
                      </p>
                      <Button variant="outline" size="sm">
                        Deactivate
                      </Button>
                    </div>
                    
                    <div className="p-4 glass-subtle rounded-xl border border-border-glass">
                      <h3 className="font-medium mb-2">Contact Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get help with any issues you're experiencing
                      </p>
                      <Button variant="outline" size="sm">
                        Contact Support
                      </Button>
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
