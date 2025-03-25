
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { BarChart2, LogOut } from "lucide-react";
import { ExchangeConnection } from "@/components/ExchangeConnection";
import { ConnectedExchanges } from "@/components/ConnectedExchanges";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-trading-navy border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full px-4 py-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-trading-navy text-white flex items-center justify-center">
            <BarChart2 className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg">TradingBot</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm">
            <span className="text-muted-foreground mr-1">Signed in as:</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Trading Dashboard</h1>
          
          {/* Exchange Connection Section */}
          <h2 className="text-2xl font-semibold mb-4">Exchange Connections</h2>
          <div className="mb-8">
            <ConnectedExchanges />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <ExchangeConnection />
            
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Choose Strategy</h2>
              <p className="text-muted-foreground mb-4">
                Browse our library of proven trading strategies.
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate('/strategies')}
              >
                View Strategies
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
