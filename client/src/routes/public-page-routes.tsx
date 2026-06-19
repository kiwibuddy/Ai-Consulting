import type { ComponentType } from "react";
import { PublicRoute } from "@/components/public-route";
import AboutPage from "@/pages/about";
import ExpertiseLandingPage from "@/pages/expertise-landing";
import LandingPage from "@/pages/landing";
import LeadershipCollectivePage from "@/pages/leadership-collective";
import LoginPage from "@/pages/login";
import PricingPage from "@/pages/pricing";
import ResourcesPage from "@/pages/resources";
import SpeakingPage from "@/pages/speaking";
import WhoIsNathanielBaldockPage from "@/pages/who-is-nathaniel-baldock";
import { EXPERTISE_PAGE_PATHS, type ExpertisePagePath } from "@/content/expertise-pages";
import {
  ArticleAiWorry,
  ArticleGardenTreeKnowledge,
  ArticleSabbathRestAi,
  ArticleGroundHasShifted,
  ArticleQuestionNobodyAsking,
  ArticleSafePhrase,
  ArticleSoulNeedsStruggle,
  ArticleTeensAlgorithmFriend,
  ArticleWorkAiCannotTake,
  ArticleWorldOfFakes,
  ChristianProfessionalWorksheetPage,
  ForgotPassword,
  IntakePage,
  NotFound,
  PresentationContactPage,
  PrivacyPage,
  PublicPayPage,
  ResetPassword,
  SpeakingInvitePage,
  SurveyPage,
  TaurangaSmePage,
  TaurangaSmeWelcomePage,
  TermsPage,
  WorksheetSharePage,
} from "@/routes/lazy-pages";

function withPublicPage(Page: ComponentType) {
  function PublicPageRoute() {
    return (
      <PublicRoute>
        <Page />
      </PublicRoute>
    );
  }
  PublicPageRoute.displayName = `Public(${Page.displayName ?? Page.name ?? "Page"})`;
  return PublicPageRoute;
}

export const IntakePublicRoute = withPublicPage(IntakePage);
export const PublicPayRoute = withPublicPage(PublicPayPage);
export const SpeakingInvitePublicRoute = withPublicPage(SpeakingInvitePage);
export const SpeakingPublicRoute = withPublicPage(SpeakingPage);
export const SurveyPublicRoute = withPublicPage(SurveyPage);
export const ResourcesPublicRoute = withPublicPage(ResourcesPage);
export const ArticleGardenPublicRoute = withPublicPage(ArticleGardenTreeKnowledge);
export const ArticleTeensPublicRoute = withPublicPage(ArticleTeensAlgorithmFriend);
export const ArticleSabbathPublicRoute = withPublicPage(ArticleSabbathRestAi);
export const ArticleSoulPublicRoute = withPublicPage(ArticleSoulNeedsStruggle);
export const ArticleAiWorryPublicRoute = withPublicPage(ArticleAiWorry);
export const ArticleSafePhrasePublicRoute = withPublicPage(ArticleSafePhrase);
export const ArticleGroundHasShiftedPublicRoute = withPublicPage(ArticleGroundHasShifted);
export const ArticleQuestionNobodyAskingPublicRoute = withPublicPage(ArticleQuestionNobodyAsking);
export const ArticleWorkAiCannotTakePublicRoute = withPublicPage(ArticleWorkAiCannotTake);
export const ArticleWorldOfFakesPublicRoute = withPublicPage(ArticleWorldOfFakes);
export const WorksheetSharePublicRoute = withPublicPage(WorksheetSharePage);
export const ChristianWorksheetPublicRoute = withPublicPage(ChristianProfessionalWorksheetPage);
export const AboutPublicRoute = withPublicPage(AboutPage);
export const LeadershipCollectivePublicRoute = withPublicPage(LeadershipCollectivePage);
export const WhoIsPublicRoute = withPublicPage(WhoIsNathanielBaldockPage);
export const PricingPublicRoute = withPublicPage(PricingPage);
export const TaurangaSmeWelcomePublicRoute = withPublicPage(TaurangaSmeWelcomePage);
export const TaurangaSmePublicRoute = withPublicPage(TaurangaSmePage);
export const PresentationContactPublicRoute = withPublicPage(PresentationContactPage);
export const LoginPublicRoute = withPublicPage(LoginPage);
export const PrivacyPublicRoute = withPublicPage(PrivacyPage);
export const TermsPublicRoute = withPublicPage(TermsPage);
export const ForgotPasswordPublicRoute = withPublicPage(ForgotPassword);
export const ResetPasswordPublicRoute = withPublicPage(ResetPassword);
export const NotFoundPublicRoute = withPublicPage(NotFound);

function withExpertisePage(pagePath: ExpertisePagePath) {
  function ExpertiseRoute() {
    return (
      <PublicRoute>
        <ExpertiseLandingPage pagePath={pagePath} />
      </PublicRoute>
    );
  }
  ExpertiseRoute.displayName = `Public(Expertise${pagePath})`;
  return ExpertiseRoute;
}

export const AiConsultingChurchesPublicRoute = withExpertisePage("/ai-consulting-for-churches");
export const AiTrainingSchoolsPublicRoute = withExpertisePage("/ai-training-for-schools");
export const AiGovernanceNonprofitsPublicRoute = withExpertisePage("/ai-governance-for-nonprofits");
export const AiSpeakerFaithPublicRoute = withExpertisePage("/ai-speaker-faith-and-technology");
export const AiUseAuditLandingPublicRoute = withExpertisePage("/ai-use-audit");

export { EXPERTISE_PAGE_PATHS, LandingPage };
