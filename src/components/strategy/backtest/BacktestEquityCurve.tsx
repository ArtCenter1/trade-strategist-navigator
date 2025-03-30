import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BacktestEquityCurveProps {
  equityCurve: { time: string; value: number }[];
}

export function BacktestEquityCurve({ equityCurve }: BacktestEquityCurveProps) {
  // Format data for the chart
  const chartData = equityCurve.map(point => {
    return {
      time: new Date(point.time).toLocaleDateString(),
      value: point.value
    };
  });

  // Filter data to reduce points (for better performance)
  const filteredData = chartData.filter((_, index) => {
    // Keep only every nth point depending on the data size
    const interval = Math.ceil(chartData.length / 100);
    return index % interval === 0 || index === chartData.length - 1;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equity Curve</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                tickFormatter={(value) => value}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Account Value']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                fill="#3b82f680" 
                name="Account Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
