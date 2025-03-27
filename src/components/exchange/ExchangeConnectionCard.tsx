
import { ExchangeForm } from "./ExchangeForm";

export function ExchangeConnectionCard() {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Connect Exchange</h2>
      <p className="text-muted-foreground mb-6">
        Connect your cryptocurrency exchange by providing API keys. The keys will be encrypted and stored securely.
      </p>
      
      <ExchangeForm />
    </div>
  );
}
