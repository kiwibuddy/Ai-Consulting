import { Redirect } from "wouter";
import { useForm, Controller } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ArrowRight, Loader2, Mic2, CalendarDays, Users } from "lucide-react";

const EVENT_TYPE_OPTIONS = [
  { value: "sunday_service", label: "Sunday service / chapel" },
  { value: "conference_keynote", label: "Conference keynote" },
  { value: "workshop_half", label: "Half-day workshop" },
  { value: "workshop_full", label: "Full-day workshop" },
  { value: "retreat", label: "Retreat (multi-session)" },
  { value: "seminar", label: "Seminar / training session" },
  { value: "school_assembly", label: "School assembly" },
  { value: "panel", label: "Panel / Q&A" },
  { value: "other", label: "Other" },
];

const AUDIENCE_TYPE_OPTIONS = [
  { value: "church_congregation", label: "Church congregation" },
  { value: "pastors_leaders", label: "Pastors & church leaders" },
  { value: "youth", label: "Youth / young adults" },
  { value: "mission_workers", label: "Mission workers" },
  { value: "educators", label: "Teachers / educators" },
  { value: "students", label: "Students" },
  { value: "parents_families", label: "Parents & families" },
  { value: "nonprofit_staff", label: "Nonprofit / NGO staff" },
  { value: "mixed", label: "Mixed / general" },
];

const AUDIENCE_SIZE_OPTIONS = [
  { value: "under_30", label: "Under 30" },
  { value: "30_100", label: "30 – 100" },
  { value: "100_300", label: "100 – 300" },
  { value: "300_plus", label: "300+" },
  { value: "unsure", label: "Not sure yet" },
];

const BUDGET_OPTIONS = [
  { value: "honorarium", label: "Honorarium (we'll offer what we can)" },
  { value: "under_500", label: "Under $500 NZD" },
  { value: "500_1500", label: "$500 – $1,500 NZD" },
  { value: "1500_3000", label: "$1,500 – $3,000 NZD" },
  { value: "3000_plus", label: "$3,000+ NZD" },
  { value: "discuss", label: "Let's discuss" },
];

const TOPIC_OPTIONS = [
  { id: "ai_church", label: "AI & the Church — practical tools and ethical wisdom" },
  { id: "ai_families", label: "AI & Families — raising kids in an AI world" },
  { id: "fully_human", label: "Being Fully Human in an AI Age — identity, purpose, creativity" },
  { id: "ai_mission", label: "AI for Mission — leveraging technology for kingdom impact" },
  { id: "ai_practical", label: "Hands-on AI Workshop — live demos and team exercises" },
  { id: "custom", label: "Custom topic — tell me what you need" },
];

const HOW_HEARD_OPTIONS = [
  { value: "friend", label: "Friend or colleague" },
  { value: "church", label: "Through my church / network" },
  { value: "social", label: "Social media" },
  { value: "search", label: "Web search" },
  { value: "previous_event", label: "Heard me speak before" },
  { value: "other", label: "Other" },
];

const speakingInviteSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organisation: z.string().min(2, "Organisation name is required"),
  role: z.string().optional(),
  eventName: z.string().optional(),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().optional(),
  eventLocation: z.string().optional(),
  isVirtual: z.boolean().optional(),
  audienceType: z.string().optional(),
  audienceSize: z.string().optional(),
  topicInterests: z.array(z.string()).optional(),
  topicNotes: z.string().optional(),
  budgetRange: z.string().optional(),
  travelCovered: z.boolean().optional(),
  additionalNotes: z.string().optional(),
  howDidYouHear: z.string().optional(),
});

type SpeakingInviteValues = z.infer<typeof speakingInviteSchema>;

function buildIntakePayload(data: SpeakingInviteValues) {
  const problemStatement = [
    `Event: ${data.eventName || data.eventType}`,
    `Date: ${data.eventDate || "TBD"}`,
    `Location: ${data.eventLocation || "TBD"}${data.isVirtual ? " (virtual option)" : ""}`,
    `Audience: ${data.audienceType || "Not specified"} (${data.audienceSize || "size TBD"})`,
    `Topics: ${data.topicInterests?.join(", ") || "Not specified"}`,
    data.topicNotes ? `Notes: ${data.topicNotes}` : "",
    data.travelCovered ? "Travel: covered by host" : "",
    data.additionalNotes ? `Additional: ${data.additionalNotes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || undefined,
    organisation: data.organisation,
    role: data.role || undefined,
    industry: "speaking_invitation" as const,
    problemStatement,
    budgetRange: data.budgetRange || undefined,
    howDidYouHear: data.howDidYouHear || undefined,
  };
}

/** Form content only; used by the combined intake page with the sliding switcher. */
export function SpeakingFormContent({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();

  const form = useForm<SpeakingInviteValues>({
    resolver: zodResolver(speakingInviteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organisation: "",
      role: "",
      eventName: "",
      eventType: "",
      eventDate: "",
      eventLocation: "",
      isVirtual: false,
      audienceType: "",
      audienceSize: "",
      topicInterests: [],
      topicNotes: "",
      budgetRange: "",
      travelCovered: false,
      additionalNotes: "",
      howDidYouHear: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: SpeakingInviteValues) => {
      return apiRequest("POST", "/api/intake", buildIntakePayload(data));
    },
    onSuccess: () => {
      trackEvent("form_submit", { form_name: "speaking_invitation" });
      toast({
        title: "Invitation received!",
        description: "I'll be in touch within 1–2 business days.",
      });
      form.reset();
      onSuccess();
    },
    onError: (err: unknown) => {
      if (import.meta.env.DEV) console.error("Speaking invite form error:", err);
      const serverMsg = err instanceof ApiError ? err.body?.message ?? err.body?.error : null;
      const description = serverMsg ?? "Please try again, or email me directly.";
      toast({
        title: "Something went wrong",
        description,
        variant: "destructive",
      });
    },
  });

  return (
    <>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Invite me to speak
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            I'd love to hear about your event. Fill in what you can below and
            I'll get back to you within 1–2 business days. If we're a good fit,
            we'll hop on a quick call to finalise the details.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mb-10 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Mic2 className="h-4 w-4 text-neutral-400" />
            Keynotes, workshops & retreats
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-neutral-400" />
            In-person or virtual
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-neutral-400" />
            Flexible on budget & format
          </span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}
            className="space-y-8"
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-neutral-900">Your details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <Controller
                    control={form.control}
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
                    control={form.control}
                    name="organisation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organisation / church *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Grace Community Church" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your role</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Events Coordinator" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-neutral-900">About the event</h2>

                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Annual Leaders' Retreat 2026" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EVENT_TYPE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred date(s)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="e.g. March 15, 2026 or 'mid-March'"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eventLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Auckland, NZ" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isVirtual"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0 font-normal text-neutral-600">
                        This event is virtual or has a virtual option
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="audienceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who's the audience?</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AUDIENCE_TYPE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="audienceSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected attendance</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AUDIENCE_SIZE_OPTIONS.map((opt) => (
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
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-neutral-900">Topic preferences</h2>
                <p className="text-sm text-neutral-500 -mt-2">
                  Select any that interest you — I'll tailor the content to your audience. Or suggest your own.
                </p>

                <FormField
                  control={form.control}
                  name="topicInterests"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        {TOPIC_OPTIONS.map((topic) => (
                          <FormField
                            key={topic.id}
                            control={form.control}
                            name="topicInterests"
                            render={({ field }) => (
                              <FormItem className="flex items-start gap-2.5">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(topic.id)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, topic.id]);
                                      } else {
                                        field.onChange(current.filter((v) => v !== topic.id));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="!mt-0 font-normal text-neutral-700 leading-snug">
                                  {topic.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topicNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anything else about what you're looking for?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. We'd love a practical workshop where people can try AI tools hands-on. Our audience is mostly 40–65 and not very tech-savvy."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-neutral-900">Practical details</h2>

                <FormField
                  control={form.control}
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaker budget</FormLabel>
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
                        I offer flexible pricing and community rates for smaller churches and
                        volunteer-run organisations. Don't let budget stop you from reaching out.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelCovered"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0 font-normal text-neutral-600">
                        We can cover travel and accommodation costs
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anything else I should know?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. Other speakers at the event, specific time slot, AV setup, recording permissions…"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-xs text-neutral-400 max-w-sm">
                I'll respond within 1–2 business days. If it looks like a good fit, we'll arrange a
                quick call to finalise everything.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={submitMutation.isPending}
                className="tesoro-cta-gradient text-white font-medium rounded-lg w-full sm:w-auto"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send invitation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>

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
  );
}

/** Redirect /speaking/invite to combined intake page with speaking form selected. */
export default function SpeakingInvitePage() {
  return <Redirect to="/intake?form=speaking" />;
}
