import type { AnchorHTMLAttributes, FocusEvent, MouseEvent } from "react";
import { Link } from "wouter";
import { prefetchRoute } from "@/lib/prefetch-route";

type PrefetchLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function PrefetchLink({
  href,
  onMouseEnter,
  onFocus,
  ...props
}: PrefetchLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        prefetchRoute(href);
        onMouseEnter?.(e);
      }}
      onFocus={(e: FocusEvent<HTMLAnchorElement>) => {
        prefetchRoute(href);
        onFocus?.(e);
      }}
    />
  );
}
