
import React from 'react';
import TerminalPage from '@/components/terminal/TerminalPage';
import { PageTransition } from '@/components/layout/PageTransition';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function Terminal() {
  return (
    <DashboardLayout>
      <PageTransition>
        <TerminalPage />
      </PageTransition>
    </DashboardLayout>
  );
}
