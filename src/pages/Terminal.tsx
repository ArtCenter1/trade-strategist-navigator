
import React from 'react';
import TerminalPage from '@/components/terminal/TerminalPage';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Terminal() {
  return (
    <PageTransition>
      <TerminalPage />
    </PageTransition>
  );
}
