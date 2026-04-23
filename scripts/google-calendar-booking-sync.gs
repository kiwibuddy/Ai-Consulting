/**
 * Google Apps Script bridge:
 * Sync Google Calendar booking events into the app DB via webhook ingest.
 *
 * Setup:
 * 1) Paste this file into script.google.com
 * 2) Update API_BASE_URL + WEBHOOK_SECRET
 * 3) Run syncRecentBookings once manually (authorize)
 * 4) Add a time-driven trigger every 5 minutes for syncRecentBookings
 */

const API_BASE_URL = 'https://nathanielbaldock.com';
const INGEST_PATH = '/api/integrations/google-calendar/booking';
const WEBHOOK_SECRET = 'REPLACE_ME_WITH_GOOGLE_CALENDAR_WEBHOOK_SECRET';
const LOOKAHEAD_DAYS = 120;
const LOOKBACK_DAYS = 30;

function syncRecentBookings() {
  const scriptProps = PropertiesService.getScriptProperties();
  const lastSyncIso = scriptProps.getProperty('lastSyncIso');
  const now = new Date();
  const lookbackStart = lastSyncIso
    ? new Date(lastSyncIso)
    : new Date(now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  const windowEnd = new Date(now.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000);

  const events = CalendarApp.getDefaultCalendar().getEvents(lookbackStart, windowEnd);
  let sent = 0;

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];
    const guestList = event.getGuestList();
    if (!guestList || guestList.length === 0) continue;

    const attendee = guestList.find((g) => {
      const email = (g.getEmail() || '').toLowerCase();
      return email && !email.includes('calendar.google.com') && !email.includes('noreply');
    });
    if (!attendee) continue;

    const status = event.isAllDayEvent()
      ? 'confirmed'
      : event.getMyStatus() === CalendarApp.GuestStatus.NO
        ? 'cancelled'
        : event.getEndTime().getTime() < now.getTime()
          ? 'completed'
          : 'confirmed';

    const payload = {
      eventId: event.getId(),
      title: event.getTitle() || 'Discovery call',
      attendeeEmail: attendee.getEmail(),
      attendeeName: attendee.getName() || attendee.getEmail(),
      startTime: event.getStartTime().toISOString(),
      endTime: event.getEndTime().toISOString(),
      meetingLink: event.getHangoutLink() || undefined,
      status: status,
    };

    postBookingToApi(payload);
    sent += 1;
  }

  scriptProps.setProperty('lastSyncIso', now.toISOString());
  Logger.log('Synced events: ' + sent);
}

function postBookingToApi(payload) {
  const response = UrlFetchApp.fetch(API_BASE_URL + INGEST_PATH, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
    headers: {
      'x-webhook-secret': WEBHOOK_SECRET,
    },
  });

  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('Webhook sync failed (' + code + '): ' + response.getContentText());
  }
}
