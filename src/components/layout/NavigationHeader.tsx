
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function NavigationHeader() {
  const navigate = useNavigate();

  return (
    <header className="w-full px-4 py-4 border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-trading-navy text-white flex items-center justify-center">
          <BarChart2 className="h-5 w-5" />
        </div>
        <Link to="/" className="font-semibold text-lg">TradingBot</Link>
      </div>

      <nav className="flex items-center gap-4">
        <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
        <Link to="/strategies" className="text-sm font-medium hover:text-primary">Strategies</Link>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth')}
            className="text-sm"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate('/auth')}
            className="text-sm"
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
