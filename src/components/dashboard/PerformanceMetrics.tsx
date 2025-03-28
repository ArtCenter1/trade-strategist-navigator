
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Percent, Activity } from 'lucide-react';

// Mock data for the performance metrics
const performanceData = [
  { month: 'Jan', profit: 1200, trades: 45 },
  { month: 'Feb', profit: 1900, trades: 38 },
  { month: 'Mar', profit: 800, trades: 42 },
  { month: 'Apr', profit: 1600, trades: 36 },
  { month: 'May', profit: 2100, trades: 41 },
  { month: 'Jun', profit: 1800, trades: 39 },
];

// Mock data for win rate by strategy
const winRateData = [
  { name: 'RSI', winRate: 68 },
  { name: 'MACD', winRate: 72 },
  { name: 'Bollinger', winRate: 59 },
  { name: 'Moving Avg', winRate: 64 },
];

export function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Profit"
          value="$8,400"
          description="+14% from last month"
          trend="up"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard 
          title="Win Rate"
          value="64%"
          description="241 out of 376 trades"
          trend="up"
          icon={<Percent className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard 
          title="Profit Factor"
          value="1.86"
          description="-0.12 from last month"
          trend="down"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard 
          title="Active Strategies"
          value="4"
          description="2 premium strategies"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>
              Profit and number of trades per month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="profit"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line yAxisId="right" type="monotone" dataKey="trades" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Strategy Win Rates</CardTitle>
            <CardDescription>
              Win percentage by strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={winRateData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="winRate" fill="#8884d8" name="Win Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
}

function MetricCard({ title, value, description, trend, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend === "up" && <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />}
            {trend === "down" && <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
