
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateBotButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/bot-builder');
  };

  return (
    <Button 
      variant="outline" 
      className="w-full justify-start gap-2 h-12 bg-transparent border-[#333333] hover:bg-[#222222] hover:border-[#444444] text-white"
      onClick={handleClick}
    >
      <Plus className="h-4 w-4" />
      CREATE NEW BOT
    </Button>
  );
};
