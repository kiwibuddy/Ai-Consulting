import { forwardRef, type ComponentProps } from "react";
import { Link } from "wouter";
import { prefetchRoute } from "@/lib/prefetch-route";

type WouterLinkProps = ComponentProps<typeof Link>;

export const PrefetchLink = forwardRef<HTMLAnchorElement, WouterLinkProps>(
  function PrefetchLink({ href = "", onMouseEnter, ...props }, ref) {
    const path = typeof href === "string" ? href : "";

    return (
      <Link
        ref={ref}
        href={href}
        {...props}
        onMouseEnter={(e) => {
          prefetchRoute(path);
          onMouseEnter?.(e);
        }}
        onFocus={(e) => {
          prefetchRoute(path);
          props.onFocus?.(e);
        }}
      />
    );
  },
);
