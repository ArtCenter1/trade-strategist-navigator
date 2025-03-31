
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from './context/AuthContext';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Terminal from './pages/Terminal';
import Bots from './pages/Bots';
import StrategyComparison from './pages/StrategyComparison';
import ExchangeConnection from './pages/ExchangeConnection';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import MyBots from './pages/MyBots';
import BotBuilder from './pages/BotBuilder';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    window.location.href = "/auth";
    return null;
  }

  return <>{children}</>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/terminal" 
            element={<ProtectedRoute><Terminal /></ProtectedRoute>} 
          />
          <Route 
            path="/bots" 
            element={<ProtectedRoute><Bots /></ProtectedRoute>} 
          />
          <Route 
            path="/my-bots" 
            element={<ProtectedRoute><MyBots /></ProtectedRoute>} 
          />
          <Route 
            path="/bot-builder" 
            element={<ProtectedRoute><BotBuilder /></ProtectedRoute>} 
          />
          <Route 
            path="/strategy-comparison" 
            element={<ProtectedRoute><StrategyComparison /></ProtectedRoute>} 
          />
          <Route 
            path="/exchange-connection" 
            element={<ProtectedRoute><ExchangeConnection /></ProtectedRoute>} 
          />
          <Route 
            path="/profile" 
            element={<ProtectedRoute><Profile /></ProtectedRoute>} 
          />
          <Route 
            path="/settings" 
            element={<ProtectedRoute><Settings /></ProtectedRoute>} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
