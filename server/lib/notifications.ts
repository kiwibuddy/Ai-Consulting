import { storage } from "../storage";

// Notification preference keys that map to email types
export type NotificationCategory = 
  | "sessionReminders"
  | "newResources"
  | "actionItemDue"
  | "weeklyDigest"
  | "accountUpdates"; // Always send (security/account-related emails)

interface NotificationPreference {
  inApp: boolean;
  email: boolean;
}

interface NotificationPreferences {
  sessionReminders?: NotificationPreference;
  newResources?: NotificationPreference;
  actionItemDue?: NotificationPreference;
  weeklyDigest?: NotificationPreference;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  sessionReminders: { inApp: true, email: true },
  newResources: { inApp: true, email: true },
  actionItemDue: { inApp: true, email: true },
  weeklyDigest: { inApp: true, email: true },
};

/**
 * Check if a client has opted in to receive email notifications for a category
 * Account-related emails (verification, password reset, intake acceptance) always go through
 */
export async function shouldSendEmailToClient(
  clientId: string,
  category: NotificationCategory
): Promise<boolean> {
  // Account updates are always sent (security-related)
  if (category === "accountUpdates") {
    return true;
  }

  try {
    const profile = await storage.getClientProfile(clientId);
    if (!profile || !profile.notificationPreferences) {
      // Default to true if no preferences set
      return true;
    }

    let prefs: NotificationPreferences;
    try {
      prefs = JSON.parse(profile.notificationPreferences);
    } catch {
      return true; // Default to sending if parse fails
    }

    const categoryPrefs = prefs[category as keyof NotificationPreferences];
    if (!categoryPrefs) {
      // Use default if category not explicitly set
      return DEFAULT_PREFERENCES[category as keyof NotificationPreferences]?.email ?? true;
    }

    return categoryPrefs.email;
  } catch (error) {
    console.error("Error checking notification preferences:", error);
    // Default to sending on error
    return true;
  }
}

/**
 * Get notification preferences for a client
 */
export async function getClientNotificationPreferences(
  clientId: string
): Promise<NotificationPreferences> {
  try {
    const profile = await storage.getClientProfile(clientId);
    if (!profile || !profile.notificationPreferences) {
      return DEFAULT_PREFERENCES;
    }

    try {
      const prefs = JSON.parse(profile.notificationPreferences);
      return { ...DEFAULT_PREFERENCES, ...prefs };
    } catch {
      return DEFAULT_PREFERENCES;
    }
  } catch (error) {
    console.error("Error getting notification preferences:", error);
    return DEFAULT_PREFERENCES;
  }
}

// Map email template types to notification categories
export function getNotificationCategory(emailType: string): NotificationCategory {
  const categoryMap: Record<string, NotificationCategory> = {
    // Session related
    sessionScheduled: "sessionReminders",
    sessionReminder: "sessionReminders",
    sessionCancelled: "sessionReminders",
    
    // Resources
    resourceUploaded: "newResources",
    
    // Action items
    actionItemAssigned: "actionItemDue",
    actionItemDue: "actionItemDue",
    
    // Account related (always send)
    accountCreated: "accountUpdates",
    verificationEmail: "accountUpdates",
    passwordReset: "accountUpdates",
    intakeConfirmation: "accountUpdates",
    paymentReceived: "accountUpdates",
  };

  return categoryMap[emailType] || "accountUpdates";
}
