
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ConnectionTestResultProps {
  result: {
    success: boolean;
    message: string;
  };
}

export function ConnectionTestResult({ result }: ConnectionTestResultProps) {
  return (
    <Alert variant={result.success ? "default" : "destructive"}>
      {result.success ? 
        <CheckCircle2 className="h-4 w-4" /> : 
        <AlertCircle className="h-4 w-4" />
      }
      <AlertTitle>
        {result.success ? "Connection Successful" : "Connection Failed"}
      </AlertTitle>
      <AlertDescription>
        {result.message}
      </AlertDescription>
    </Alert>
  );
}
