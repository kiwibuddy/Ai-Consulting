import { Link, useLocation } from "wouter";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { SiteHeader } from "@/components/site-header";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  Clock,
  MessageCircle,
  Shield,
  Mic2,
} from "lucide-react";
import { SpeakingFormContent } from "@/pages/speaking-invite";

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
      setSubmittedForm("consultation");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again, or email me directly.",
        variant: "destructive",
      });
    },
  });

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
      <SiteHeader />
      <main className="public-form-light max-w-3xl mx-auto px-6 pt-28 pb-12 md:pb-16">
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
            Request a free discovery call
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Tell me a little about your situation and I'll be in touch to
            arrange a 30-minute conversation — no obligation, no sales pitch.
            We'll explore whether I can help and what that might look like.
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))}
            className="space-y-8"
          >
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-neutral-900">
                  About you
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                  control={form.control}
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
                    control={form.control}
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
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sector</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Your situation
                </h2>
                <p className="text-sm text-neutral-500 -mt-2">
                  Just enough for me to prepare — we'll explore the details
                  together on the call.
                </p>

                <FormField
                  control={form.control}
                  name="problemStatement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What are you hoping to get help with?
                      </FormLabel>
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
                  control={form.control}
                  name="currentAiUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Where are you at with AI currently?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Practical details
                </h2>

                <FormField
                  control={form.control}
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you have a budget range in mind?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                        No pressure — this just helps me suggest the right
                        starting point. Community pricing is available.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="howDidYouHear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you hear about me?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                I'll respond within 1–2 business days. Your information is only
                used to arrange and prepare for our conversation.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={submitMutation.isPending}
                className="tesoro-cta-gradient text-white font-medium rounded-lg w-full sm:w-auto"
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
        )}
      </main>
    </div>
  );
}
