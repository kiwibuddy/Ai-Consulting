import { SchoolLanePage } from "@/components/school-lane-page";
import { WORKER_LANE } from "@/content/worker-lanes";
import { workerSuiteOffers } from "@/content/worker-suite";

export default function BusinessWorkersPage() {
  return (
    <SchoolLanePage
      config={WORKER_LANE}
      offers={workerSuiteOffers}
      secondaryCta={{ label: "← All products", href: "/products" }}
      footerResourcesNote="Free tools open in a new tab and work on phone or desktop. Paid kits are delivered after you book."
      footerSecondaryCta={{ label: "← All products", href: "/products" }}
      offersSectionTitle="Tools & programmes"
      offersSectionIntro="Start with the free checklist and ATS one-pager. Book a call for workshop kits, the Skills Bridge programme, or a community seminar."
    />
  );
}
