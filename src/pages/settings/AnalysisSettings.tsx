import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Settings,
  ArrowLeft,
  Save,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Target,
  Zap,
  Brain,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export const AnalysisSettings = () => {
  const { toast } = useToast();
  
  const [analysisSettings, setAnalysisSettings] = useState({
    // General Settings
    autoAnalysis: true,
    realTimeAnalysis: true,
    batchProcessing: false,
    
    // Performance Settings
    analysisDepth: [75],
    maxConcurrentAnalyses: [3],
    cacheResults: true,
    
    // Quality Settings
    qualityThreshold: [80],
    confidenceLevel: [85],
    enableSuggestions: true,
    
    // Custom Rules
    customRules: {
      codeStyle: true,
      securityChecks: true,
      performanceOptimization: true,
      accessibilityChecks: false,
      documentationChecks: true
    },
    
    // AI Settings
    aiModel: 'gpt-4',
    enableLearning: true,
    personalizedSuggestions: true,
    
    // Privacy Settings
    shareAnalytics: false,
    allowDataCollection: true,
    anonymizeData: true
  });

  const handleSettingChange = (setting: string, value: any) => {
    setAnalysisSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleCustomRuleChange = (rule: string, value: boolean) => {
    setAnalysisSettings(prev => ({
      ...prev,
      customRules: {
        ...prev.customRules,
        [rule]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({ 
      title: "Settings saved", 
      description: "Your analysis preferences have been updated" 
    });
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
            Analysis Settings
          </h1>
          <p className="text-muted-foreground">
            Configure code analysis preferences and custom rules
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Analysis Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Analysis Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Current analysis configuration and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Brain className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold mb-1">AI Model</h3>
                      <p className="text-sm text-muted-foreground">GPT-4</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-semibold mb-1">Accuracy</h3>
                      <p className="text-sm text-muted-foreground">85%</p>
                    </div>
                    <div className="glass-subtle p-4 rounded-xl text-center">
                      <Zap className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-semibold mb-1">Speed</h3>
                      <p className="text-sm text-muted-foreground">Fast</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* General Settings */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>General Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Basic analysis configuration options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Auto Analysis</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically analyze code when files are saved
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.autoAnalysis}
                      onCheckedChange={(checked) => handleSettingChange('autoAnalysis', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Real-time Analysis</Label>
                      <p className="text-xs text-muted-foreground">
                        Provide instant feedback as you type
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.realTimeAnalysis}
                      onCheckedChange={(checked) => handleSettingChange('realTimeAnalysis', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Batch Processing</Label>
                      <p className="text-xs text-muted-foreground">
                        Process multiple files simultaneously
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.batchProcessing}
                      onCheckedChange={(checked) => handleSettingChange('batchProcessing', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Performance Settings */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Performance Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure analysis performance and resource usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Analysis Depth</Label>
                    <Slider
                      value={analysisSettings.analysisDepth}
                      onValueChange={(value) => handleSettingChange('analysisDepth', value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      {analysisSettings.analysisDepth[0]}% - Balance between speed and thoroughness
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Max Concurrent Analyses</Label>
                    <Slider
                      value={analysisSettings.maxConcurrentAnalyses}
                      onValueChange={(value) => handleSettingChange('maxConcurrentAnalyses', value)}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      {analysisSettings.maxConcurrentAnalyses[0]} simultaneous analyses
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Cache Results</Label>
                      <p className="text-xs text-muted-foreground">
                        Store analysis results for faster subsequent runs
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.cacheResults}
                      onCheckedChange={(checked) => handleSettingChange('cacheResults', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quality Settings */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Quality Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure analysis quality and confidence thresholds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Quality Threshold</Label>
                    <Slider
                      value={analysisSettings.qualityThreshold}
                      onValueChange={(value) => handleSettingChange('qualityThreshold', value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      {analysisSettings.qualityThreshold[0]}% - Minimum quality score for suggestions
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Confidence Level</Label>
                    <Slider
                      value={analysisSettings.confidenceLevel}
                      onValueChange={(value) => handleSettingChange('confidenceLevel', value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      {analysisSettings.confidenceLevel[0]}% - Minimum confidence for AI suggestions
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Enable Suggestions</Label>
                      <p className="text-xs text-muted-foreground">
                        Show improvement suggestions and alternatives
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.enableSuggestions}
                      onCheckedChange={(checked) => handleSettingChange('enableSuggestions', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Custom Rules */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sliders className="w-5 h-5" />
                    <span>Custom Rules</span>
                  </CardTitle>
                  <CardDescription>
                    Enable or disable specific analysis rules
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analysisSettings.customRules).map(([rule, enabled]) => (
                    <div key={rule} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">
                          {rule.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Check for {rule.replace(/([A-Z])/g, ' $1').toLowerCase()} issues
                        </p>
                      </div>
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) => handleCustomRuleChange(rule, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Settings */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>AI Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure AI model and learning preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">AI Model</Label>
                    <Select
                      value={analysisSettings.aiModel}
                      onValueChange={(value) => handleSettingChange('aiModel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
                        <SelectItem value="claude-3">Claude-3 (Alternative)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Enable Learning</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow AI to learn from your coding patterns
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.enableLearning}
                      onCheckedChange={(checked) => handleSettingChange('enableLearning', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Personalized Suggestions</Label>
                      <p className="text-xs text-muted-foreground">
                        Tailor suggestions to your coding style
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.personalizedSuggestions}
                      onCheckedChange={(checked) => handleSettingChange('personalizedSuggestions', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Privacy Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Control data sharing and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Share Analytics</Label>
                      <p className="text-xs text-muted-foreground">
                        Share anonymous usage data to improve the service
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.shareAnalytics}
                      onCheckedChange={(checked) => handleSettingChange('shareAnalytics', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Allow Data Collection</Label>
                      <p className="text-xs text-muted-foreground">
                        Collect data for personalized features
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.allowDataCollection}
                      onCheckedChange={(checked) => handleSettingChange('allowDataCollection', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Anonymize Data</Label>
                      <p className="text-xs text-muted-foreground">
                        Remove personal information from collected data
                      </p>
                    </div>
                    <Switch
                      checked={analysisSettings.anonymizeData}
                      onCheckedChange={(checked) => handleSettingChange('anonymizeData', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Analysis Settings</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
