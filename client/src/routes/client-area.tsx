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
/** Nested under `<Route path="/client" nest>` — paths are relative to /client. */
export function ClientAreaPages() {
  return (
    <Suspense fallback={<DelayedDashboardSuspenseFallback />}>
      <Switch>
        <Route path="/sessions/:id" component={ClientSessionDetailRoute} />
        <Route path="/sessions" component={ClientSessionsRoute} />
        <Route path="/actions" component={ClientActionsRoute} />
        <Route path="/resources" component={ClientResourcesRoute} />
        <Route path="/profile" component={ClientProfileRoute} />
        <Route path="/billing" component={ClientBillingRoute} />
        <Route path="/" component={ClientDashboardRoute} />
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
