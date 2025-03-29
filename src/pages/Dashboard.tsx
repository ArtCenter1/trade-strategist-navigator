
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import { DeployStrategy } from "@/components/dashboard/DeployStrategy";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your trading activity and performance.
        </p>
      </div>
      
      <PerformanceMetrics />
      
      <AccountSummary />
      
      <DeployStrategy />
    </div>
  );
};

export default Dashboard;
