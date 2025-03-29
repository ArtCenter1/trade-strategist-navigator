
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";

interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto p-6">
      <DashboardBreadcrumbs />
      {children}
    </main>
  );
}
