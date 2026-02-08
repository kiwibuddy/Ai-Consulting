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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Sparkles, CheckCircle, Loader2, MapPin, Video, Users } from "lucide-react";

const ASSESSMENT_OPTIONS = [
  { id: "strengthsfinder", label: "StrengthsFinder / CliftonStrengths" },
  { id: "disc", label: "DISC Assessment" },
  { id: "mbti", label: "Myers-Briggs (MBTI)" },
  { id: "enneagram", label: "Enneagram" },
  { id: "eq", label: "Emotional Intelligence (EQ-i)" },
  { id: "other", label: "Other" },
];

const intakeFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  preferredMeetingFormat: z.string().optional(),
  goals: z.string().min(20, "Please describe your goals in at least 20 characters"),
  previousCoachingExperience: z.string().optional(),
  assessmentsTaken: z.array(z.string()).optional(),
  assessmentResults: z.string().optional(),
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
      preferredMeetingFormat: "flexible",
      goals: "",
      previousCoachingExperience: "",
      assessmentsTaken: [],
      assessmentResults: "",
      availability: "",
      howDidYouHear: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: IntakeFormValues) => {
      return apiRequest("POST", "/api/intake", data);
    },
    onSuccess: () => {
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
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">Nathaniel Baldock AI Consulting</span>
            </div>
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <Input type="tel" placeholder="+1 (555) 000-0000" {...field} data-testid="input-phone" />
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
                        <Input placeholder="City, State, Country" {...field} data-testid="input-location" />
                      </FormControl>
                      <FormDescription>
                        Where are you based?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredMeetingFormat"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred Meeting Format</FormLabel>
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
                              In-person sessions
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
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you hoping to achieve with AI? (Your context and goals) *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your organisation, your goals for AI adoption, and any constraints (e.g. faith, education, nonprofit, safeguarding)."
                          className="min-h-[120px]"
                          {...field}
                          data-testid="textarea-goals"
                        />
                      </FormControl>
                      <FormDescription>
                        Share your context—sector, use cases, and what success would look like.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previousCoachingExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous AI or consulting experience (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Have you used AI tools or worked with a consultant before? Any relevant experience or constraints to share."
                          className="min-h-[80px]"
                          {...field}
                          data-testid="textarea-experience"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assessmentsTaken"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Relevant background (optional)</FormLabel>
                        <FormDescription>
                          Select any that apply to your context
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {ASSESSMENT_OPTIONS.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="assessmentsTaken"
                            render={({ field }) => (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      const current = field.value || [];
                                      if (checked) {
                                        field.onChange([...current, item.id]);
                                      } else {
                                        field.onChange(current.filter((v) => v !== item.id));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assessmentResults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any other context (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Anything else that would help—team size, current tools, timeline, or specific concerns."
                          className="min-h-[80px]"
                          {...field}
                          data-testid="textarea-assessment-results"
                        />
                      </FormControl>
                      <FormDescription>
                        We can also discuss this during our first conversation.
                      </FormDescription>
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
                            <SelectValue placeholder="Select your preferred time slots" />
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
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="google">Google Search</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="referral">Referral from a friend</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
