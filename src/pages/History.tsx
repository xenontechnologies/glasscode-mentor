import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  History as HistoryIcon, 
  Code2, 
  Bug, 
  Brain, 
  Search,
  Filter,
  Calendar,
  Download,
  Play,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

const historyData = [
  {
    id: '1',
    type: 'review',
    title: 'UserAuthentication.js Code Review',
    description: 'Complete analysis of authentication logic with security recommendations',
    timestamp: '2 hours ago',
    duration: '3m 45s',
    status: 'completed',
    rating: 4,
    repository: 'my-app/frontend',
    language: 'JavaScript',
    linesOfCode: 156,
  },
  {
    id: '2',
    type: 'debug',
    title: 'React Hook Memory Leak Debug',
    description: 'Identified and resolved useEffect dependency issue causing memory leaks',
    timestamp: '5 hours ago',
    duration: '8m 12s',
    status: 'completed',
    rating: 5,
    repository: 'react-dashboard',
    language: 'TypeScript',
    linesOfCode: 89,
  },
  {
    id: '3',
    type: 'explain',
    title: 'Sorting Algorithm Explanation',
    description: 'Detailed breakdown of quicksort implementation and time complexity',
    timestamp: '1 day ago',
    duration: '5m 30s',
    status: 'completed',
    rating: 4,
    repository: 'algorithms-practice',
    language: 'Python',
    linesOfCode: 45,
  },
  {
    id: '4',
    type: 'review',
    title: 'Database Migration Scripts',
    description: 'Security and performance review of SQL migration files',
    timestamp: '2 days ago',
    duration: '12m 18s',
    status: 'completed',
    rating: 5,
    repository: 'backend-api',
    language: 'SQL',
    linesOfCode: 234,
  },
  {
    id: '5',
    type: 'debug',
    title: 'API Rate Limiting Issue',
    description: 'Currently analyzing rate limiting configuration and middleware',
    timestamp: '3 days ago',
    duration: '2m 15s',
    status: 'in_progress',
    rating: 0,
    repository: 'microservices',
    language: 'Go',
    linesOfCode: 67,
  },
];

const typeConfig = {
  review: { icon: Code2, label: 'Code Review', color: 'text-blue-600', bg: 'bg-blue-500/10' },
  debug: { icon: Bug, label: 'Debug', color: 'text-red-600', bg: 'bg-red-500/10' },
  explain: { icon: Brain, label: 'Explain', color: 'text-purple-600', bg: 'bg-purple-500/10' },
};

export const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Session History
          </h1>
          <p className="text-muted-foreground">
            Review your past code reviews, debugging sessions, and explanations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Sessions', value: '47', icon: HistoryIcon, trend: '+12 this week' },
            { label: 'Code Reviews', value: '23', icon: Code2, trend: '+5 this week' },
            { label: 'Debug Sessions', value: '18', icon: Bug, trend: '+4 this week' },
            { label: 'Explanations', value: '6', icon: Brain, trend: '+3 this week' },
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-glass w-full pl-11"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input-glass px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="review">Code Review</option>
                  <option value="debug">Debug</option>
                  <option value="explain">Explain</option>
                </select>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-glass px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="failed">Failed</option>
              </select>

              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4" />
                Date Range
              </Button>

              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item) => {
            const TypeIcon = typeConfig[item.type as keyof typeof typeConfig].icon;
            const typeColor = typeConfig[item.type as keyof typeof typeConfig].color;
            const typeBg = typeConfig[item.type as keyof typeof typeConfig].bg;
            
            return (
              <div key={item.id} className="glass-card p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group">
                <div className="flex items-start justify-between">
                  
                  {/* Left Content */}
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 ${typeBg} rounded-2xl flex items-center justify-center`}>
                      <TypeIcon className={`w-6 h-6 ${typeColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {item.title}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeBg} ${typeColor}`}>
                          {typeConfig[item.type as keyof typeof typeConfig].label}
                        </span>
                        {getStatusIcon(item.status)}
                      </div>
                      
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.timestamp}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{item.repository}</span>
                        </div>
                        <div>
                          <span>{item.language} • {item.linesOfCode} lines</span>
                        </div>
                        <div>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                      
                      {/* Rating */}
                      {item.status === 'completed' && (
                        <div className="flex items-center space-x-1 mt-2">
                          {renderStars(item.rating)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                        Replay
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HistoryIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No sessions found
            </h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="hero">
              Start New Session
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};