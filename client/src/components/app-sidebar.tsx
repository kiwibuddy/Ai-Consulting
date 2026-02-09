import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Target,
  User,
  Users,
  UserPlus,
  Calculator,
  LogOut,
  ChevronUp,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { PWAInstallBanner } from "@/components/pwa-install-button";

interface SidebarProps {
  role: "client" | "coach";
}

const clientNavItems = [
  { title: "Dashboard", url: "/client", icon: LayoutDashboard, tourId: "dashboard" },
  { title: "Consultations", url: "/client/sessions", icon: Calendar, tourId: "sessions" },
  { title: "Resources", url: "/client/resources", icon: FileText, tourId: "resources" },
  { title: "Action Items", url: "/client/actions", icon: Target, tourId: "actions" },
  { title: "Billing", url: "/client/billing", icon: CreditCard, tourId: "billing" },
  { title: "Profile", url: "/client/profile", icon: User, tourId: "profile" },
];

const consultantNavItems = [
  { title: "Dashboard", url: "/consultant", icon: LayoutDashboard, tourId: "dashboard" },
  { title: "Clients", url: "/consultant/clients", icon: Users, tourId: "clients" },
  { title: "Consultations", url: "/consultant/sessions", icon: Calendar, tourId: "sessions" },
  { title: "Resources", url: "/consultant/resources", icon: FileText, tourId: "resources" },
  { title: "Consultation Requests", url: "/consultant/intake", icon: UserPlus, tourId: "intake" },
  { title: "Billing", url: "/consultant/billing", icon: CreditCard, tourId: "billing" },
  { title: "Analytics", url: "/consultant/analytics", icon: BarChart3, tourId: "analytics" },
  { title: "Pricing Calculator", url: "/consultant/calculator", icon: Calculator, tourId: "calculator" },
];

export function AppSidebar({ role }: SidebarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navItems = role === "coach" ? consultantNavItems : clientNavItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href={role === "coach" ? "/consultant" : "/client"}>
          <div className="flex items-center hover:opacity-80 transition-opacity min-w-0">
            <img
              src="/logo.png?v=2"
              alt="Nathaniel Baldock AI Consulting"
              className="h-8 w-auto max-w-full object-contain flex-shrink-0"
            />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-xs tracking-wider">
            {role === "coach" ? "Consultant Portal" : "Client Portal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location === item.url || 
                  (item.url !== `/${role}` && location.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      data-testid={`nav-${item.title.toLowerCase().replace(" ", "-")}`}
                      data-tour={item.tourId}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <PWAInstallBanner />

      <SidebarFooter className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3" data-testid="button-user-menu">
              <UserAvatar user={user} className="h-8 w-8" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href={role === "coach" ? "/consultant/setup" : "/client/profile"}>
                <User className="mr-2 h-4 w-4" />
                {role === "coach" ? "Settings" : "Profile"}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="text-destructive" data-testid="menu-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
