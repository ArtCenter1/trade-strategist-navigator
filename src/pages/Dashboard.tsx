
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email}. Here's your trading overview.
          </p>
        </div>
        
        <PerformanceMetrics />
        
        <AccountSummary />
        
        <DeployStrategy />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
