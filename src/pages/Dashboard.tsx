import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Bug, 
  Brain, 
  Upload, 
  Play, 
  MessageSquare,
  History,
  GitBranch,
  Zap,
  CheckCircle
} from 'lucide-react';
import { MonacoEditor } from '@/components/editor/MonacoEditor';
import { ChatPanel } from '@/components/chat/ChatPanel';

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

const sampleError = `TypeError: Cannot read properties of undefined (reading 'length')
    at validateInput (app.js:23:18)
    at processData (app.js:45:12)
    at main (app.js:78:5)
    at Object.<anonymous> (app.js:95:1)`;

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('review');
  const [code, setCode] = useState(sampleCode);
  const [errorLog, setErrorLog] = useState(sampleError);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsChatOpen(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Command Center
          </h1>
          <p className="text-muted-foreground">
            Analyze your code, debug issues, and get AI-powered insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Reviews Today', value: '12', icon: Code2, trend: '+3' },
            { label: 'Issues Fixed', value: '8', icon: CheckCircle, trend: '+5' },
            { label: 'Active Sessions', value: '3', icon: Zap, trend: '→' },
            { label: 'Code Quality', value: '94%', icon: GitBranch, trend: '+2%' },
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trend.includes('+') 
                    ? 'bg-emerald-500/10 text-emerald-600' 
                    : stat.trend.includes('-')
                    ? 'bg-red-500/10 text-red-600'
                    : 'bg-yellow-500/10 text-yellow-600'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            {/* Tab Navigation */}
            <div className="border-b border-border-glass bg-background-glass/30 px-6 py-4">
              <TabsList className="glass-subtle p-1">
                <TabsTrigger value="review" className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4" />
                  <span>Code Review</span>
                </TabsTrigger>
                <TabsTrigger value="debug" className="flex items-center space-x-2">
                  <Bug className="w-4 h-4" />
                  <span>Debug Assistant</span>
                </TabsTrigger>
                <TabsTrigger value="explain" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Explain Mode</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              
              <TabsContent value="review" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Smart Code Review</h2>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                        Upload File
                      </Button>
                      <Button variant="outline" size="sm">
                        <GitBranch className="w-4 h-4" />
                        Connect Repo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">Your Code</h3>
                        <Button 
                          onClick={handleAnalyze} 
                          disabled={isAnalyzing}
                          variant="hero" 
                          size="sm"
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Analyze Code
                            </>
                          )}
                        </Button>
                      </div>
                      <MonacoEditor 
                        value={code}
                        onChange={setCode}
                        height="400px"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">AI Analysis Results</h3>
                      <div className="glass-subtle rounded-2xl p-6 h-96 flex items-center justify-center">
                        {isAnalyzing ? (
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Analyzing your code...</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center">
                            Click "Analyze Code" to get AI-powered insights about your code quality, 
                            performance optimizations, and best practices.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="debug" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Debug Assistant</h2>
                    <Button variant="outline" size="sm">
                      <History className="w-4 h-4" />
                      Recent Sessions
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Error Log / Stack Trace</h3>
                      <textarea
                        value={errorLog}
                        onChange={(e) => setErrorLog(e.target.value)}
                        className="input-glass w-full h-96 font-mono text-sm resize-none"
                        placeholder="Paste your error logs or stack trace here..."
                      />
                      <Button onClick={handleAnalyze} variant="hero" className="w-full">
                        <Bug className="w-4 h-4" />
                        Debug This Error
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Step-by-Step Solution</h3>
                      <div className="glass-subtle rounded-2xl p-6 h-96 flex items-center justify-center">
                        <p className="text-muted-foreground text-center">
                          Paste your error log and click "Debug This Error" to get detailed 
                          step-by-step debugging assistance with potential solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="explain" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Explain Mode</h2>
                    <Button variant="outline" size="sm">
                      <Brain className="w-4 h-4" />
                      Learning Path
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Code to Explain</h3>
                      <MonacoEditor 
                        value={code}
                        onChange={setCode}
                        height="400px"
                      />
                      <Button onClick={handleAnalyze} variant="hero" className="w-full">
                        <Brain className="w-4 h-4" />
                        Explain This Code
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Detailed Explanation</h3>
                      <div className="glass-subtle rounded-2xl p-6 h-96 flex items-center justify-center">
                        <p className="text-muted-foreground text-center">
                          Select code and click "Explain This Code" to get comprehensive 
                          explanations of algorithms, patterns, and implementation details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 glass-card p-6 rounded-2xl">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Code review completed', file: 'UserService.js', time: '2 minutes ago', status: 'success' },
              { action: 'Debug session started', file: 'api/routes.py', time: '15 minutes ago', status: 'active' },
              { action: 'Explanation generated', file: 'algorithms/sort.ts', time: '1 hour ago', status: 'completed' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border-glass last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'active' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.file}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
};