
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const CreateBotButton: React.FC = () => {
  return (
    <Button variant="outline" className="w-full justify-start gap-2 h-12">
      <Plus className="h-4 w-4" />
      CREATE NEW BOT
    </Button>
  );
};
