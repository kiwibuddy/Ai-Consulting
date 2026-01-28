import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, ArrowLeft, Lock, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Extract token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    setToken(urlToken);
  }, []);

  const resetMutation = useMutation({
    mutationFn: async (data: { token: string; password: string }) => {
      return apiRequest<{ success: boolean; message: string }>("POST", "/api/auth/reset-password", data);
    },
    onSuccess: () => {
      setSuccess(true);
      toast({
        title: "Password Reset",
        description: "Your password has been reset successfully.",
      });
    },
    onError: (err: Error & { message?: string }) => {
      toast({
        title: "Error",
        description: err.message || "Failed to reset password. The link may have expired.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    if (token) {
      resetMutation.mutate({ token, password });
    }
  };

  // No token provided
  if (!token) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="font-serif text-xl font-bold">Holger Coaching</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-md">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4 w-fit mx-auto mb-6">
                <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="font-serif text-2xl font-bold mb-2">Invalid Reset Link</h1>
              <p className="text-muted-foreground mb-6">
                This password reset link is invalid or has expired.
              </p>
              <Link href="/forgot-password">
                <Button>Request New Reset Link</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
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
              <span className="font-serif text-xl font-bold">Holger Coaching</span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-md">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Set New Password</CardTitle>
            <CardDescription>
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center py-4">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium mb-2">Password Reset Complete</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your password has been reset successfully. You can now sign in with your new password.
                </p>
                <Link href="/">
                  <Button>Go to Sign In</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9"
                      required
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">At least 8 characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={resetMutation.isPending || !password || !confirmPassword}
                >
                  {resetMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
