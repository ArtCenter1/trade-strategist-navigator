
import { ExchangeConnectionCard } from "./exchange/ExchangeConnectionCard";

// Sample connection data for demonstration purposes
const dummyConnection = {
  id: "demo-connection",
  exchangeId: "binance",
  exchangeName: "Binance",
  label: "Demo Connection",
  isConnected: true,
  lastTested: new Date().toISOString(),
  permissions: ["READ"],
  balances: [
    { asset: "BTC", free: 0.1, locked: 0 },
    { asset: "USDT", free: 1000, locked: 0 },
  ],
};

export function ExchangeConnection() {
  return <ExchangeConnectionCard connection={dummyConnection} />;
}
