import { SchoolLanePage } from "@/components/school-lane-page";
import { SCHOOL_LANE_STUDENTS } from "@/content/school-lanes";

export default function SchoolsStudentsPage() {
  return <SchoolLanePage config={SCHOOL_LANE_STUDENTS} offerLane="students" />;
}
