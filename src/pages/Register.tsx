import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail, Lock, User, ArrowRight, Code2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleGithubRegister = () => {
    // Simulate GitHub OAuth
    window.location.href = '/dashboard';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const passwordsMatch = formData.password && formData.confirmPassword && 
    formData.password === formData.confirmPassword;

  const features = [
    'Unlimited code reviews',
    'AI-powered debugging',
    'Real-time explanations',
    'GitHub integration',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Features */}
        <div className="hidden lg:block">
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Join thousands of developers using{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                CodeMentor AI
              </span>
            </h2>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 glass-card rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="glass-subtle p-4 rounded-2xl">
              <div className="text-sm text-muted-foreground mb-2">
                "CodeMentor AI has revolutionized how I approach code reviews. 
                The insights are incredible!"
              </div>
              <div className="text-xs text-primary font-medium">
                - Sarah Chen, @devguru
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          
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
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Start your journey to better code today
            </p>
          </div>

          {/* Registration Form */}
          <div className="glass-card p-8 rounded-3xl space-y-6">
            
            {/* GitHub Registration */}
            <Button 
              onClick={handleGithubRegister}
              variant="github" 
              className="w-full"
              size="lg"
            >
              <Github className="w-5 h-5" />
              Sign up with GitHub
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

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-glass w-full pl-11"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="input-glass w-full pl-11"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`input-glass w-full pl-11 ${
                      formData.confirmPassword && !passwordsMatch ? 'border-red-500' : ''
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  {formData.confirmPassword && passwordsMatch && (
                    <Check className="absolute right-3 top-3 w-5 h-5 text-emerald-500" />
                  )}
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary-light">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary-light">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                className="w-full group"
                size="lg"
                disabled={isLoading || !acceptTerms || !passwordsMatch}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:text-primary-light font-medium">
                Sign in
              </Link>
            </div>
          </div>

          {/* Security Note */}
          <div className="text-center mt-6 text-xs text-muted-foreground">
            Protected by enterprise-grade security. Start free, upgrade anytime.
          </div>
        </div>
      </div>
    </div>
  );
};