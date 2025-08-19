import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail, Lock, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleGithubLogin = () => {
    // Simulate GitHub OAuth
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="glass-card p-3">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              CodeMentor AI
            </span>
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue your coding journey
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 rounded-3xl space-y-6">
          
          {/* GitHub Login */}
          <Button 
            onClick={handleGithubLogin}
            variant="github" 
            className="w-full"
            size="lg"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-glass"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glass w-full pl-11"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass w-full pl-11"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:text-primary-light">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              className="w-full group"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:text-primary-light font-medium">
              Sign up for free
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          Protected by enterprise-grade security. Your code is safe with us.
        </div>
      </div>
    </div>
  );
};