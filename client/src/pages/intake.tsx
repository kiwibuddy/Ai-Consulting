import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, CheckCircle, Loader2, MapPin, Video, Users, Building2, Target, Cpu, Calendar } from "lucide-react";

const INDUSTRY_OPTIONS = [
  { value: "faith_mission", label: "Faith & Mission" },
  { value: "education", label: "Education" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "other", label: "Other" },
];

const AI_USAGE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "experimenting", label: "Experimenting" },
  { value: "in_production", label: "In production" },
];

const BUDGET_OPTIONS = [
  { value: "not_sure", label: "Not sure" },
  { value: "under_5k", label: "Under $5,000" },
  { value: "5k_15k", label: "$5,000 – $15,000" },
  { value: "15k_50k", label: "$15,000 – $50,000" },
  { value: "50k_plus", label: "$50,000+" },
  { value: "custom", label: "Custom / Discuss" },
];

const intakeFormSchema = z.object({
  // Section A: Contact & Organization
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  organisation: z.string().optional(),
  industry: z.string().optional(),
  role: z.string().optional(),
  // Section B: Problem statement
  problemStatement: z.string().min(100, "Please describe your problems in at least 100 characters"),
  currentSituation: z.string().optional(),
  painPoints: z.string().optional(),
  // Section C: Goals & outcomes
  shortTermGoals: z.string().optional(),
  longTermGoals: z.string().optional(),
  successMetrics: z.string().optional(),
  // Section D: Technical & constraints
  currentAiUsage: z.string().optional(),
  dataSecurityNotes: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  // Section E: Logistics
  preferredMeetingFormat: z.string().optional(),
  availability: z.string().optional(),
  howDidYouHear: z.string().optional(),
});

type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export default function IntakePage() {
  const { toast } = useToast();

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      organisation: "",
      industry: "",
      role: "",
      problemStatement: "",
      currentSituation: "",
      painPoints: "",
      shortTermGoals: "",
      longTermGoals: "",
      successMetrics: "",
      currentAiUsage: "",
      dataSecurityNotes: "",
      budgetRange: "",
      timeline: "",
      preferredMeetingFormat: "flexible",
      availability: "",
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
        title: "Application Submitted",
        description: "Thank you! We'll review your application and get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: IntakeFormValues) => {
    submitMutation.mutate(data);
  };

  if (submitMutation.isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 w-fit mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="font-serif text-2xl font-bold mb-2">Application Received</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in a consultation! We've received your request
              and will review it shortly. You'll hear from Nathaniel within 1-2 business days.
            </p>
            <Link href="/">
              <Button variant="outline" data-testid="button-back-home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Nathaniel Baldock AI Consulting"
              className="h-8 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Request a Consultation</CardTitle>
            <CardDescription>
              Fill out this form to request a consultation and learn how AI consulting can help
              your organisation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Section A: Contact & Organization */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Contact & Organization
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} data-testid="input-firstname" />
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
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} data-testid="input-lastname" />
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
                          <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+64 21 123 4567" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <MapPin className="inline h-4 w-4 mr-1" />
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organisation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization / Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mission Foundation" {...field} data-testid="input-organisation" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry / sector</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-industry">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INDUSTRY_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                            <Input placeholder="e.g. Executive Director" {...field} data-testid="input-role" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section B: Problem Statement */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Problem Statement
                  </h3>
                  <FormField
                    control={form.control}
                    name="problemStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What problems are you hoping AI can help solve? *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the key challenges you're facing—operational bottlenecks, scaling issues, content creation, data analysis, outreach, etc. (At least 100 characters)"
                            className="min-h-[120px]"
                            {...field}
                            data-testid="textarea-problem"
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum 100 characters. Be as specific as you can.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentSituation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe your current situation</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What tools are you using? Any bottlenecks or struggling KPIs?"
                            className="min-h-[80px]"
                            {...field}
                            data-testid="textarea-situation"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="painPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Top 3 operational pain points</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List your main pain points (one per line)"
                            className="min-h-[60px]"
                            {...field}
                            data-testid="textarea-painpoints"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Section C: Goals & Outcomes */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Goals & Outcomes
                  </h3>
                  <FormField
                    control={form.control}
                    name="shortTermGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short-term goals (3–6 months)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What does success look like in the next few months?"
                            className="min-h-[80px]"
                            {...field}
                            data-testid="textarea-shortterm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longTermGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Long-term vision (12–24 months)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Strategic AI objectives"
                            className="min-h-[80px]"
                            {...field}
                            data-testid="textarea-longterm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="successMetrics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Success metrics</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cost savings, time saved, reach, engagement, etc."
                            className="min-h-[60px]"
                            {...field}
                            data-testid="textarea-metrics"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Section D: Technical & Constraints */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    Technical & Constraints
                  </h3>
                  <FormField
                    control={form.control}
                    name="currentAiUsage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current AI usage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-ai-usage">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AI_USAGE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataSecurityNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data security or compliance requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g. GDPR, theological guardrails, safeguarding, data residency"
                            className="min-h-[60px]"
                            {...field}
                            data-testid="textarea-security"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budgetRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-budget">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {BUDGET_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline</FormLabel>
                          <FormControl>
                            <Input placeholder="When to start?" {...field} data-testid="input-timeline" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Section E: Logistics */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Logistics
                  </h3>
                  <FormField
                    control={form.control}
                    name="preferredMeetingFormat"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Preferred meeting format</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="in_person" id="in_person" />
                              <Label htmlFor="in_person" className="flex items-center cursor-pointer">
                                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                In-person
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="video_zoom" id="video_zoom" />
                              <Label htmlFor="video_zoom" className="flex items-center cursor-pointer">
                                <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                                Video (Zoom)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="video_meet" id="video_meet" />
                              <Label htmlFor="video_meet" className="flex items-center cursor-pointer">
                                <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                                Video (Google Meet)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="flexible" id="flexible" />
                              <Label htmlFor="flexible" className="cursor-pointer">
                                Flexible / No preference
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred availability</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-availability">
                              <SelectValue placeholder="Select time slots" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mornings">Mornings (8am - 12pm)</SelectItem>
                            <SelectItem value="afternoons">Afternoons (12pm - 5pm)</SelectItem>
                            <SelectItem value="evenings">Evenings (5pm - 8pm)</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="howDidYouHear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you hear about us?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-referral">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="google">Google Search</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="referral">Referral</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
