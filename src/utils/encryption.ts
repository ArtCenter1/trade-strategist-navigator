
/**
 * Encryption utilities for sensitive data
 * 
 * This implementation uses AES-GCM encryption with a derived key from the user's session.
 * The encrypted data is stored with its IV to allow for decryption.
 */

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const SALT = 'trading_bot_salt'; // In production, this would be a more secure, environment-specific value

/**
 * Derives an encryption key from the user's session ID
 */
async function deriveKey(userId: string): Promise<CryptoKey> {
  // Convert the user ID to an array buffer to use as key material
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(userId + SALT)
  );

  // Import the key material
  return crypto.subtle.importKey(
    'raw',
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts sensitive data like API keys
 */
export async function encryptData(data: string, userId: string): Promise<string> {
  try {
    const key = await deriveKey(userId);
    
    // Generate a random initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the data
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    
    const encryptedData = await crypto.subtle.encrypt(
      { name: ALGORITHM, iv },
      key,
      encodedData
    );
    
    // Combine the IV and encrypted data for storage
    const result = new Uint8Array(iv.length + encryptedData.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encryptedData), iv.length);
    
    // Convert to base64 for storage
    return btoa(String.fromCharCode(...result));
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts encrypted data like API keys
 */
export async function decryptData(encryptedData: string, userId: string): Promise<string> {
  try {
    const key = await deriveKey(userId);
    
    // Convert from base64 and extract the IV and data
    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const ciphertext = data.slice(12);
    
    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      { name: ALGORITHM, iv },
      key,
      ciphertext
    );
    
    // Convert the decrypted data back to a string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
}
