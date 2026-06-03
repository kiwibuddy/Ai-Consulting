import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type PageModule = { default: ComponentType };

function lazyPage(importFn: () => Promise<PageModule>): LazyExoticComponent<ComponentType> {
  return lazy(importFn);
}

// Eager-loaded in public-page-routes (main nav): landing, about, speaking, resources, pricing, login

export const IntakePage = lazyPage(() => import("@/pages/intake"));
export const PublicPayPage = lazyPage(() => import("@/pages/pay"));
export const SpeakingInvitePage = lazyPage(() => import("@/pages/speaking-invite"));
export const ArticleGardenTreeKnowledge = lazyPage(() => import("@/pages/article-garden-tree-knowledge"));
export const ArticleSabbathRestAi = lazyPage(() => import("@/pages/article-sabbath-rest-ai"));
export const ArticleSoulNeedsStruggle = lazyPage(() => import("@/pages/article-soul-needs-struggle"));
export const ArticleTeensAlgorithmFriend = lazyPage(() => import("@/pages/article-teens-algorithm-friend"));
export const ArticleAiWorry = lazyPage(() => import("@/pages/article-ai-worry"));
export const ArticleSafePhrase = lazyPage(() => import("@/pages/article-safe-phrase"));
export const ArticleGroundHasShifted = lazyPage(() => import("@/pages/article-ground-has-shifted"));
export const ArticleQuestionNobodyAsking = lazyPage(() => import("@/pages/article-question-nobody-asking"));
export const ArticleWorkAiCannotTake = lazyPage(() => import("@/pages/article-work-ai-cannot-take"));
export const ArticleWorldOfFakes = lazyPage(() => import("@/pages/article-world-of-fakes"));
export const ChristianProfessionalWorksheetPage = lazyPage(
  () => import("@/pages/christian-professional-worksheet"),
);
export const WorksheetSharePage = lazyPage(() => import("@/pages/worksheet-share"));
export const SurveyPage = lazyPage(() => import("@/pages/survey"));
export const PrivacyPage = lazyPage(() => import("@/pages/privacy"));
export const TermsPage = lazyPage(() => import("@/pages/terms"));
export const ForgotPassword = lazyPage(() => import("@/pages/forgot-password"));
export const ResetPassword = lazyPage(() => import("@/pages/reset-password"));
export const PresentationContactPage = lazyPage(() => import("@/pages/presentation-contact"));
export const TaurangaSmePage = lazyPage(() => import("@/pages/tauranga-sme"));
export const TaurangaSmeWelcomePage = lazyPage(() => import("@/pages/tauranga-sme-welcome"));
export const NotFound = lazyPage(() => import("@/pages/not-found"));

export const ClientDashboard = lazyPage(() => import("@/pages/client/dashboard"));
export const ClientCompleteProfile = lazyPage(() => import("@/pages/client/complete-profile"));
export const ClientSessions = lazyPage(() => import("@/pages/client/sessions"));
export const ClientSessionDetail = lazyPage(() => import("@/pages/client/session-detail"));
export const ClientActions = lazyPage(() => import("@/pages/client/actions"));
export const ClientResources = lazyPage(() => import("@/pages/client/resources"));
export const ClientProfile = lazyPage(() => import("@/pages/client/profile"));
export const ClientBilling = lazyPage(() => import("@/pages/client/billing"));

export const CoachDashboard = lazyPage(() => import("@/pages/coach/dashboard"));
export const CoachSetup = lazyPage(() => import("@/pages/coach/setup"));
export const CoachClients = lazyPage(() => import("@/pages/coach/clients"));
export const CoachClientDetail = lazyPage(() => import("@/pages/coach/client-detail"));
export const CoachSessions = lazyPage(() => import("@/pages/coach/sessions"));
export const CoachSessionDetail = lazyPage(() => import("@/pages/coach/session-detail"));
export const CoachIntake = lazyPage(() => import("@/pages/coach/intake"));
export const CoachResources = lazyPage(() => import("@/pages/coach/resources"));
export const CoachCalculator = lazyPage(() => import("@/pages/coach/calculator"));
export const CoachBilling = lazyPage(() => import("@/pages/coach/billing"));
export const CoachAnalytics = lazyPage(() => import("@/pages/coach/analytics"));
