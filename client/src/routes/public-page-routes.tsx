import type { ComponentType } from "react";
import { PublicRoute } from "@/components/public-route";
import AboutPage from "@/pages/about";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import PricingPage from "@/pages/pricing";
import ResourcesPage from "@/pages/resources";
import SpeakingPage from "@/pages/speaking";
import {
  ArticleAiWorry,
  ArticleGardenTreeKnowledge,
  ArticleSabbathRestAi,
  ArticleSafePhrase,
  ArticleSoulNeedsStruggle,
  ArticleTeensAlgorithmFriend,
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
export const WorksheetSharePublicRoute = withPublicPage(WorksheetSharePage);
export const ChristianWorksheetPublicRoute = withPublicPage(ChristianProfessionalWorksheetPage);
export const AboutPublicRoute = withPublicPage(AboutPage);
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

export { LandingPage };
