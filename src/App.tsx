
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Dashboard Routes with DashboardLayout */}
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/strategies" element={<DashboardLayout><StrategySelection /></DashboardLayout>} />
            <Route path="/strategies/:id" element={<DashboardLayout><StrategyDetail /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
            <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
            <Route path="/performance" element={<DashboardLayout><Dashboard /></DashboardLayout>} /> {/* Placeholder */}
            <Route path="/exchanges" element={<DashboardLayout><Dashboard /></DashboardLayout>} /> {/* Placeholder */}
            <Route path="/portfolio" element={<DashboardLayout><Dashboard /></DashboardLayout>} /> {/* Placeholder */}
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
