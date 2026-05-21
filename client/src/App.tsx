import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/components/notification-bell";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { DashboardSkeleton } from "@/components/loading-skeleton";
import { PublicRoute } from "@/components/public-route";
import { PublicPageContentLoader } from "@/components/public-page-loader";
import { OnboardingTour } from "@/components/onboarding-tour";
import { CommandPalette } from "@/components/command-palette";
import { QuickSessionModal } from "@/components/modals/quick-session-modal";
import { QuickNoteModal } from "@/components/modals/quick-note-modal";
import { useColorTheme } from "@/hooks/use-color-theme";
import { DashboardErrorBoundary } from "@/components/dashboard-error-boundary";
import { Analytics } from "@/components/analytics";
import { PublicSiteLayout } from "@/components/public-site-layout";
import { SiteHeader } from "@/components/site-header";
import { trackPageView } from "@/lib/analytics";

const LandingPage = React.lazy(() => import("@/pages/landing"));
const IntakePage = React.lazy(() => import("@/pages/intake"));
const PublicPayPage = React.lazy(() => import("@/pages/pay"));
const SpeakingPage = React.lazy(() => import("@/pages/speaking"));
const SpeakingInvitePage = React.lazy(() => import("@/pages/speaking-invite"));
const ResourcesPage = React.lazy(() => import("@/pages/resources"));
const ArticleSabbathRestAi = React.lazy(() => import("@/pages/article-sabbath-rest-ai"));
const ArticleSoulNeedsStruggle = React.lazy(() => import("@/pages/article-soul-needs-struggle"));
const ArticleTeensAlgorithmFriend = React.lazy(() => import("@/pages/article-teens-algorithm-friend"));
const ChristianProfessionalWorksheetPage = React.lazy(() => import("@/pages/christian-professional-worksheet"));
const WorksheetSharePage = React.lazy(() => import("@/pages/worksheet-share"));
const AboutPage = React.lazy(() => import("@/pages/about"));
const SurveyPage = React.lazy(() => import("@/pages/survey"));
const PricingPage = React.lazy(() => import("@/pages/pricing"));
const LoginPage = React.lazy(() => import("@/pages/login"));
const PrivacyPage = React.lazy(() => import("@/pages/privacy"));
const TermsPage = React.lazy(() => import("@/pages/terms"));
const ForgotPassword = React.lazy(() => import("@/pages/forgot-password"));
const ResetPassword = React.lazy(() => import("@/pages/reset-password"));
const PresentationContactPage = React.lazy(() => import("@/pages/presentation-contact"));
const TaurangaSmePage = React.lazy(() => import("@/pages/tauranga-sme"));
const TaurangaSmeWelcomePage = React.lazy(() => import("@/pages/tauranga-sme-welcome"));

const ClientDashboard = React.lazy(() => import("@/pages/client/dashboard"));
const ClientCompleteProfile = React.lazy(() => import("@/pages/client/complete-profile"));
const ClientSessions = React.lazy(() => import("@/pages/client/sessions"));
const ClientSessionDetail = React.lazy(() => import("@/pages/client/session-detail"));
const ClientActions = React.lazy(() => import("@/pages/client/actions"));
const ClientResources = React.lazy(() => import("@/pages/client/resources"));
const ClientProfile = React.lazy(() => import("@/pages/client/profile"));
const ClientBilling = React.lazy(() => import("@/pages/client/billing"));

const CoachDashboard = React.lazy(() => import("@/pages/coach/dashboard"));
const CoachSetup = React.lazy(() => import("@/pages/coach/setup"));
const CoachClients = React.lazy(() => import("@/pages/coach/clients"));
const CoachClientDetail = React.lazy(() => import("@/pages/coach/client-detail"));
const CoachSessions = React.lazy(() => import("@/pages/coach/sessions"));
const CoachSessionDetail = React.lazy(() => import("@/pages/coach/session-detail"));
const CoachIntake = React.lazy(() => import("@/pages/coach/intake"));
const CoachResources = React.lazy(() => import("@/pages/coach/resources"));
const CoachCalculator = React.lazy(() => import("@/pages/coach/calculator"));
const CoachBilling = React.lazy(() => import("@/pages/coach/billing"));
const CoachAnalytics = React.lazy(() => import("@/pages/coach/analytics"));
const NotFound = React.lazy(() => import("@/pages/not-found"));

/** Logged-in users visiting `/` may briefly see the marketing page before redirect (faster anonymous first paint). */
function PublicHome() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (!isLoading && isAuthenticated && user) {
    if (user.role === "coach") {
      return <Redirect to="/consultant" />;
    }
    return <Redirect to="/client" />;
  }

  return (
    <PublicSiteLayout>
      <SiteHeader currentPage="landing" />
      <Suspense fallback={<PublicPageContentLoader />}>
        <div className="nb-public-page-enter">
          <LandingPage />
        </div>
      </Suspense>
    </PublicSiteLayout>
  );
}

// Route ownership: see client/src/config/routes.ts (PUBLIC_ROUTES vs APP_ROUTES for Marketing vs Full App mode).

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: "coach" | "client" }) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  // Check role if specified
  if (role) {
    const userRole = user?.role;

    if (role === "coach" && userRole !== "coach") {
      // Only coaches can access coach routes
      return <Redirect to="/client" />;
    }

    if (role === "client" && userRole === "coach") {
      // Consultants cannot access client routes
      return <Redirect to="/consultant" />;
    }
    // For client routes: allow undefined/null roles (new users default to client)
  }

  return <>{children}</>;
}

interface ClientProfileData {
  profileCompleted?: boolean;
}

interface UserData {
  onboardingCompleted?: boolean;
}

const APP_THEME = "app";
const SITE_THEME = "public";

/** Single source of truth: theme is driven only by the current path. Nothing else may change it. */
function useThemeFromPath() {
  const [path] = useLocation();
  useLayoutEffect(() => {
    const p = (path || "/").split("?")[0];
    const isDashboard = p.startsWith("/client") || p.startsWith("/consultant");
    const theme = isDashboard ? APP_THEME : SITE_THEME;
    const root = document.documentElement;

    const apply = () => {
      root.setAttribute("data-theme", theme);
      if (!isDashboard) {
        root.removeAttribute("data-color-theme");
      }
    };
    apply();
    // Re-apply after other layout effects and after paint so we win any race with dashboard theme
    const rafId = requestAnimationFrame(() => {
      apply();
      requestAnimationFrame(apply);
    });
    return () => cancelAnimationFrame(rafId);
  }, [path]);
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading: profileLoading } = useQuery<ClientProfileData>({
    queryKey: ["/api/client/profile"],
    retry: false,
  });
  const { data: userData } = useQuery<UserData>({
    queryKey: ["/api/auth/user"],
  });
  const [location] = useLocation();
  
  // Apply color theme
  useColorTheme();

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  // If profile not completed, redirect to setup (except if already on setup page)
  if (!profileLoading && profile && !profile.profileCompleted && !location.includes("/client/complete-profile")) {
    return <Redirect to="/client/complete-profile" />;
  }

  return (
    <div>
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="client" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <CommandPalette />
      <OnboardingTour role="client" tourCompleted={userData?.onboardingCompleted} />
    </SidebarProvider>
    </div>
  );
}

interface CoachSettings {
  onboardingCompleted?: boolean;
}

function CoachLayout({ children }: { children: React.ReactNode }) {
  const { data: settings, isLoading: settingsLoading } = useQuery<CoachSettings>({
    queryKey: ["/api/coach/settings"],
    retry: false,
  });
  const { data: userData } = useQuery<UserData>({
    queryKey: ["/api/auth/user"],
  });
  const [location] = useLocation();
  const [sessionModalOpen, setSessionModalOpen] = React.useState(false);
  const [noteModalOpen, setNoteModalOpen] = React.useState(false);
  
  // Apply color theme
  useColorTheme();

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  // If onboarding not completed, redirect to setup (except if already on setup page)
  if (!settingsLoading && settings && !settings.onboardingCompleted && !location.includes("/consultant/setup")) {
    return <Redirect to="/consultant/setup" />;
  }

  return (
    <div>
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="coach" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <CommandPalette 
        onScheduleSession={() => setSessionModalOpen(true)}
        onAddNote={() => setNoteModalOpen(true)}
      />
      <QuickSessionModal open={sessionModalOpen} onOpenChange={setSessionModalOpen} />
      <QuickNoteModal open={noteModalOpen} onOpenChange={setNoteModalOpen} />
      <OnboardingTour role="coach" tourCompleted={userData?.onboardingCompleted} />
    </SidebarProvider>
    </div>
  );
}

function ThemeSync() {
  useThemeFromPath();
  return null;
}

/** Sends a GA4 page_view on every SPA route change so Reports show per-page traffic. */
function GAPageViewTracker() {
  const [path] = useLocation();
  React.useEffect(() => {
    const p = (path || "/").split("?")[0];
    trackPageView(p, document.title);
  }, [path]);
  return null;
}

function Router() {
  return (
    <>
      <ThemeSync />
      <GAPageViewTracker />
      <Switch>
      {/* Public routes — always wrapped in PublicSiteLayout so is never lost */}
      <Route path="/" component={PublicHome} />
      <Route path="/intake" component={() => <PublicRoute><IntakePage /></PublicRoute>} />
      <Route path="/pay/:token" component={() => <PublicRoute><PublicPayPage /></PublicRoute>} />
      <Route path="/speaking/invite" component={() => <PublicRoute><SpeakingInvitePage /></PublicRoute>} />
      <Route path="/speaking" component={() => <PublicRoute><SpeakingPage /></PublicRoute>} />
      <Route path="/survey" component={() => <PublicRoute><SurveyPage /></PublicRoute>} />
      <Route path="/resources" component={() => <PublicRoute><ResourcesPage /></PublicRoute>} />
      {/* Redirect old /articles/... URLs to canonical /resources/... */}
      <Route path="/articles/when-your-teens-best-friend-is-an-algorithm">
        <Redirect to="/resources/when-your-teens-best-friend-is-an-algorithm" />
      </Route>
      <Route path="/resources/when-your-teens-best-friend-is-an-algorithm" component={() => <PublicRoute><ArticleTeensAlgorithmFriend /></PublicRoute>} />
      <Route path="/resources/sabbath-rest-in-the-age-of-ai" component={() => <PublicRoute><ArticleSabbathRestAi /></PublicRoute>} />
      <Route path="/resources/why-your-soul-needs-the-struggle" component={() => <PublicRoute><ArticleSoulNeedsStruggle /></PublicRoute>} />
      {/* Redirect old deep-dive worksheet slugs to canonical slugs */}
      <Route path="/resources/worksheet/protecting-kids-from-the-digital-god">
        <Redirect to="/resources/worksheet/the-digital-god-in-your-childs-pocket" />
      </Route>
      <Route path="/resources/worksheet/the-intimacy-trap-and-junior-job-crisis">
        <Redirect to="/resources/worksheet/the-broken-ladder-and-the-race-for-their-soul" />
      </Route>
      <Route path="/resources/worksheet/:id" component={() => <PublicRoute><WorksheetSharePage /></PublicRoute>} />
      <Route path="/resources/christian-professional/:slug" component={() => <PublicRoute><ChristianProfessionalWorksheetPage /></PublicRoute>} />
      <Route path="/about" component={() => <PublicRoute><AboutPage /></PublicRoute>} />
      <Route path="/pricing" component={() => <PublicRoute><PricingPage /></PublicRoute>} />
      <Route path="/tauranga-sme/welcome" component={() => <PublicRoute><TaurangaSmeWelcomePage /></PublicRoute>} />
      <Route path="/tauranga-sme" component={() => <PublicRoute><TaurangaSmePage /></PublicRoute>} />
      <Route path="/presentations/contact" component={() => <PublicRoute><PresentationContactPage /></PublicRoute>} />
      <Route path="/login" component={() => <PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/privacy" component={() => <PublicRoute><PrivacyPage /></PublicRoute>} />
      <Route path="/terms" component={() => <PublicRoute><TermsPage /></PublicRoute>} />
      <Route path="/forgot-password" component={() => <PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password" component={() => <PublicRoute><ResetPassword /></PublicRoute>} />

      {/* Client routes */}
      <Route path="/client/complete-profile">
        <ProtectedRoute role="client">
          <Suspense fallback={<DashboardSkeleton />}>
            <ClientCompleteProfile />
          </Suspense>
        </ProtectedRoute>
      </Route>
      <Route path="/client">
        <ProtectedRoute role="client">
          <ClientLayout>
            <Suspense fallback={<DashboardSkeleton />}><ClientDashboard /></Suspense>
          </ClientLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/client/sessions">
        <ProtectedRoute role="client">
          <ClientLayout>
            <Suspense fallback={<DashboardSkeleton />}><ClientSessions /></Suspense>
          </ClientLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/client/sessions/:id">
        <ProtectedRoute role="client">
          <ClientLayout>
            <Suspense fallback={<DashboardSkeleton />}><ClientSessionDetail /></Suspense>
          </ClientLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/client/actions">
        <ProtectedRoute role="client">
          <ClientLayout>
            <Suspense fallback={<DashboardSkeleton />}><ClientActions /></Suspense>
          </ClientLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/client/resources">
        <ProtectedRoute role="client">
          <ClientLayout>
            <Suspense fallback={<DashboardSkeleton />}><ClientResources /></Suspense>
          </ClientLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/client/profile">
        <ProtectedRoute role="client">
          <ClientLayout>
            <Suspense fallback={<DashboardSkeleton />}><ClientProfile /></Suspense>
          </ClientLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/client/billing">
        <ProtectedRoute role="client">
          <ClientLayout>
            <Suspense fallback={<DashboardSkeleton />}><ClientBilling /></Suspense>
          </ClientLayout>
        </ProtectedRoute>
      </Route>

      {/* Consultant routes */}
      <Route path="/consultant/setup">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachSetup /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <DashboardErrorBoundary fallbackTitle="Consultant dashboard error">
              <Suspense fallback={<DashboardSkeleton />}><CoachDashboard /></Suspense>
            </DashboardErrorBoundary>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/clients">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachClients /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/clients/:id">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachClientDetail /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/sessions/:id">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachSessionDetail /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/sessions">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachSessions /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/intake">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachIntake /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/resources">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachResources /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/calculator">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachCalculator /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/billing">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachBilling /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/consultant/analytics">
        <ProtectedRoute role="coach">
          <CoachLayout>
            <Suspense fallback={<DashboardSkeleton />}><CoachAnalytics /></Suspense>
          </CoachLayout>
        </ProtectedRoute>
      </Route>

      {/* Fallback to 404 */}
      <Route
        component={() => (
          <PublicRoute>
            <NotFound />
          </PublicRoute>
        )}
      />
    </Switch>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="nathaniel-baldock-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Analytics />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
