import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isCode?: boolean;
  language?: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your AI coding assistant. I can help you review code, debug issues, and explain complex concepts. What would you like to work on today?",
    sender: 'ai',
    timestamp: new Date(),
  }
];

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
        isCode: inputValue.toLowerCase().includes('code') || inputValue.toLowerCase().includes('function'),
        language: 'javascript'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Looking at your code, I notice a few optimization opportunities. The recursive Fibonacci function has exponential time complexity. Consider using dynamic programming:\n\n```javascript\nfunction fibonacci(n, memo = {}) {\n  if (n in memo) return memo[n];\n  if (n <= 2) return 1;\n  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);\n  return memo[n];\n}\n```\n\nThis reduces the time complexity from O(2^n) to O(n).",
      
      "I can help you debug this error. The TypeError suggests you're trying to access the 'length' property on an undefined value. Here are some steps to fix it:\n\n1. Add null checks before accessing properties\n2. Use optional chaining (?.)\n3. Validate input parameters\n\nWould you like me to examine the specific code causing this issue?",
      
      "Great question! Let me explain this code pattern step by step:\n\n1. This uses a closure to maintain state\n2. The inner function has access to the outer function's variables\n3. Each call creates a new execution context\n\nThis is commonly used for creating private variables in JavaScript. Would you like me to show you more examples?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleCopyCode = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const formatMessage = (message: Message) => {
    if (message.isCode && message.content.includes('```')) {
      const parts = message.content.split('```');
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is code
          const lines = part.split('\n');
          const language = lines[0] || 'javascript';
          const code = lines.slice(1).join('\n');
          return (
            <div key={index} className="relative my-4">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
                <span className="text-xs text-gray-400 font-mono">{language}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleCopyCode(code, message.id)}
                  className="h-6 w-6"
                >
                  {copiedId === message.id ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                className="rounded-b-lg !mt-0"
                customStyle={{ margin: 0, fontSize: '12px' }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        }
        return <span key={index}>{part}</span>;
      });
    }
    return message.content;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="hero"
        size="icon-lg"
        className="fixed bottom-6 right-6 z-50 shadow-glow"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed right-6 bottom-6 z-50 glass-card rounded-2xl shadow-glow transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-glass">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 glass-card rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            {isTyping && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
                <span>thinking...</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 glass-card rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-primary/20' : 'bg-secondary/20'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  
                  <div className={`glass-subtle p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'bg-secondary/10'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">
                      {formatMessage(message)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border-glass">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me about your code..."
                className="input-glass flex-1 text-sm"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                variant="hero"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};