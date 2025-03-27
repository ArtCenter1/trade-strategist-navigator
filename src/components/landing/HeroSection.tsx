
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Zap, Shield } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Automate Your Trading Strategies
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            TradingBot helps you deploy, monitor, and optimize trading strategies with ease.
          </p>

          <div className="flex gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/strategies')}
            >
              View Strategies
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Fast Deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Secure Trading</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="bg-muted/30 rounded-lg p-8 w-full max-w-md">
            <BarChart2 className="h-48 w-48 mx-auto text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
