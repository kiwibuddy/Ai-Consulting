import { useEffect } from "react";

export default function PresentationContactPage() {
  useEffect(() => {
    window.location.replace("/presentations/contact.html");
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <p className="text-sm text-muted-foreground">
        Redirecting to presentation contact page...
      </p>
      <a className="underline" href="/presentations/contact.html">
        Continue
      </a>
    </div>
  );
}
