
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { checkConnectionHealth, ConnectionStatus, updateConnectionStatus } from '@/utils/connectionMonitor';

interface UseConnectionMonitorProps {
  connectionId: string;
  initialStatus?: boolean;
  interval?: number; // in milliseconds
  onStatusChange?: (status: ConnectionStatus) => void;
}

export function useConnectionMonitor({
  connectionId,
  initialStatus = true,
  interval = 60000, // default to 1 minute
  onStatusChange,
}: UseConnectionMonitorProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: initialStatus,
    lastChecked: new Date(),
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isCheckingNow, setIsCheckingNow] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Function to check connection health
  const checkHealth = async () => {
    if (!user || isCheckingNow) return;
    
    setIsCheckingNow(true);
    
    try {
      const newStatus = await checkConnectionHealth(connectionId, user.id);
      
      setStatus(newStatus);
      
      // Update status in database
      await updateConnectionStatus(connectionId, newStatus);
      
      // Call the onStatusChange callback if provided
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error("Error checking connection health:", error);
    } finally {
      setIsCheckingNow(false);
    }
  };

  // Start monitoring
  const startMonitoring = () => {
    if (isMonitoring || !user) return;
    
    setIsMonitoring(true);
    
    // Check immediately when starting
    checkHealth();
    
    // Set up interval
    intervalRef.current = window.setInterval(checkHealth, interval);
  };

  // Stop monitoring
  const stopMonitoring = () => {
    if (!isMonitoring) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsMonitoring(false);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    status,
    isMonitoring,
    isCheckingNow,
    checkHealth,
    startMonitoring,
    stopMonitoring,
  };
}
