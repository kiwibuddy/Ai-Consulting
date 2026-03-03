# Google Calendar 30-Min Booking Setup

Use Google Calendar **Appointment Schedule** so visitors can book 30-min discovery calls. No extra cost; slots sync to your calendar and you get email confirmations.

## 1. Create an Appointment Schedule

1. Open [Google Calendar](https://calendar.google.com).
2. In the left sidebar, under **My calendars**, find **Appointment schedules** (or **Create** → **Appointment schedule**).
3. Click **Create** (or **New appointment schedule**).
4. Name it (e.g. **30-min discovery call**).

## 2. Set default availability

1. **Duration:** 30 minutes.
2. **General availability:** Set your default weekly windows (e.g. Mon–Thu 10:00–14:00).
3. **Buffer:** Optional 5–10 min before/after so you don’t get back-to-back bookings.
4. **Booking window:** e.g. “Can be booked up to 2 weeks in advance” and “Need at least 24 hours notice”.
5. **Timezone:** Leave “Use guest’s timezone” on so they see local times.

## 3. Get the booking link

1. After saving, open the schedule and click **Share** or **Copy link**.
2. Copy the **public booking page** URL (e.g. `https://calendar.google.com/calendar/appointments/...` or `https://calendar.app.google/...`).
3. You’ll use this in the site as the 30-min consultation CTA (see below).

## 4. Optional: confirmation and reminders

- In the schedule settings, turn on **Email confirmation** and **Reminders** so you and the guest get calendar invites and reminder emails.

## 5. Connect the link to your site

1. In Vercel (or your env), set **`VITE_BOOKING_URL`** to the full booking page URL.
2. Redeploy so the intake page “Book a 30-min call” CTA opens this link.
3. If you use a `.env` file locally, add:
   ```
   VITE_BOOKING_URL=https://calendar.app.google/your-schedule-id
   ```

## 6. Speaking invites (manual follow-up)

- Keep using the **Speaking invite** form on `/speaking/invite` as a qualification form.
- After you review a request, send the prospect a booking link (this same 30-min link or a separate “Speaking discovery” schedule if you create one) so they can pick a time.
- No change to the form itself; this is your workflow after they submit.
