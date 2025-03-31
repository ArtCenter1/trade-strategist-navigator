
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageTransition } from '@/components/layout/PageTransition';
import BotsPage from '@/components/bots/BotsPage';

export default function Bots() {
  return (
    <DashboardLayout>
      <PageTransition>
        <BotsPage />
      </PageTransition>
    </DashboardLayout>
  );
}
