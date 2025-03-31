
import { ReactNode } from 'react';

export interface Bot {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  iconBgColor: string;
  successRate: number;
  activeUsers: number;
  isPopular?: boolean;
  isNew?: boolean;
}
