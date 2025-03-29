
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart2, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function NavigationHeader() {
  // Use try-catch to handle potential Router context errors
  let navigate;
  let location;
  
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (error) {
    // If not in a Router context, provide fallback functions
    navigate = (path: string) => {
      window.location.href = path;
    };
    location = { pathname: window.location.pathname };
  }

  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="w-full px-4 py-4 border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-trading-navy text-white flex items-center justify-center">
          <BarChart2 className="h-5 w-5" />
        </div>
        <Link to="/" className="font-semibold text-lg">OmniTrade</Link>
      </div>

      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
            <Link to="/strategies" className="text-sm font-medium hover:text-primary">Strategies</Link>
            
            <div className="flex items-center gap-3">
              <div className="text-sm hidden md:block">
                <span className="text-muted-foreground mr-1">Signed in as:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="text-sm flex items-center gap-1"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleNavigate('/auth')}
              className="text-sm"
            >
              Login
            </Button>
            <Button 
              onClick={() => handleNavigate('/auth')}
              className="text-sm"
            >
              Sign Up
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
