import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/site-header";
import { PageSEO } from "@/components/page-seo";
import { CheckCircle } from "lucide-react";

const learningOptions = [
  { id: "small_group", label: "Small in-person group" },
  { id: "online_zoom", label: "Online Zoom sessions" },
  {
    id: "youtube_plus_help",
    label: "Curated YouTube videos with personal help applying it",
  },
  { id: "weekly_updates", label: "Weekly updates on the most important AI news" },
] as const;

const surveySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  aiConcerns: z
    .string()
    .min(5, "A short sentence is helpful")
    .max(2000, "Please keep this under 2,000 characters"),
  aiWishlist: z
    .string()
    .min(5, "A short sentence is helpful")
    .max(2000, "Please keep this under 2,000 characters"),
  learningPreferences: z
    .array(z.string())
    .min(1, "Choose at least one way you'd like to learn"),
  otherLearningMethod: z.string().max(2000).optional().or(z.literal("")),
  interestedInUpdates: z.boolean().optional(),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

export default function SurveyPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      aiConcerns: "",
      aiWishlist: "",
      learningPreferences: [],
      otherLearningMethod: "",
      interestedInUpdates: true,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: SurveyFormValues) => {
      return apiRequest("POST", "/api/survey", values);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err: unknown) => {
      if (import.meta.env.DEV) console.error("Survey submit error:", err);
      const serverMsg = err instanceof ApiError ? err.body?.message ?? err.body?.error : null;
      toast({
        title: "Something went wrong",
        description: serverMsg ?? "Please try again, or email me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: SurveyFormValues) => {
    submitMutation.mutate(values);
  };

  if (submitted) {
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
                Thank you for sharing
              </h1>
              <p className="text-neutral-600 mb-4">
                Your answers are a real gift. I&apos;ll read them personally and use them to shape
                future resources and courses.
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                In the meantime, you can explore articles and resources I&apos;ve already started
                putting together:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">Back to home</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resources">Browse resources</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedLearning = form.watch("learningPreferences");
  const showOtherField = selectedLearning.includes("other");

  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <PageSEO
        title="AI Knowledge Bank — Quick 3-Question Survey"
        description="Answer three short questions to share how you're feeling about AI and where you'd most love help."
      />
      <SiteHeader />
      <main className="pt-28 pb-16 px-4">
        <section className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase mb-2">
              AI Knowledge Bank
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
              Three quick questions to shape future courses
            </h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              I&apos;m designing practical, faith-shaped ways to help people use AI wisely. Your
              honest answers here will directly shape what I build next — and how I serve people
              like you.
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="First name"
                              autoComplete="given-name"
                              className="bg-white text-neutral-900 placeholder:text-neutral-500"
                              {...field}
                            />
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
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Last name"
                              autoComplete="family-name"
                              className="bg-white text-neutral-900 placeholder:text-neutral-500"
                              {...field}
                            />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="bg-white text-neutral-900 placeholder:text-neutral-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aiConcerns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          1. What&apos;s one thing about AI you wish you understood better — or that
                          honestly kind of worries you?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="It could be a fear, a confusion, or just something you keep wondering about..."
                            rows={4}
                            className="bg-white text-neutral-900 placeholder:text-neutral-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aiWishlist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          2. If you could magically use AI to help in your life, work, family, or
                          ministry, what would you most love it to do?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Think about a real burden, need, or task where wise use of AI would feel like a gift..."
                            rows={4}
                            className="bg-white text-neutral-900 placeholder:text-neutral-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="learningPreferences"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          3. What would be the best way for you to learn this?
                        </FormLabel>
                        <div className="space-y-3">
                          {learningOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="learningPreferences"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          const value = field.value || [];
                                          if (checked) {
                                            field.onChange([...value, option.id]);
                                          } else {
                                            field.onChange(value.filter((v) => v !== option.id));
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}

                          <FormField
                            control={form.control}
                            name="learningPreferences"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes("other")}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked && !value.includes("other")) {
                                        field.onChange([...value, "other"]);
                                      } else if (!checked) {
                                        field.onChange(value.filter((v) => v !== "other"));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Other (add your own idea below)
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {showOtherField && (
                    <FormField
                      control={form.control}
                      name="otherLearningMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other learning ideas</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any other way you would love to learn or be supported..."
                              rows={3}
                              className="bg-white text-neutral-900 placeholder:text-neutral-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="interestedInUpdates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(checked) => field.onChange(!!checked)}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            I&apos;d like to hear about future courses or resources if they could
                            help with what I shared.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <p className="text-xs text-neutral-500 max-w-sm">
                      Your responses are confidential and will only be used to shape resources and
                      courses that serve people like you. You can opt out of updates at any time.
                    </p>
                    <Button
                      type="submit"
                      className="tesoro-cta-gradient text-neutral-900 font-semibold px-6"
                      disabled={submitMutation.isLoading}
                    >
                      {submitMutation.isLoading ? "Sending..." : "Submit survey"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

