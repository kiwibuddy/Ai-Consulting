import { Suspense, type ComponentType } from "react";
import { Switch, Route } from "wouter";
import { DashboardErrorBoundary } from "@/components/dashboard-error-boundary";
import { DelayedDashboardSuspenseFallback } from "@/components/suspense-fallback";
import {
  CoachAnalytics,
  CoachBilling,
  CoachCalculator,
  CoachClientDetail,
  CoachClients,
  CoachDashboard,
  CoachIntake,
  CoachResources,
  CoachSessionDetail,
  CoachSessions,
  CoachSetup,
} from "@/routes/lazy-pages";

function lazyPageRoute(Page: ComponentType) {
  function PageRoute() {
    return <Page />;
  }
  PageRoute.displayName = `Coach(${Page.displayName ?? Page.name ?? "Page"})`;
  return PageRoute;
}

const CoachDashboardRoute = lazyPageRoute(CoachDashboard);
const CoachSetupRoute = lazyPageRoute(CoachSetup);
const CoachClientsRoute = lazyPageRoute(CoachClients);
const CoachClientDetailRoute = lazyPageRoute(CoachClientDetail);
const CoachSessionDetailRoute = lazyPageRoute(CoachSessionDetail);
const CoachSessionsRoute = lazyPageRoute(CoachSessions);
const CoachIntakeRoute = lazyPageRoute(CoachIntake);
const CoachResourcesRoute = lazyPageRoute(CoachResources);
const CoachCalculatorRoute = lazyPageRoute(CoachCalculator);
const CoachBillingRoute = lazyPageRoute(CoachBilling);
const CoachAnalyticsRoute = lazyPageRoute(CoachAnalytics);

function CoachDashboardWithBoundary() {
  return (
    <DashboardErrorBoundary fallbackTitle="Consultant dashboard error">
      <CoachDashboard />
    </DashboardErrorBoundary>
  );
}

const CoachDashboardBoundaryRoute = lazyPageRoute(CoachDashboardWithBoundary);

/** Matched from `/consultant` and `/consultant/*` parent routes — use full paths (not nested). */
export function CoachAreaPages() {
  return (
    <Suspense fallback={<DelayedDashboardSuspenseFallback />}>
      <Switch>
        <Route path="/consultant/setup" component={CoachSetupRoute} />
        <Route path="/consultant/clients/:id" component={CoachClientDetailRoute} />
        <Route path="/consultant/clients" component={CoachClientsRoute} />
        <Route path="/consultant/sessions/:id" component={CoachSessionDetailRoute} />
        <Route path="/consultant/sessions" component={CoachSessionsRoute} />
        <Route path="/consultant/intake" component={CoachIntakeRoute} />
        <Route path="/consultant/resources" component={CoachResourcesRoute} />
        <Route path="/consultant/calculator" component={CoachCalculatorRoute} />
        <Route path="/consultant/billing" component={CoachBillingRoute} />
        <Route path="/consultant/analytics" component={CoachAnalyticsRoute} />
        <Route path="/consultant" component={CoachDashboardBoundaryRoute} />
      </Switch>
    </Suspense>
  );
}

export function CoachArea() {
  return <CoachAreaPages />;
}
