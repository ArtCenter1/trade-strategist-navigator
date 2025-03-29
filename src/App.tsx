
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import StrategySelection from "./pages/StrategySelection";
import { StrategyDetail } from "./components/StrategyDetail";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { PageTransition } from "./components/layout/PageTransition";

const queryClient = new QueryClient();

// Wrapper component to handle AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        
        {/* Dashboard Routes with DashboardLayout */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <PageTransition>
              <Dashboard />
            </PageTransition>
          </DashboardLayout>
        } />
        <Route path="/strategies" element={
          <DashboardLayout>
            <PageTransition>
              <StrategySelection />
            </PageTransition>
          </DashboardLayout>
        } />
        <Route path="/strategies/:id" element={
          <DashboardLayout>
            <PageTransition>
              <StrategyDetail />
            </PageTransition>
          </DashboardLayout>
        } />
        <Route path="/settings" element={
          <DashboardLayout>
            <PageTransition>
              <Settings />
            </PageTransition>
          </DashboardLayout>
        } />
        <Route path="/profile" element={
          <DashboardLayout>
            <PageTransition>
              <Profile />
            </PageTransition>
          </DashboardLayout>
        } />
        <Route path="/performance" element={
          <DashboardLayout>
            <PageTransition>
              <Dashboard />
            </PageTransition>
          </DashboardLayout>
        } />
        <Route path="/exchanges" element={
          <DashboardLayout>
            <PageTransition>
              <Dashboard />
            </PageTransition>
          </DashboardLayout>
        } />
        <Route path="/portfolio" element={
          <DashboardLayout>
            <PageTransition>
              <Dashboard />
            </PageTransition>
          </DashboardLayout>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
