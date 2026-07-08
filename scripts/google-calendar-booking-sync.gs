/**
 * Google Apps Script bridge:
 * Sync Google Calendar booking events into the app DB via webhook ingest.
 *
 * Setup:
 * 1) Paste this file into script.google.com
 * 2) Update API_BASE_URL + WEBHOOK_SECRET
 * 3) Run syncRecentBookings once manually (authorize)
 * 4) Add a time-driven trigger every 5 minutes for syncRecentBookings
 *
 * v2: only posts events changed since last successful sync (avoids repeat API calls,
 * Resend spam, and 6-minute script timeouts on large calendars).
 */

const API_BASE_URL = 'https://nathanielbaldock.com';
const INGEST_PATH = '/api/integrations/google-calendar/booking';
const WEBHOOK_SECRET = 'REPLACE_ME_WITH_GOOGLE_CALENDAR_WEBHOOK_SECRET';
const LOOKAHEAD_DAYS = 120;
const LOOKBACK_DAYS = 14;
/** Cap per run so we stay well under the 6-minute Apps Script limit. */
const MAX_EVENTS_PER_RUN = 25;
/** UrlFetchApp timeout per request (seconds). */
const FETCH_TIMEOUT_SEC = 45;

function syncRecentBookings() {
  const scriptProps = PropertiesService.getScriptProperties();
  const lastSyncIso = scriptProps.getProperty('lastSyncIso');
  const now = new Date();
  const runStartedIso = now.toISOString();

  const lookbackStart = lastSyncIso
    ? new Date(new Date(lastSyncIso).getTime() - 2 * 60 * 1000)
    : new Date(now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  const windowEnd = new Date(now.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000);
  const lastSyncDate = lastSyncIso ? new Date(lastSyncIso) : null;

  const events = CalendarApp.getDefaultCalendar().getEvents(lookbackStart, windowEnd);
  let posted = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < events.length; i += 1) {
    if (posted >= MAX_EVENTS_PER_RUN) {
      Logger.log('Reached MAX_EVENTS_PER_RUN (' + MAX_EVENTS_PER_RUN + '); remaining events next run.');
      break;
    }

    const event = events[i];

    if (lastSyncDate && event.getLastUpdated().getTime() <= lastSyncDate.getTime()) {
      skipped += 1;
      continue;
    }

    const guestList = event.getGuestList();
    if (!guestList || guestList.length === 0) continue;

    const attendee = guestList.find(function (g) {
      const email = (g.getEmail() || '').toLowerCase();
      return email && email.indexOf('calendar.google.com') === -1 && email.indexOf('noreply') === -1;
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

    try {
      postBookingToApi(payload);
      posted += 1;
    } catch (err) {
      failed += 1;
      Logger.log('Webhook failed for event ' + event.getId() + ': ' + err);
    }
  }

  scriptProps.setProperty('lastSyncIso', runStartedIso);
  Logger.log('Calendar sync done. posted=' + posted + ' skipped=' + skipped + ' failed=' + failed);
}

function postBookingToApi(payload) {
  const response = UrlFetchApp.fetch(API_BASE_URL + INGEST_PATH, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
    followRedirects: true,
    validateHttpsCertificates: true,
    timeout: FETCH_TIMEOUT_SEC,
    headers: {
      'x-webhook-secret': WEBHOOK_SECRET,
    },
  });

  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('Webhook sync failed (' + code + '): ' + response.getContentText());
  }
}
