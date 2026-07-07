import { SchoolLanePage } from "@/components/school-lane-page";
import { SCHOOL_LANE_STAFF } from "@/content/school-lanes";

export default function SchoolsStaffPage() {
  return <SchoolLanePage config={SCHOOL_LANE_STAFF} offerLane="staff" />;
}
