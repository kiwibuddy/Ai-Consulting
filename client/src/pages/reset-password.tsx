import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, ApiError } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isActivate, setIsActivate] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Extract token and intent from URL (e.g. portal activation one-time link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    setToken(urlToken);
    setIsActivate(params.get("intent") === "activate");
  }, []);

  const resetMutation = useMutation({
    mutationFn: async (data: { token: string; password: string }) => {
      return apiRequest<{ success: boolean; message: string }>("POST", "/api/auth/reset-password", data);
    },
    onSuccess: () => {
      const fromActivation =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("intent") === "activate";
      toast({
        title: fromActivation ? "Account activated" : "Password reset",
        description: fromActivation
          ? "You can now sign in with your new password."
          : "Your password has been reset successfully.",
      });
      navigate("/login", { replace: true });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof ApiError
          ? (err.body?.message ?? err.body?.error)
          : err instanceof Error
            ? err.message
            : null;
      toast({
        title: "Error",
        description: msg || "Failed to reset password. The link may have expired.",
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

  const passwordForm = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-stone-700">
          New password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-9 bg-white border-stone-200 focus:border-green-500 focus:ring-green-500"
            required
            minLength={8}
          />
        </div>
        <p className="text-xs text-stone-400">At least 8 characters</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-stone-700">
          Confirm password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-9 bg-white border-stone-200 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={resetMutation.isPending || !password || !confirmPassword}
        className="tesoro-cta-gradient w-full py-3 px-6 rounded-full font-semibold text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {resetMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {isActivate ? "Setting up…" : "Resetting…"}
          </>
        ) : isActivate ? (
          "Access my portal →"
        ) : (
          "Reset password"
        )}
      </button>
    </form>
  );

  // No token provided
  if (!token) {
    return (
      <div className="min-h-screen bg-stone-50">
        <header className="bg-white border-b border-stone-100">
          <div className="container mx-auto px-6 h-16 flex items-center">
            <Link href="/">
              <img src="/logo.png?v=2" alt="Nathaniel Baldock AI Consulting" className="h-9 w-auto" />
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-16 max-w-md">
          <Card className="border-stone-100 shadow-md">
            <CardContent className="p-8 text-center">
              <div className="rounded-full bg-red-50 p-4 w-fit mx-auto mb-6">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <h1 className="font-serif text-2xl font-bold mb-2 text-stone-900">Invalid link</h1>
              <p className="text-stone-500 mb-6">
                This link is invalid or has expired. Request a new one below.
              </p>
              <Link href="/forgot-password">
                <button className="tesoro-cta-gradient px-6 py-3 rounded-full font-semibold text-white text-sm">
                  Request new link
                </button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (isActivate) {
    return (
      <div className="min-h-screen bg-stone-50">
        {/* Green accent bar */}
        <div className="h-1 tesoro-cta-gradient" />
        {/* Header */}
        <header className="bg-white border-b border-stone-100">
          <div className="container mx-auto px-6 h-16 flex items-center">
            <Link href="/">
              <img src="/logo.png?v=2" alt="Nathaniel Baldock AI Consulting" className="h-9 w-auto" />
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-14 max-w-lg">
          {/* Welcome message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 mb-5">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-bold text-stone-900 mb-3">
              Welcome to your portal
            </h1>
            <p className="text-stone-500 text-base leading-relaxed max-w-sm mx-auto">
              Choose a password to open your private space — session notes, resources, and a direct line to Nathaniel, all in one place.
            </p>
          </div>

          {/* Form card */}
          <Card className="border-stone-100 shadow-md">
            <CardContent className="p-8">
              {passwordForm}
            </CardContent>
          </Card>

          <p className="text-center text-xs text-stone-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </main>
      </div>
    );
  }

  // Standard reset password flow
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Link href="/">
            <img src="/logo.png?v=2" alt="Nathaniel Baldock AI Consulting" className="h-9 w-auto" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-md">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-stone-500 hover:text-stone-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card className="border-stone-100 shadow-md">
          <CardContent className="p-8">
            <h1 className="font-serif text-2xl font-bold text-stone-900 mb-1">Set new password</h1>
            <p className="text-stone-500 text-sm mb-6">Enter your new password below.</p>
            {passwordForm}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
