import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, ArrowRight, ArrowLeft, User, FileText, Bell, Lock } from "lucide-react";

const ASSESSMENT_OPTIONS = [
  { id: "strengthsfinder", label: "StrengthsFinder / CliftonStrengths" },
  { id: "disc", label: "DISC Assessment" },
  { id: "mbti", label: "Myers-Briggs (MBTI)" },
  { id: "enneagram", label: "Enneagram" },
  { id: "eq", label: "Emotional Intelligence (EQ-i)" },
  { id: "other", label: "Other" },
];

const NOTIFICATION_TYPES = [
  { id: "sessionReminders", label: "Session Reminders", description: "Reminders before scheduled sessions" },
  { id: "newResources", label: "New Resources", description: "When your consultant shares new materials" },
  { id: "actionItemDue", label: "Action Item Due Dates", description: "Reminders when tasks are due" },
  { id: "weeklyDigest", label: "Weekly Digest", description: "Weekly summary of your consulting journey" },
];

interface ClientProfile {
  id?: string;
  userId?: string;
  goals?: string;
  location?: string;
  preferredMeetingFormat?: string;
  previousCoaching?: string;
  assessmentsTaken?: string;
  assessmentResults?: string;
  notificationPreferences?: string;
  profileCompleted?: boolean;
}

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string; // null for Google users
  googleId?: string; // present for Google users
}

interface NotificationPrefs {
  sessionReminders: { inApp: boolean; email: boolean };
  newResources: { inApp: boolean; email: boolean };
  actionItemDue: { inApp: boolean; email: boolean };
  weeklyDigest: { inApp: boolean; email: boolean };
}

const DEFAULT_NOTIF_PREFS: NotificationPrefs = {
  sessionReminders: { inApp: true, email: true },
  newResources: { inApp: true, email: true },
  actionItemDue: { inApp: true, email: true },
  weeklyDigest: { inApp: true, email: true },
};

export default function ClientCompleteProfile() {
  const [step, setStep] = useState(1);
  const totalSteps = 4; // Password, Info, Assessments, Notifications
  
  // Form state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [preferredMeetingFormat, setPreferredMeetingFormat] = useState("flexible");
  const [previousCoaching, setPreviousCoaching] = useState("");
  const [assessmentsTaken, setAssessmentsTaken] = useState<string[]>([]);
  const [assessmentResults, setAssessmentResults] = useState("");
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(DEFAULT_NOTIF_PREFS);
  
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get user data
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    queryFn: () => apiRequest("GET", "/api/auth/user"),
  });

  // Get existing profile
  const { data: profile, isLoading: profileLoading } = useQuery<ClientProfile>({
    queryKey: ["/api/client/profile"],
    queryFn: () => apiRequest("GET", "/api/client/profile"),
    retry: false,
  });

  // Check if this is a Google user (no password needed)
  const isGoogleUser = user?.googleId != null;

  // Skip password step for Google users
  useEffect(() => {
    if (isGoogleUser && step === 1) {
      setStep(2);
    }
  }, [isGoogleUser, step]);

  // Pre-populate from profile
  useEffect(() => {
    if (profile) {
      if (profile.location) setLocation(profile.location);
      if (profile.preferredMeetingFormat) setPreferredMeetingFormat(profile.preferredMeetingFormat);
      if (profile.previousCoaching) setPreviousCoaching(profile.previousCoaching);
      if (profile.assessmentsTaken) {
        try {
          setAssessmentsTaken(JSON.parse(profile.assessmentsTaken));
        } catch {
          // Ignore parse errors
        }
      }
      if (profile.assessmentResults) setAssessmentResults(profile.assessmentResults);
      if (profile.notificationPreferences) {
        try {
          const prefs = JSON.parse(profile.notificationPreferences);
          setNotificationPrefs({ ...DEFAULT_NOTIF_PREFS, ...prefs });
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [profile]);

  // Redirect if profile already completed
  useEffect(() => {
    if (profile?.profileCompleted) {
      navigate("/client");
    }
  }, [profile, navigate]);

  // Set password mutation
  const setPasswordMutation = useMutation({
    mutationFn: async (newPassword: string) => {
      return apiRequest("POST", "/api/auth/set-password", { password: newPassword });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  // Save profile mutation
  const saveProfileMutation = useMutation({
    mutationFn: async (data: Partial<ClientProfile>) => {
      return apiRequest("PATCH", "/api/client/profile", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/profile"] });
    },
  });

  // Complete profile mutation
  const completeMutation = useMutation({
    mutationFn: async () => {
      const data = {
        location,
        preferredMeetingFormat,
        previousCoaching,
        assessmentsTaken: JSON.stringify(assessmentsTaken),
        assessmentResults,
        notificationPreferences: JSON.stringify(notificationPrefs),
        profileCompleted: true,
      };
      return apiRequest("PATCH", "/api/client/profile", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/profile"] });
      toast({
        title: "Profile Complete!",
        description: "Welcome to your consulting portal!",
      });
      navigate("/client");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await setPasswordMutation.mutateAsync(password);
      setStep(2);
    } catch {
      toast({
        title: "Error",
        description: "Failed to set password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (step === 1 && !isGoogleUser) {
      handleSetPassword();
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };
  
  const prevStep = () => setStep((s) => Math.max(s - 1, isGoogleUser ? 2 : 1));

  const toggleNotifEmail = (key: keyof NotificationPrefs) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: { ...prev[key], email: !prev[key].email },
    }));
  };

  if (userLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {Array.from({ length: totalSteps }, (_, i) => i + 1)
            .filter(s => isGoogleUser ? s !== 1 : true)
            .map((s, idx, arr) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step > s
                      ? "bg-primary text-primary-foreground"
                      : s === step
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : s === 1 ? (
                    <Lock className="h-4 w-4" />
                  ) : s === 2 ? (
                    <User className="h-4 w-4" />
                  ) : s === 3 ? (
                    <FileText className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                </div>
                {idx < arr.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-1 rounded ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 1 && "Set Your Password"}
              {step === 2 && "Complete Your Profile"}
              {step === 3 && "Assessments & Background"}
              {step === 4 && "Notification Preferences"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Create a secure password for your account"}
              {step === 2 && "Tell us a bit about yourself"}
              {step === 3 && "Share your background (optional)"}
              {step === 4 && "Choose how you'd like to be notified"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Set Password (email/password users only) */}
            {step === 1 && !isGoogleUser && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    You'll use this password along with your email ({user?.email}) to sign in.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    At least 8 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Profile Info */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Meeting Format</Label>
                  <RadioGroup
                    value={preferredMeetingFormat}
                    onValueChange={setPreferredMeetingFormat}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in_person" id="pref_in_person" />
                      <Label htmlFor="pref_in_person" className="cursor-pointer">In-person sessions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video_zoom" id="pref_zoom" />
                      <Label htmlFor="pref_zoom" className="cursor-pointer">Video (Zoom)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video_meet" id="pref_meet" />
                      <Label htmlFor="pref_meet" className="cursor-pointer">Video (Google Meet)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flexible" id="pref_flexible" />
                      <Label htmlFor="pref_flexible" className="cursor-pointer">Flexible / No preference</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Assessments */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="previousCoaching">Previous Coaching Experience</Label>
                  <Textarea
                    id="previousCoaching"
                    placeholder="Have you worked with a consultant before? What was helpful?"
                    value={previousCoaching}
                    onChange={(e) => setPreviousCoaching(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Assessments Taken</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Select any assessments you've completed (optional)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {ASSESSMENT_OPTIONS.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 space-y-0">
                        <Checkbox
                          id={`assessment_${item.id}`}
                          checked={assessmentsTaken.includes(item.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAssessmentsTaken([...assessmentsTaken, item.id]);
                            } else {
                              setAssessmentsTaken(assessmentsTaken.filter((v) => v !== item.id));
                            }
                          }}
                        />
                        <Label htmlFor={`assessment_${item.id}`} className="text-sm font-normal cursor-pointer">
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {assessmentsTaken.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="assessmentResults">Assessment Results</Label>
                    <Textarea
                      id="assessmentResults"
                      placeholder="Share any relevant background—organisation type, sector, or prior AI/consulting experience."
                      value={assessmentResults}
                      onChange={(e) => setAssessmentResults(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Notification Preferences */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  All notifications appear in-app. Choose which ones should also be sent to your email.
                </p>
                
                <div className="space-y-3">
                  {NOTIFICATION_TYPES.map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium text-sm">{notif.label}</p>
                        <p className="text-xs text-muted-foreground">{notif.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Email</span>
                        <Switch
                          checked={notificationPrefs[notif.id as keyof NotificationPrefs].email}
                          onCheckedChange={() => toggleNotifEmail(notif.id as keyof NotificationPrefs)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {step > (isGoogleUser ? 2 : 1) ? (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < totalSteps ? (
                <Button 
                  onClick={nextStep}
                  disabled={step === 1 && !isGoogleUser && setPasswordMutation.isPending}
                >
                  {step === 1 && !isGoogleUser && setPasswordMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => completeMutation.mutate()}
                  disabled={completeMutation.isPending}
                >
                  {completeMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Finishing...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skip option */}
        <div className="text-center mt-4">
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => {
              saveProfileMutation.mutate({ profileCompleted: true });
              navigate("/client");
            }}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
