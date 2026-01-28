import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "../../../shared/models/auth";

interface UserAvatarProps {
  user: User | null;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U"
    : "?";

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || "User"} />
      <AvatarFallback className="bg-primary/10 text-primary font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
