import { Suspense, type ComponentType } from "react";
import { Switch, Route } from "wouter";
import { DelayedDashboardSuspenseFallback } from "@/components/suspense-fallback";
import {
  ClientActions,
  ClientBilling,
  ClientCompleteProfile,
  ClientDashboard,
  ClientProfile,
  ClientResources,
  ClientSessionDetail,
  ClientSessions,
} from "@/routes/lazy-pages";

function lazyPageRoute(Page: ComponentType) {
  function PageRoute() {
    return <Page />;
  }
  PageRoute.displayName = `Client(${Page.displayName ?? Page.name ?? "Page"})`;
  return PageRoute;
}

const ClientDashboardRoute = lazyPageRoute(ClientDashboard);
const ClientSessionsRoute = lazyPageRoute(ClientSessions);
const ClientSessionDetailRoute = lazyPageRoute(ClientSessionDetail);
const ClientActionsRoute = lazyPageRoute(ClientActions);
const ClientResourcesRoute = lazyPageRoute(ClientResources);
const ClientProfileRoute = lazyPageRoute(ClientProfile);
const ClientBillingRoute = lazyPageRoute(ClientBilling);
/** Matched from `/client` and `/client/*` parent routes — use full paths (not nested). */
export function ClientAreaPages() {
  return (
    <Suspense fallback={<DelayedDashboardSuspenseFallback />}>
      <Switch>
        <Route path="/client/sessions/:id" component={ClientSessionDetailRoute} />
        <Route path="/client/sessions" component={ClientSessionsRoute} />
        <Route path="/client/actions" component={ClientActionsRoute} />
        <Route path="/client/resources" component={ClientResourcesRoute} />
        <Route path="/client/profile" component={ClientProfileRoute} />
        <Route path="/client/billing" component={ClientBillingRoute} />
        <Route path="/client" component={ClientDashboardRoute} />
      </Switch>
    </Suspense>
  );
}

export function ClientCompleteProfilePage() {
  return (
    <Suspense fallback={<DelayedDashboardSuspenseFallback />}>
      <ClientCompleteProfile />
    </Suspense>
  );
}
