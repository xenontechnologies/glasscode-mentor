import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Database,
  Code,
  Settings,
  Calendar,
  HardDrive,
  Cloud,
  Archive,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const ExportSettings = () => {
  const { toast } = useToast();
  
  const [exportData, setExportData] = useState({
    profile: true,
    projects: true,
    analysisHistory: true,
    apiKeys: false,
    integrations: true,
    billingHistory: false,
    settings: true,
    customRules: true
  });

  const [exportHistory] = useState([
    {
      id: '1',
      type: 'Full Export',
      date: '2024-01-15',
      size: '2.5 MB',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '2',
      type: 'Projects Only',
      date: '2024-01-10',
      size: '1.2 MB',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '3',
      type: 'Analysis History',
      date: '2024-01-05',
      size: '800 KB',
      status: 'completed',
      downloadUrl: '#'
    }
  ]);

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const handleExportChange = (dataType: string, value: boolean) => {
    setExportData(prev => ({
      ...prev,
      [dataType]: value
    }));
  };

  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast({ 
            title: "Export completed", 
            description: "Your data has been exported successfully" 
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const dataTypes = [
    { key: 'profile', label: 'Profile Information', description: 'Personal details and account settings', icon: FileText },
    { key: 'projects', label: 'Projects', description: 'All your projects and their configurations', icon: Code },
    { key: 'analysisHistory', label: 'Analysis History', description: 'Complete history of code analyses', icon: Database },
    { key: 'apiKeys', label: 'API Keys', description: 'Your API keys and usage data', icon: Settings },
    { key: 'integrations', label: 'Integrations', description: 'Connected services and configurations', icon: Cloud },
    { key: 'billingHistory', label: 'Billing History', description: 'Payment history and invoices', icon: Calendar },
    { key: 'settings', label: 'Settings', description: 'All your preferences and configurations', icon: Settings },
    { key: 'customRules', label: 'Custom Rules', description: 'Your custom analysis rules', icon: Archive }
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
            Export Data
          </h1>
          <p className="text-muted-foreground">
            Download your data and export it in various formats
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Export Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Export Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Choose what data you want to export and download
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <HardDrive className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold mb-1">Total Data</h3>
                      <p className="text-sm text-muted-foreground">~5.2 MB</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Archive className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-semibold mb-1">Export Format</h3>
                      <p className="text-sm text-muted-foreground">JSON</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-semibold mb-1">Processing Time</h3>
                      <p className="text-sm text-muted-foreground">~30 seconds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Selection */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Select Data to Export</span>
                  </CardTitle>
                  <CardDescription>
                    Choose which data types to include in your export
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dataTypes.map((dataType) => {
                    const Icon = dataType.icon;
                    return (
                      <div key={dataType.key} className="flex items-center justify-between p-4 glass-subtle rounded-xl border border-border-glass">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{dataType.label}</h3>
                            <p className="text-sm text-muted-foreground">{dataType.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={exportData[dataType.key as keyof typeof exportData]}
                          onCheckedChange={(checked) => handleExportChange(dataType.key, checked)}
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Export Progress */}
              {isExporting && (
                <Card className="glass-subtle">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Exporting Data</span>
                    </CardTitle>
                    <CardDescription>
                      Please wait while we prepare your data for download
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{exportProgress}%</span>
                      </div>
                      <Progress value={exportProgress} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Processing your data... This may take a few moments.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Export Actions */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Export Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Start a new export or download previous exports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Button 
                      onClick={handleStartExport} 
                      disabled={isExporting}
                      className="flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isExporting ? 'Exporting...' : 'Start Export'}</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Export as CSV</span>
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>• Exports will be available for download for 7 days</p>
                    <p>• Large exports may take several minutes to process</p>
                    <p>• You'll receive an email notification when ready</p>
                  </div>
                </CardContent>
              </Card>

              {/* Export History */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Export History</span>
                  </CardTitle>
                  <CardDescription>
                    View and download your previous exports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exportHistory.map((exportItem) => (
                      <div key={exportItem.id} className="flex items-center justify-between p-4 glass-subtle rounded-xl border border-border-glass">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getStatusIcon(exportItem.status)}
                          </div>
                          <div>
                            <h3 className="font-medium">{exportItem.type}</h3>
                            <p className="text-sm text-muted-foreground">{exportItem.date} • {exportItem.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {exportItem.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Export Information */}
              <Card className="glass-subtle border-amber-200/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Export Information</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Your data is exported in JSON format for maximum compatibility</p>
                        <p>• Exports include all selected data types in a single file</p>
                        <p>• Download links expire after 7 days for security</p>
                        <p>• Large exports may be split into multiple files</p>
                        <p>• You can request a new export at any time</p>
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
