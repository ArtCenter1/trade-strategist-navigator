
import { supabase } from "@/integrations/supabase/client";
import { decryptData } from "@/utils/encryption";
import { APIKeyData, testExchangeConnection } from "@/services/api/exchangeApiService";

export interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: Date;
  message?: string;
  latency?: number;
}

export interface MonitoredConnection {
  id: string;
  exchangeId: string;
  exchangeName: string;
  label: string;
  status: ConnectionStatus;
}

/**
 * Check the health of an exchange connection
 */
export async function checkConnectionHealth(
  connectionId: string, 
  userId: string
): Promise<ConnectionStatus> {
  const startTime = Date.now();
  
  try {
    // Fetch connection details from the database
    const { data, error } = await supabase
      .from('exchange_connections')
      .select('*')
      .eq('id', connectionId)
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    if (!data) throw new Error("Connection not found");
    
    // Decrypt API credentials
    const apiKey = await decryptData(data.api_key, userId);
    const apiSecret = await decryptData(data.api_secret, userId);
    
    // Create APIKeyData object for testing
    const apiKeyData: APIKeyData = {
      apiKey,
      apiSecret,
      exchange: data.exchange_name,
      label: data.label || '',
      readOnly: true,
      passphrase: data.passphrase ? await decryptData(data.passphrase, userId) : undefined
    };
    
    // Test the connection
    const testResult = await testExchangeConnection(apiKeyData);
    const latency = Date.now() - startTime;
    
    // Return connection status
    return {
      isConnected: testResult.isValid,
      lastChecked: new Date(),
      message: testResult.message,
      latency,
    };
  } catch (error) {
    console.error("Connection health check failed:", error);
    
    return {
      isConnected: false,
      lastChecked: new Date(),
      message: error instanceof Error ? error.message : "Connection check failed",
    };
  }
}

/**
 * Update connection status in the database
 */
export async function updateConnectionStatus(
  connectionId: string,
  status: ConnectionStatus
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('exchange_connections')
      .update({
        is_active: status.isConnected,
        last_checked: status.lastChecked.toISOString(),
        status_message: status.message,
        latency: status.latency,
      })
      .eq('id', connectionId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update connection status:", error);
    return false;
  }
}
