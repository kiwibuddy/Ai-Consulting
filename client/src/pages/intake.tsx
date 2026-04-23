import { Link, useLocation } from "wouter";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, ApiError } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader } from "@/components/site-header";
import { PageSEO } from "@/components/page-seo";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  Clock,
  MessageCircle,
  MoreHorizontal,
  ExternalLink,
  Shield,
  Calendar,
  ClipboardList,
  ListChecks,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SpeakingFormContent } from "@/pages/speaking-invite";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const SECTOR_OPTIONS = [
  { value: "church", label: "Church / Ministry" },
  { value: "mission_org", label: "Mission Organisation" },
  { value: "school", label: "School / Training Organisation" },
  { value: "nonprofit", label: "Nonprofit / NGO" },
  { value: "family", label: "Family / Parenting" },
  { value: "other", label: "Other" },
];

const AI_EXPERIENCE_OPTIONS = [
  { value: "none", label: "Not using AI yet" },
  { value: "exploring", label: "Exploring / experimenting" },
  { value: "some_use", label: "Using it in a few areas" },
  { value: "regular", label: "Using it regularly" },
];

const BUDGET_OPTIONS = [
  { value: "exploring", label: "Just exploring options" },
  { value: "under_1k", label: "Under $1,000 NZD" },
  { value: "1k_3k", label: "$1,000 – $3,000 NZD" },
  { value: "3k_5k", label: "$3,000 – $5,000 NZD" },
  { value: "5k_plus", label: "$5,000+ NZD" },
  { value: "discuss", label: "Let's discuss on the call" },
];

/** When set (e.g. Google Calendar booking link), intake shows "Book a 30-min call" CTA that opens this URL. */
const BOOKING_URL = import.meta.env.VITE_BOOKING_URL as string | undefined;

/** Google appointment pages set frame restrictions — embedded iframes on other sites are usually blank. */
function isGoogleCalendarBookingUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    // These hosts send frame-ancestors / X-Frame-Options that blank third-party iframes.
    return (
      host === "calendar.app.google" ||
      host === "calendar.google.com" ||
      host.endsWith(".app.google")
    );
  } catch {
    return false;
  }
}

const HOW_HEARD_OPTIONS = [
  { value: "friend", label: "Friend or colleague" },
  { value: "church", label: "Through my church" },
  { value: "social", label: "Social media" },
  { value: "search", label: "Web search" },
  { value: "event", label: "Heard me speak" },
  { value: "other", label: "Other" },
];

const intakeFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  role: z.string().optional(),
  industry: z.string().optional(),
  problemStatement: z
    .string()
    .min(20, "A brief description helps me prepare for our call")
    .max(1000)
    .optional()
    .or(z.literal("")),
  currentAiUsage: z.string().optional(),
  budgetRange: z.string().optional(),
  howDidYouHear: z.string().optional(),
});

type IntakeFormValues = z.infer<typeof intakeFormSchema>;

function IntakeAboutYouFields({ showSectionTitle = true }: { showSectionTitle?: boolean }) {
  const { control } = useFormContext<IntakeFormValues>();
  return (
    <div className="space-y-5">
      {showSectionTitle ? (
        <h2 className="text-lg font-semibold text-neutral-900">About you</h2>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name *</FormLabel>
              <FormControl>
                <Input placeholder="Jane" {...field} data-testid="input-firstname" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name *</FormLabel>
              <FormControl>
                <Input placeholder="Smith" {...field} data-testid="input-lastname" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="jane@example.com"
                {...field}
                data-testid="input-email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Phone</FormLabel>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              international
              defaultCountry="NZ"
              countryCallingCodeEditable={false}
              value={field.value}
              onChange={(val) => field.onChange(val || "")}
              className="flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background [&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-2 [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:border-r [&_.PhoneInputCountry]:border-input"
            />
          )}
        />
      </FormItem>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="organisation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation</FormLabel>
              <FormControl>
                <Input
                  placeholder="Church, school, NGO…"
                  {...field}
                  data-testid="input-organisation"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Pastor, Director" {...field} data-testid="input-role" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sector</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sector" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SECTOR_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}

function IntakeSituationFields() {
  const { control } = useFormContext<IntakeFormValues>();
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-neutral-900">Your situation</h2>
      <p className="text-sm text-neutral-500">
        Just enough for me to prepare — we&apos;ll explore the details together on the call.
      </p>

      <FormField
        control={control}
        name="problemStatement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What are you hoping to get help with?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g. We're a church of ~200 people and our admin team is overwhelmed. We'd like to explore how AI could help with communications, sermon prep support, or volunteer coordination — but we don't know where to start."
                className="min-h-[100px]"
                {...field}
                data-testid="textarea-problem"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="currentAiUsage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Where are you at with AI currently?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {AI_EXPERIENCE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}

function IntakePracticalFields() {
  const { control } = useFormContext<IntakeFormValues>();
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-neutral-900">Practical details</h2>

      <FormField
        control={control}
        name="budgetRange"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have a budget range in mind?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select (optional)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {BUDGET_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-neutral-400 mt-1">
              No pressure — this just helps me suggest the right starting point. Community pricing is
              available.
            </p>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="howDidYouHear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How did you hear about me?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select (optional)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {HOW_HEARD_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}

function IntakeExtendedFields() {
  return (
    <div className="space-y-8">
      <IntakeSituationFields />
      <div className="pt-2 border-t border-neutral-100">
        <IntakePracticalFields />
      </div>
    </div>
  );
}

type FormType = "consultation" | "speaking";

function getInitialFormType(): FormType {
  if (typeof window === "undefined") return "consultation";
  const params = new URLSearchParams(window.location.search);
  return params.get("form") === "speaking" ? "speaking" : "consultation";
}

export default function IntakePage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [formType, setFormType] = useState<FormType>(getInitialFormType);
  const [submittedForm, setSubmittedForm] = useState<FormType | null>(null);

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organisation: "",
      role: "",
      industry: "",
      problemStatement: "",
      currentAiUsage: "",
      budgetRange: "",
      howDidYouHear: "",
    },
  });

  const [intakeDetailsOpen, setIntakeDetailsOpen] = useState(false);
  const [intakeFormModalOpen, setIntakeFormModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [showBookingThanks, setShowBookingThanks] = useState(false);
  const [claimEmail, setClaimEmail] = useState("");
  const [claimFirstName, setClaimFirstName] = useState("");
  const [claimLastName, setClaimLastName] = useState("");
  const [bookingPortalClaimed, setBookingPortalClaimed] = useState(false);
  const userDismissedExtendedRef = useRef(false);
  const watchedForm = useWatch({ control: form.control });

  useEffect(() => {
    if (!BOOKING_URL || userDismissedExtendedRef.current) return;
    const w = watchedForm;
    if (!w) return;
    const startedBasic =
      (w.firstName?.trim()?.length ?? 0) > 0 ||
      (w.lastName?.trim()?.length ?? 0) > 0 ||
      (w.email?.trim()?.length ?? 0) > 0;
    const startedMoreAboutYou =
      (w.phone?.trim()?.length ?? 0) > 0 ||
      (w.organisation?.trim()?.length ?? 0) > 0 ||
      (w.role?.trim()?.length ?? 0) > 0 ||
      (w.industry?.trim()?.length ?? 0) > 0;
    const hasExtended =
      (w.problemStatement && w.problemStatement.length > 0) ||
      (w.currentAiUsage && w.currentAiUsage.length > 0) ||
      (w.budgetRange && w.budgetRange.length > 0) ||
      (w.howDidYouHear && w.howDidYouHear.length > 0);
    if (startedBasic || startedMoreAboutYou || hasExtended) setIntakeDetailsOpen(true);
  }, [watchedForm]);

  const handleFinishedBooking = () => {
    setBookingModalOpen(false);
    setShowBookingThanks(true);
    setBookingPortalClaimed(false);
    trackEvent("intake_booking", { action: "completed_in_modal" });
  };

  const claimPortalMutation = useMutation({
    mutationFn: async (body: { email: string; firstName?: string; lastName?: string }) => {
      return apiRequest<{ success: boolean }>("POST", "/api/portal/claim-from-booking", body);
    },
    onSuccess: () => {
      setBookingPortalClaimed(true);
      trackEvent("portal_claim", { source: "calendar_thank_you" });
      toast({
        title: "Check your email",
        description: "We sent a link to set your password or sign in to the client portal.",
      });
    },
    onError: (err: unknown) => {
      const serverMsg = err instanceof ApiError ? err.body?.error ?? err.body?.message : null;
      toast({
        title: "Couldn’t send",
        description: typeof serverMsg === "string" ? serverMsg : "Please try again or use Sign in on the site.",
        variant: "destructive",
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: IntakeFormValues) => {
      return apiRequest("POST", "/api/intake", data);
    },
    onSuccess: () => {
      trackEvent("form_submit", { form_name: "intake" });
      toast({
        title: "Request received!",
        description: "I'll be in touch within 1–2 business days.",
      });
      form.reset();
      setIntakeDetailsOpen(false);
      setIntakeFormModalOpen(false);
      userDismissedExtendedRef.current = false;
      setSubmittedForm("consultation");
    },
    onError: (err: unknown) => {
      if (import.meta.env.DEV) console.error("Intake form error:", err);
      const serverMsg = err instanceof ApiError ? err.body?.message ?? err.body?.error : null;
      const description = serverMsg ?? "Please try again, or email me directly.";
      toast({
        title: "Something went wrong",
        description,
        variant: "destructive",
      });
    },
  });

  const bookingUsesExternalWindow = Boolean(BOOKING_URL && isGoogleCalendarBookingUrl(BOOKING_URL));

  const openBookingPage = () => {
    if (!BOOKING_URL) return;
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    trackEvent("intake_booking", { action: "open_external_window" });
  };

  const submitFooter = (
    <div className="w-full space-y-3">
      <Button
        type="submit"
        size="lg"
        disabled={submitMutation.isPending}
        className="tesoro-cta-gradient w-full rounded-xl font-semibold px-8 text-white"
        data-testid="button-submit"
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request a call
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-xs text-neutral-400 max-w-prose">
        I&apos;ll respond within 1–2 business days. Your information is only used to arrange and prepare
        for our conversation.
      </p>
    </div>
  );

  const intakeModalSubmitFooter = (
    <div className="w-full space-y-3 border-t border-neutral-100 pt-5 mt-6">
      <Button
        type="submit"
        size="lg"
        disabled={submitMutation.isPending}
        className="tesoro-cta-gradient w-full rounded-xl font-semibold px-8 text-white"
        data-testid="button-submit-intake-modal"
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Submit intake form
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      <p className="text-xs text-neutral-400 max-w-prose">
        Expect a personal reply, usually within one business day, always within 1–2. Your information is
        only used to follow up and prepare for your call.
      </p>
    </div>
  );

  // Success state: show the card for whichever form was submitted
  if (submittedForm === "consultation") {
    return (
      <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <SiteHeader />
        <div className="pt-28 min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-0 shadow-lg bg-white">
            <CardContent className="p-8 text-center">
              <div className="rounded-full bg-green-50 p-4 w-fit mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                Thanks — I've got your details!
              </h1>
              <p className="text-neutral-600 mb-4">
                I'll review your request and be in touch within 1–2 business days
                to find a time that works for our call.
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                In the meantime, feel free to look around:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">Back to home</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/speaking">Speaking topics</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/intake?form=speaking">Invite me to speak</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (submittedForm === "speaking") {
    return (
      <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <SiteHeader />
        <div className="pt-28 min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-0 shadow-lg bg-white">
            <CardContent className="p-8 text-center">
              <div className="rounded-full bg-green-50 p-4 w-fit mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                Thanks for the invitation!
              </h1>
              <p className="text-neutral-600 mb-4">
                I'm excited to hear about your event. I'll review the details and
                be in touch within 1–2 business days to discuss next steps.
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                In the meantime, feel free to explore:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/speaking">Speaking topics</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">Back to home</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/intake">Request a discovery call</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <PageSEO
        title="Book a Free AI Consultation — Nathaniel Baldock AI Consulting"
        description="Book a free 30-minute AI consultation for your church, school, or nonprofit. Get practical guidance on AI strategy, policy, and implementation from a faith-based AI consultant."
        canonicalPath="/intake"
      />
      <SiteHeader />
      <main
        className={cn(
          "public-form-light mx-auto px-6 pt-28 pb-12 md:pb-16",
          formType === "consultation" && BOOKING_URL ? "max-w-6xl" : "max-w-3xl"
        )}
      >
        {/* Sliding switcher: same green as CTA, other option plain text; pill slides on click */}
        <div className="mb-8">
          <div className="relative flex rounded-xl border border-neutral-200 bg-neutral-100 p-1.5">
            <div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-3px)] rounded-lg tesoro-cta-gradient transition-all duration-300 ease-out"
              style={{ left: formType === "consultation" ? 6 : "calc(50% + 3px)" }}
            />
            <button
              type="button"
              onClick={() => {
                setFormType("consultation");
                setLocation("/intake");
              }}
              className="relative z-10 flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <span className={formType === "consultation" ? "text-white" : "text-neutral-600 hover:text-neutral-900"}>
                Request a free discovery call
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFormType("speaking");
                setLocation("/intake?form=speaking");
              }}
              className="relative z-10 flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <span className={formType === "speaking" ? "text-white" : "text-neutral-600 hover:text-neutral-900"}>
                Invite me to speak
              </span>
            </button>
          </div>
        </div>

        {formType === "speaking" ? (
          <SpeakingFormContent onSuccess={() => setSubmittedForm("speaking")} />
        ) : (
          <>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            {BOOKING_URL ? "Free 30-minute discovery call" : "Request a free discovery call"}
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
            {BOOKING_URL ? (
              <>
                <span className="text-neutral-800 font-medium">Pick one step below: </span>
                book a time in the calendar, or open the short intake. Both are free, no
                pressure—I use what you share to show up prepared. Intakes get a real reply, usually
                within one business day, always within 1–2. Your details stay private.
              </>
            ) : (
              <>
                Tell me a little about your context and I&apos;ll be in touch to arrange a 30-minute
                conversation. No hard sell—just enough to see whether I can help and what a next step
                could look like.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mb-10 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-neutral-400" />
            30 min · free · no obligation
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4 text-neutral-400" />
            Zoom or phone — your choice
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-neutral-400" />
            Your details stay private
          </span>
        </div>

        {showBookingThanks && (
          <Card className="mb-8 border border-green-200/80 bg-gradient-to-r from-green-50/90 to-white shadow-sm">
            <CardContent className="p-5 sm:p-6 space-y-6">
              <div className="flex gap-3 min-w-0">
                <CheckCircle className="h-9 w-9 text-green-600 shrink-0" aria-hidden />
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-neutral-900">Thanks for booking a time</h2>
                  <p className="text-sm text-neutral-600 mt-1.5 max-w-prose">
                    I&apos;m looking forward to our conversation. In the meantime, here are the latest
                    resources you can explore.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button size="sm" className="tesoro-cta-gradient font-medium" asChild>
                      <Link href="/resources">
                        View latest resources
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-neutral-500"
                      onClick={() => setShowBookingThanks(false)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>

              {BOOKING_URL && (
                <div className="border-t border-green-200/60 pt-5">
                  <h3 className="text-sm font-semibold text-neutral-900">Client portal</h3>
                  <p className="text-sm text-neutral-600 mt-1 mb-3 max-w-prose">
                    Use the <strong>same email you used in Google Calendar</strong> (or the one you want for
                    the portal). We&apos;ll email you a secure link to set a password or to sign in.
                  </p>
                  {bookingPortalClaimed ? (
                    <p className="text-sm text-green-800 font-medium">
                      Done — check your inbox for the next step. You can also{" "}
                      <Link href="/login" className="underline">
                        go to Sign in
                      </Link>{" "}
                      anytime.
                    </p>
                  ) : (
                    <form
                      className="space-y-3 max-w-md"
                      onSubmit={(e) => {
                        e.preventDefault();
                        claimPortalMutation.mutate({
                          email: claimEmail.trim(),
                          firstName: claimFirstName.trim() || undefined,
                          lastName: claimLastName.trim() || undefined,
                        });
                      }}
                    >
                      <div className="space-y-1.5">
                        <Label htmlFor="claim-email">Email</Label>
                        <Input
                          id="claim-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={claimEmail}
                          onChange={(e) => setClaimEmail(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="claim-first">First name (optional)</Label>
                          <Input
                            id="claim-first"
                            value={claimFirstName}
                            onChange={(e) => setClaimFirstName(e.target.value)}
                            className="bg-white"
                            placeholder="Jane"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="claim-last">Last name (optional)</Label>
                          <Input
                            id="claim-last"
                            value={claimLastName}
                            onChange={(e) => setClaimLastName(e.target.value)}
                            className="bg-white"
                            placeholder="Smith"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={claimPortalMutation.isPending || !claimEmail.trim()}
                        className="tesoro-cta-gradient"
                      >
                        {claimPortalMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending…
                          </>
                        ) : (
                          "Send portal access email"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Form {...form}>
          {BOOKING_URL ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <Card className="border-0 shadow-sm bg-white h-full min-h-0 flex flex-col self-stretch">
                  <CardContent className="p-6 md:p-8 flex h-full min-h-0 flex-1 flex-col text-center md:text-left">
                    <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Calendar className="h-5 w-5" aria-hidden />
                      </div>
                      <h2 className="text-base font-semibold text-neutral-900">Schedule in the calendar</h2>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Pick a time that works for you. You&apos;ll get a confirmation and calendar invite
                      right away
                      {bookingUsesExternalWindow
                        ? " — the scheduler opens in a new window (Google does not allow embedding on other sites)."
                        : " — the scheduler opens full screen here in a modal (no new tab)."}
                    </p>
                    <ul className="mt-5 space-y-3 text-left text-sm text-neutral-700">
                      <li className="flex gap-3">
                        <ListChecks className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                        <span>Choose a slot that fits your week — NZ-friendly hours where possible.</span>
                      </li>
                      <li className="flex gap-3">
                        <ListChecks className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                        <span>Meet on Zoom or phone; you&apos;ll see the link in the invite.</span>
                      </li>
                      <li className="flex gap-3">
                        <ListChecks className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                        <span>
                          Want me to have context first? Add it with the intake on the right before we meet
                          (optional).
                        </span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-6 w-full">
                      <Button
                        type="button"
                        size="lg"
                        className="tesoro-cta-gradient w-full rounded-xl font-semibold px-8 text-white"
                        onClick={() => setBookingModalOpen(true)}
                        data-testid="button-open-booking-modal"
                      >
                        {bookingUsesExternalWindow ? "Book in Google Calendar" : "Book a 30-min call"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <p className="text-xs text-neutral-500 mt-3 leading-snug">
                        Prefer to coordinate by email first? Use the intake in the other column, then
                        we&apos;ll pick a time.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white h-full min-h-0 flex flex-col self-stretch">
                  <CardContent className="p-6 md:p-8 flex h-full min-h-0 flex-1 flex-col text-center md:text-left">
                    <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <ClipboardList className="h-5 w-5" aria-hidden />
                      </div>
                      <h2 className="text-base font-semibold text-neutral-900">Send a short intake</h2>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      A few fields about you and your context help me reply with next steps. I read every
                      submission; you&apos;ll get a real response, not an automated string of emails.
                    </p>
                    <ul className="mt-5 space-y-3 text-left text-sm text-neutral-700">
                      <li className="flex gap-3">
                        <ListChecks className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                        <span>
                          Capture the basics—name, role, sector, and how to reach you—so I can follow up
                          helpfully.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <ListChecks className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                        <span>
                          Add extra context in the form if you can; the more I know, the more prepared I am
                          for our first call.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <ListChecks className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                        <span>
                          Ready to book before you type? Use the calendar on the left. Otherwise, I aim to
                          respond within 1 business day, always within 1–2.
                        </span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-6 w-full">
                      <Button
                        type="button"
                        size="lg"
                        className="tesoro-cta-gradient w-full rounded-xl font-semibold px-8 text-white"
                        onClick={() => {
                          setIntakeFormModalOpen(true);
                          trackEvent("intake", { action: "open_intake_modal" });
                        }}
                        data-testid="button-open-intake-modal"
                      >
                        Submit intake form
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <p className="text-xs text-neutral-500 mt-3 leading-snug max-w-prose text-left">
                        I usually reply within 1 business day, always within 1–2. I only use your details to
                        follow up and prepare for a conversation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Dialog open={intakeFormModalOpen} onOpenChange={setIntakeFormModalOpen}>
                <DialogContent
                  className={cn(
                    "max-h-[min(100dvh-1.5rem,56rem)] w-[min(100%-1.5rem,42rem)] max-w-2xl gap-0 p-0 overflow-hidden",
                    "border-0 bg-white shadow-xl sm:rounded-xl",
                    "public-form-light"
                  )}
                >
                  <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-4 pr-12 sm:pr-12">
                    <DialogHeader>
                      <DialogTitle className="text-base font-semibold text-neutral-900 sm:text-lg">
                        Request a call — your details
                      </DialogTitle>
                      <DialogDescription className="text-left text-sm text-neutral-600">
                        Add what you can. If you have time, expand the optional section for situation, budget,
                        and how you heard about me.
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  <form
                    onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}
                    className="max-h-[min(75dvh,46rem)] overflow-y-auto px-5 py-5"
                  >
                    <IntakeAboutYouFields showSectionTitle={false} />
                    <Collapsible
                      open={intakeDetailsOpen}
                      onOpenChange={(open) => {
                        setIntakeDetailsOpen(open);
                        if (open) userDismissedExtendedRef.current = false;
                        else userDismissedExtendedRef.current = true;
                      }}
                    >
                      <div className="border-t border-neutral-200/80 pt-4 mt-5">
                        <CollapsibleTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full h-auto min-h-12 py-2.5 text-neutral-600 gap-2 flex-col sm:flex-row"
                            data-testid="intake-expand-details"
                          >
                            <span className="inline-flex items-center gap-2">
                              <MoreHorizontal className="h-5 w-5 shrink-0" aria-hidden />
                              <span className="text-sm text-center sm:text-left leading-snug">
                                {intakeDetailsOpen
                                  ? "Hide full intake (optional details)"
                                  : "Add situation, budget & more (optional)"}
                              </span>
                            </span>
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-none">
                          <div className="pt-4 space-y-0">
                            <IntakeExtendedFields />
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                    {intakeModalSubmitFooter}
                  </form>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <form
              onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}
              className="space-y-8"
            >
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6 md:p-8">
                  <IntakeAboutYouFields />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6 md:p-8">
                  <IntakeSituationFields />
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6 md:p-8">
                  <IntakePracticalFields />
                </CardContent>
              </Card>
              <div className="pt-2">{submitFooter}</div>
            </form>
          )}
        </Form>

        {BOOKING_URL && (
          <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
            <DialogContent
              className={cn(
                "!fixed !inset-0 !z-50 !flex h-[100dvh] max-h-[100dvh] w-full !max-w-none !translate-x-0 !translate-y-0 flex-col gap-0 overflow-hidden p-0",
                "rounded-none border-0 shadow-2xl",
                "data-[state=open]:!slide-in-from-top-0 data-[state=closed]:!slide-out-to-top-0"
              )}
            >
              <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
                <DialogHeader className="shrink-0 space-y-0 border-b border-neutral-200 bg-neutral-50 px-4 py-3 pr-14 text-left">
                  <DialogTitle className="text-base sm:text-lg font-semibold text-neutral-900 pr-2">
                    Schedule your 30-minute call
                  </DialogTitle>
                  <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
                    {bookingUsesExternalWindow ? (
                      <>
                        Open Google&apos;s calendar in a new tab, then use &quot;I&apos;ve finished booking&quot;
                        below for a thank-you, resources, and client portal access.
                      </>
                    ) : (
                      <>
                        When you&apos;re done choosing a time, use &quot;I&apos;ve finished booking&quot; below
                        for a quick thank-you and a link to resources.
                      </>
                    )}
                  </p>
                  <DialogDescription className="sr-only">
                    Appointment scheduling. When complete, return using the control at the bottom of
                    the screen.
                  </DialogDescription>
                </DialogHeader>
                {bookingUsesExternalWindow ? (
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 overflow-y-auto bg-gradient-to-b from-white to-neutral-50/90 px-4 py-10 text-center sm:py-12">
                    <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
                      Google doesn&apos;t allow this booking page to display inside other websites (the area
                      would stay blank). Use the button to open the real scheduler, then return here
                      when you&apos;re done.
                    </p>
                    <Button
                      type="button"
                      size="lg"
                      className="tesoro-cta-gradient w-full max-w-sm rounded-xl font-semibold text-white"
                      onClick={openBookingPage}
                    >
                      Book in Google Calendar
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-600 underline underline-offset-2 inline-flex items-center gap-1"
                    >
                      Open in new tab
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                ) : (
                  <>
                    <iframe
                      title="Book a 30-minute call"
                      src={BOOKING_URL}
                      className="w-full min-h-[50vh] flex-1 border-0 bg-white"
                      allow="camera; microphone; fullscreen; payment; clipboard-read; clipboard-write"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="shrink-0 border-t border-neutral-200 bg-neutral-50 px-3 py-2 sm:px-4">
                      <p className="text-[11px] sm:text-xs text-neutral-500 text-center sm:text-left">
                        If the calendar doesn&apos;t load (some schedulers block embeds),{" "}
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-700 underline font-medium inline-flex items-center gap-0.5"
                        >
                          open in a new tab
                          <ExternalLink className="h-3 w-3" aria-hidden />
                        </a>
                        .
                      </p>
                    </div>
                  </>
                )}
                <div className="shrink-0 space-y-3 border-t border-neutral-200 bg-neutral-50 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2">
                    <Button type="button" variant="outline" onClick={() => setBookingModalOpen(false)}>
                      Close
                    </Button>
                    <Button
                      type="button"
                      className="tesoro-cta-gradient font-medium"
                      onClick={handleFinishedBooking}
                    >
                      I&apos;ve finished booking
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <footer className="border-t border-neutral-200 py-8 mt-12 text-center text-sm text-neutral-400">
          <p>
            Prefer to email directly?{" "}
            <a
              href="mailto:nathanielbaldock@gmail.com"
              className="text-neutral-600 hover:text-neutral-900 transition-colors underline"
            >
              nathanielbaldock@gmail.com
            </a>
          </p>
        </footer>
          </>
        )}
      </main>
    </div>
  );
}
