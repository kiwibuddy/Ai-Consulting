import React, { useLayoutEffect } from "react";
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
import { DelayedDashboardSuspenseFallback } from "@/components/suspense-fallback";
import { PublicRoute } from "@/components/public-route";
import { OnboardingTour } from "@/components/onboarding-tour";
import { CommandPalette } from "@/components/command-palette";
import { QuickSessionModal } from "@/components/modals/quick-session-modal";
import { QuickNoteModal } from "@/components/modals/quick-note-modal";
import { useColorTheme } from "@/hooks/use-color-theme";
import { Analytics } from "@/components/analytics";
import { PublicSiteLayout } from "@/components/public-site-layout";
import { SiteHeader } from "@/components/site-header";
import { trackPageView } from "@/lib/analytics";
import { ClientAreaPages, ClientCompleteProfilePage } from "@/routes/client-area";
import { CoachArea } from "@/routes/coach-area";
import { LandingPage } from "@/routes/public-page-routes";
import {
  AboutPublicRoute,
  AiConsultingChurchesPublicRoute,
  AiGovernanceNonprofitsPublicRoute,
  AiSpeakerFaithPublicRoute,
  AiTrainingSchoolsPublicRoute,
  AiUseAuditLandingPublicRoute,
  ArticleAiWorryPublicRoute,
  ArticleGardenPublicRoute,
  ArticleGroundHasShiftedPublicRoute,
  ArticleQuestionNobodyAskingPublicRoute,
  ArticleSabbathPublicRoute,
  ArticleSafePhrasePublicRoute,
  ArticleSoulPublicRoute,
  ArticleTeensPublicRoute,
  ArticleWorkAiCannotTakePublicRoute,
  ArticleWorldOfFakesPublicRoute,
  ChristianWorksheetPublicRoute,
  ForgotPasswordPublicRoute,
  IntakePublicRoute,
  LeadershipCollectivePublicRoute,
  ThankYouPublicRoute,
  LoginPublicRoute,
  NotFoundPublicRoute,
  PresentationContactPublicRoute,
  PricingPublicRoute,
  ProductsPublicRoute,
  SchoolsPackPublicRoute,
  SchoolsStaffPublicRoute,
  SchoolsStudentsPublicRoute,
  SchoolsGovernancePublicRoute,
  BusinessWorkersPublicRoute,
  PrivacyPublicRoute,
  PublicPayRoute,
  ResetPasswordPublicRoute,
  ResourcesPublicRoute,
  SpeakingInvitePublicRoute,
  SpeakingPublicRoute,
  SurveyPublicRoute,
  TaurangaSmePublicRoute,
  TaurangaSmeWelcomePublicRoute,
  TermsPublicRoute,
  WorksheetSharePublicRoute,
} from "@/routes/public-page-routes";

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
      <div className="nb-public-page-enter">
        <LandingPage />
      </div>
    </PublicSiteLayout>
  );
}

// Route ownership: see client/src/config/routes.ts (PUBLIC_ROUTES vs APP_ROUTES for Marketing vs Full App mode).

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: "coach" | "client" }) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <DelayedDashboardSuspenseFallback />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (role) {
    const userRole = user?.role;

    if (role === "coach" && userRole !== "coach") {
      return <Redirect to="/client" />;
    }

    if (role === "client" && userRole === "coach") {
      return <Redirect to="/consultant" />;
    }
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

  useColorTheme();

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

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
            <main className="flex-1 overflow-auto">{children}</main>
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

  useColorTheme();

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

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
            <main className="flex-1 overflow-auto">{children}</main>
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
        <Route path="/" component={PublicHome} />
        <Route path="/intake" component={IntakePublicRoute} />
        <Route path="/pay/:token" component={PublicPayRoute} />
        <Route path="/speaking/invite" component={SpeakingInvitePublicRoute} />
        <Route path="/speaking" component={SpeakingPublicRoute} />
        <Route path="/survey" component={SurveyPublicRoute} />
        <Route path="/ai-leadership-collective" component={LeadershipCollectivePublicRoute} />
        <Route path="/thank-you" component={ThankYouPublicRoute} />
        <Route path="/resources" component={ResourcesPublicRoute} />
        <Route path="/articles/when-your-teens-best-friend-is-an-algorithm">
          <Redirect to="/resources/when-your-teens-best-friend-is-an-algorithm" />
        </Route>
        <Route
          path="/resources/the-garden-and-the-tree-of-knowledge-in-your-pocket"
          component={ArticleGardenPublicRoute}
        />
        <Route
          path="/resources/when-your-teens-best-friend-is-an-algorithm"
          component={ArticleTeensPublicRoute}
        />
        <Route path="/resources/sabbath-rest-in-the-age-of-ai" component={ArticleSabbathPublicRoute} />
        <Route path="/resources/why-your-soul-needs-the-struggle" component={ArticleSoulPublicRoute} />
        <Route path="/resources/how-worried-should-you-be-about-ai" component={ArticleAiWorryPublicRoute} />
        <Route path="/resources/the-voice-on-the-phone-is-not-your-son" component={ArticleSafePhrasePublicRoute} />
        <Route path="/resources/something-has-changed-you-are-not-imagining-it" component={ArticleGroundHasShiftedPublicRoute} />
        <Route path="/resources/the-question-nobody-is-asking-about-ai" component={ArticleQuestionNobodyAskingPublicRoute} />
        <Route path="/resources/the-work-ai-cannot-take" component={ArticleWorkAiCannotTakePublicRoute} />
        <Route path="/resources/in-a-world-of-fakes-the-church-has-something-rare" component={ArticleWorldOfFakesPublicRoute} />
        <Route path="/resources/worksheet/protecting-kids-from-the-digital-god">
          <Redirect to="/resources/worksheet/the-digital-god-in-your-childs-pocket" />
        </Route>
        <Route path="/resources/worksheet/the-intimacy-trap-and-junior-job-crisis">
          <Redirect to="/resources/worksheet/the-broken-ladder-and-the-race-for-their-soul" />
        </Route>
        <Route path="/resources/worksheet/:id" component={WorksheetSharePublicRoute} />
        <Route path="/resources/christian-professional/:slug" component={ChristianWorksheetPublicRoute} />
        <Route path="/about" component={AboutPublicRoute} />
        <Route path="/who-is-nathaniel-baldock">
          <Redirect to="/about" />
        </Route>
        <Route path="/ai-consulting-for-churches" component={AiConsultingChurchesPublicRoute} />
        <Route path="/ai-training-for-schools" component={AiTrainingSchoolsPublicRoute} />
        <Route path="/ai-governance-for-nonprofits" component={AiGovernanceNonprofitsPublicRoute} />
        <Route path="/ai-speaker-faith-and-technology" component={AiSpeakerFaithPublicRoute} />
        <Route path="/ai-use-audit" component={AiUseAuditLandingPublicRoute} />
        <Route path="/pricing" component={PricingPublicRoute} />
        <Route path="/products" component={ProductsPublicRoute} />
        <Route path="/business/workers" component={BusinessWorkersPublicRoute} />
        <Route path="/schools/staff" component={SchoolsStaffPublicRoute} />
        <Route path="/schools/students" component={SchoolsStudentsPublicRoute} />
        <Route path="/schools/governance" component={SchoolsGovernancePublicRoute} />
        <Route path="/schools" component={SchoolsPackPublicRoute} />
        <Route path="/educators-pd">
          <Redirect to="/school-suite/flyers/educators-pd.html" />
        </Route>
        <Route path="/tauranga-sme/welcome" component={TaurangaSmeWelcomePublicRoute} />
        <Route path="/tauranga-sme" component={TaurangaSmePublicRoute} />
        <Route path="/presentations/contact" component={PresentationContactPublicRoute} />
        <Route path="/login" component={LoginPublicRoute} />
        <Route path="/privacy" component={PrivacyPublicRoute} />
        <Route path="/terms" component={TermsPublicRoute} />
        <Route path="/forgot-password" component={ForgotPasswordPublicRoute} />
        <Route path="/reset-password" component={ResetPasswordPublicRoute} />

        <Route path="/client/complete-profile">
          <ProtectedRoute role="client">
            <ClientCompleteProfilePage />
          </ProtectedRoute>
        </Route>
        <Route path="/client">
          <ProtectedRoute role="client">
            <ClientLayout>
              <ClientAreaPages />
            </ClientLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/client/*">
          <ProtectedRoute role="client">
            <ClientLayout>
              <ClientAreaPages />
            </ClientLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/consultant">
          <ProtectedRoute role="coach">
            <CoachLayout>
              <CoachArea />
            </CoachLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/consultant/*">
          <ProtectedRoute role="coach">
            <CoachLayout>
              <CoachArea />
            </CoachLayout>
          </ProtectedRoute>
        </Route>

        <Route component={NotFoundPublicRoute} />
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
