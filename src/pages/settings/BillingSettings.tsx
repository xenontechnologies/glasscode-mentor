import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  DollarSign,
  Users,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export const BillingSettings = () => {
  const { toast } = useToast();
  
  const [billingData] = useState({
    currentPlan: {
      name: 'Pro',
      price: 29,
      interval: 'month',
      features: ['Unlimited projects', 'Advanced AI analysis', 'Team collaboration', 'Priority support'],
      nextBilling: '2024-02-15',
      status: 'active'
    },
    usage: {
      apiCalls: 1234,
      apiLimit: 10000,
      storage: 2.5,
      storageLimit: 10,
      teamMembers: 3,
      teamLimit: 5
    },
    paymentMethods: [
      {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiry: '12/25',
        isDefault: true
      },
      {
        id: '2',
        type: 'card',
        last4: '5555',
        brand: 'Mastercard',
        expiry: '08/26',
        isDefault: false
      }
    ],
    invoices: [
      {
        id: 'INV-001',
        date: '2024-01-15',
        amount: 29.00,
        status: 'paid',
        downloadUrl: '#'
      },
      {
        id: 'INV-002',
        date: '2023-12-15',
        amount: 29.00,
        status: 'paid',
        downloadUrl: '#'
      },
      {
        id: 'INV-003',
        date: '2023-11-15',
        amount: 29.00,
        status: 'paid',
        downloadUrl: '#'
      }
    ]
  });

  const plans = [
    {
      name: 'Free',
      price: 0,
      interval: 'month',
      features: ['5 projects', 'Basic AI analysis', 'Community support'],
      current: false
    },
    {
      name: 'Pro',
      price: 29,
      interval: 'month',
      features: ['Unlimited projects', 'Advanced AI analysis', 'Team collaboration', 'Priority support'],
      current: true
    },
    {
      name: 'Enterprise',
      price: 99,
      interval: 'month',
      features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
      current: false
    }
  ];

  const handleUpgrade = (planName: string) => {
    toast({ 
      title: "Plan upgrade", 
      description: `Upgrading to ${planName} plan...` 
    });
  };

  const handleAddPaymentMethod = () => {
    toast({ 
      title: "Add payment method", 
      description: "Redirecting to payment setup..." 
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
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription, payment methods, and billing history
          </p>
        </div>

        {/* Settings Content */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              {/* Current Plan */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Current Plan</span>
                  </CardTitle>
                  <CardDescription>
                    Your active subscription and plan details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="glass-subtle p-6 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{billingData.currentPlan.name} Plan</h3>
                        <p className="text-muted-foreground">${billingData.currentPlan.price}/{billingData.currentPlan.interval}</p>
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {billingData.currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Next billing date: {billingData.currentPlan.nextBilling}</span>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Manage Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Overview */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Usage Overview</span>
                  </CardTitle>
                  <CardDescription>
                    Monitor your current usage and limits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Calls</span>
                        <span>{billingData.usage.apiCalls.toLocaleString()} / {billingData.usage.apiLimit.toLocaleString()}</span>
                      </div>
                      <Progress value={(billingData.usage.apiCalls / billingData.usage.apiLimit) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">12.34% used this month</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Storage</span>
                        <span>{billingData.usage.storage}GB / {billingData.usage.storageLimit}GB</span>
                      </div>
                      <Progress value={(billingData.usage.storage / billingData.usage.storageLimit) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">25% used</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Team Members</span>
                        <span>{billingData.usage.teamMembers} / {billingData.usage.teamLimit}</span>
                      </div>
                      <Progress value={(billingData.usage.teamMembers / billingData.usage.teamLimit) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">60% of limit used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Plans */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Available Plans</span>
                  </CardTitle>
                  <CardDescription>
                    Choose the plan that best fits your needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <div key={plan.name} className={`glass-subtle p-6 rounded-xl border ${
                        plan.current ? 'border-primary/20 bg-primary/5' : 'border-border-glass'
                      }`}>
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                          <div className="text-3xl font-bold text-foreground">
                            ${plan.price}
                            <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          className="w-full"
                          variant={plan.current ? "outline" : "hero"}
                          disabled={plan.current}
                          onClick={() => handleUpgrade(plan.name)}
                        >
                          {plan.current ? 'Current Plan' : 'Upgrade'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="glass-subtle">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Payment Methods</span>
                      </CardTitle>
                      <CardDescription>
                        Manage your payment methods and billing information
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddPaymentMethod} className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Payment Method</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {billingData.paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 glass-subtle rounded-xl border border-border-glass">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{method.brand} •••• {method.last4}</p>
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            Default
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Billing History</span>
                  </CardTitle>
                  <CardDescription>
                    View and download your past invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {billingData.invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 glass-subtle rounded-xl border border-border-glass">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Download className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{invoice.id}</p>
                            <p className="text-sm text-muted-foreground">{invoice.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">${invoice.amount}</span>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {invoice.status}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
