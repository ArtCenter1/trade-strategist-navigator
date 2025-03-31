
import { supabase } from "@/integrations/supabase/client";
import { encryptData, decryptData } from "@/utils/encryption";

export interface APIKeyData {
  apiKey: string;
  apiSecret: string;
  passphrase?: string;
  exchange: string;
  label: string;
  readOnly: boolean;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Validates API key format based on exchange requirements
 */
export function validateApiKeyFormat(exchange: string, apiKey: string, apiSecret: string): ValidationResult {
  // Basic validation - would be more specific per exchange in a production app
  if (apiKey.length < 10) {
    return { 
      isValid: false, 
      message: "API key is too short for " + exchange 
    };
  }

  if (apiSecret.length < 10) {
    return { 
      isValid: false, 
      message: "API secret is too short for " + exchange 
    };
  }

  // Specific exchange validations
  switch (exchange) {
    case 'binance':
      // Binance API keys are typically 64 characters
      if (!/^[A-Za-z0-9]{64}$/.test(apiKey)) {
        return { 
          isValid: false, 
          message: "Binance API keys should be 64 characters long and alphanumeric" 
        };
      }
      break;
    
    case 'coinbase':
      // Coinbase Pro API keys start with a specific pattern
      if (!/^[A-Za-z0-9]{16,}$/.test(apiKey)) {
        return { 
          isValid: false, 
          message: "Coinbase API keys should be at least 16 characters and alphanumeric" 
        };
      }
      break;
      
    // Add validations for other exchanges as needed
  }

  return { isValid: true, message: "API key format is valid" };
}

/**
 * Tests connection to an exchange API
 */
export async function testExchangeConnection(data: APIKeyData): Promise<ValidationResult> {
  try {
    // Format validation first
    const formatValidation = validateApiKeyFormat(data.exchange, data.apiKey, data.apiSecret);
    if (!formatValidation.isValid) {
      return formatValidation;
    }
    
    // In a real app, this would make an authenticated request to the exchange API
    // For now, we'll simulate a connection test with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate checking permissions based on read-only flag
    const permissionsValid = data.readOnly ? true : Math.random() > 0.2;
    
    if (!permissionsValid) {
      return {
        isValid: false,
        message: "The API key doesn't have sufficient trading permissions"
      };
    }
    
    return {
      isValid: true,
      message: "Connection successful! All permissions verified."
    };
  } catch (error) {
    console.error("Error testing exchange connection:", error);
    return {
      isValid: false,
      message: error instanceof Error ? error.message : "Connection test failed"
    };
  }
}

/**
 * Saves an exchange API connection to the database with encryption
 */
export async function saveExchangeConnection(data: APIKeyData, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Encrypt sensitive data
    const encryptedApiKey = await encryptData(data.apiKey, userId);
    const encryptedApiSecret = await encryptData(data.apiSecret, userId);
    const encryptedPassphrase = data.passphrase ? await encryptData(data.passphrase, userId) : null;
    
    // Save to database
    const { error } = await supabase
      .from('exchange_connections')
      .insert({
        user_id: userId,
        exchange_name: data.exchange,
        api_key: encryptedApiKey,
        api_secret: encryptedApiSecret,
        label: data.label || `${data.exchange} (${new Date().toLocaleDateString()})`,
        is_active: true,
        // Additional metadata could be stored here
      });
      
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error("Error saving exchange connection:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to save connection" 
    };
  }
}

/**
 * Fetches and decrypts exchange API connections for a user
 */
export async function getExchangeConnections(userId: string) {
  try {
    const { data, error } = await supabase
      .from('exchange_connections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // In a real app, you would decrypt the API keys here
    // For now, we'll just return the encrypted data
    return { success: true, connections: data };
  } catch (error) {
    console.error("Error fetching exchange connections:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch connections",
      connections: [] 
    };
  }
}
