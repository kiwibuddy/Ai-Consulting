import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { UserAvatar } from "@/components/user-avatar";
import { FormSkeleton } from "@/components/loading-skeleton";
import { TimezoneSelector } from "@/components/timezone-selector";
import type { ClientProfile } from "@shared/schema";
import { User, Bell, Shield, Loader2, Trash2, Globe } from "lucide-react";

const profileSchema = z.object({
  phone: z.string().optional(),
  goals: z.string().optional(),
  preferredContactMethod: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ClientProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery<ClientProfile>({
    queryKey: ["/api/client/profile"],
  });

  const updateTimezone = useMutation({
    mutationFn: async (timezone: string) => {
      return apiRequest("PATCH", "/api/user/timezone", { timezone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Timezone Updated",
        description: "Your timezone has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update timezone. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: profile?.phone || "",
      goals: profile?.goals || "",
      preferredContactMethod: profile?.preferredContactMethod || "email",
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      return apiRequest("PATCH", "/api/client/profile", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/profile"] });
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const requestDeletion = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/client/request-deletion", {});
    },
    onSuccess: () => {
      toast({
        title: "Deletion Request Submitted",
        description: "Your account deletion request has been submitted. We'll process it within 30 days.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit deletion request. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account Information
              </CardTitle>
              <CardDescription>Your personal account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <UserAvatar user={user} className="h-16 w-16" />
                <div>
                  <p className="font-semibold text-lg">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => updateProfile.mutate(data))} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredContactMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-contact">
                              <SelectValue placeholder="Select contact method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coaching Goals</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What are you working towards?"
                            className="min-h-[100px]"
                            {...field}
                            data-testid="textarea-goals"
                          />
                        </FormControl>
                        <FormDescription>
                          Share your current goals to help your coach understand your focus.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={updateProfile.isPending} data-testid="button-save-profile">
                    {updateProfile.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Data & Privacy
              </CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Your Data Rights</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Under GDPR, you have the right to request access to, correction of, or deletion of your personal data.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" data-testid="button-export-data">
                    Export My Data
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="rounded-lg border border-red-200 dark:border-red-900 p-4 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">Delete Account</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Requesting account deletion will remove all your data. This action cannot be undone.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" data-testid="button-delete-account">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Request Account Deletion
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers within 30 days.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => requestDeletion.mutate()}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Yes, delete my account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timezone Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Timezone
              </CardTitle>
              <CardDescription>Set your local timezone for accurate session scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <TimezoneSelector
                value={user?.timezone || "UTC"}
                onChange={(timezone) => updateTimezone.mutate(timezone)}
                disabled={updateTimezone.isPending}
              />
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Session Reminders</p>
                  <p className="text-xs text-muted-foreground">Get notified before sessions</p>
                </div>
                <Switch defaultChecked data-testid="switch-session-reminders" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">New Resources</p>
                  <p className="text-xs text-muted-foreground">When new resources are shared</p>
                </div>
                <Switch defaultChecked data-testid="switch-new-resources" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Action Item Due</p>
                  <p className="text-xs text-muted-foreground">Before action items are due</p>
                </div>
                <Switch defaultChecked data-testid="switch-action-due" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Digest</p>
                  <p className="text-xs text-muted-foreground">Weekly summary email</p>
                </div>
                <Switch data-testid="switch-email-digest" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
