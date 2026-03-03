# Intake & Speaking Forms — Redesign Summary

## The Problem with the Current Consulting Intake Form

Your current form has **18+ fields across 5 sections** — it reads like a client onboarding questionnaire, not a pre-call inquiry. For a **free** discovery call, this creates unnecessary friction.

### Fields Removed (and why)

| Old Field | Why It's Gone |
|-----------|---------------|
| `problemStatement` (100 char min) | Intimidating minimum. Replaced with a friendlier "What are you hoping to get help with?" — min dropped to 20 chars |
| `currentSituation` | This is a *conversation* topic for the call, not a form field |
| `painPoints` | Same — you'll uncover this live |
| `shortTermGoals` | Save for the call |
| `longTermGoals` | Save for the call |
| `successMetrics` | Save for the call |
| `dataSecurityNotes` | Way too technical for first contact. Discuss during engagement |
| `timeline` | Rarely known at inquiry stage |
| `preferredMeetingFormat` (radio) | Replaced by trust badge "Zoom or phone — your choice" |
| `availability` | You'll coordinate this by email |

### Fields Kept (simplified)

| Field | Change |
|-------|--------|
| Name, email | Unchanged — required |
| Phone | **Upgraded**: now uses `react-phone-number-input` with international country code selector, defaulting to NZ |
| Organisation + role | Kept, made optional |
| Industry/sector | Options renamed to match your actual audience (Church/Ministry, Mission Org, School, etc.) |
| AI usage | Simplified labels ("Not using AI yet" instead of "None") |
| Budget | **Completely reworked** — see below |
| How did you hear | Changed from free text to dropdown for easier analytics |

### Budget Options: Old vs New

**Old (didn't match your services):**
- Under $5,000
- $5,000 – $15,000
- $15,000 – $50,000
- $50,000+

**New (matches your actual pricing):**
- Just exploring options
- Under $1,000 NZD
- $1,000 – $3,000 NZD
- $3,000 – $5,000 NZD
- $5,000+ NZD
- Let's discuss on the call

The old range topped at $50K+, which is enterprise consulting territory. Your actual engagements range from ~$250 (single session) to ~$5,000+ (multi-week course). The new options match reality and won't intimidate a small church with a $500 budget.

### Other UX Improvements

1. **Language**: "Application" → "Request a call". Nobody wants to "apply" for a free conversation
2. **Trust badges**: "30 min · free · no obligation" displayed prominently
3. **Card-based sections**: Clean white cards on neutral background instead of one massive form
4. **Success state**: Warmer message with navigation options
5. **Privacy note**: "Your details stay private" badge + footer text
6. **Direct email fallback**: Footer offers email as alternative

### Field Count: 18 → 10
Required fields: **3** (first name, last name, email)

---

## Speaking Invitation Form (New)

This mirrors the consulting intake structure but asks the questions event organisers actually need to answer. Based on what speakers' bureaus and event booking platforms typically request.

### Sections

**1. Your details** (mirrors consulting form)
- Name, email, phone (with country code), organisation, role

**2. About the event**
- Event name (optional — many don't have one yet)
- Event type: dropdown with 9 options (Sunday service, keynote, half/full-day workshop, retreat, seminar, school assembly, panel, other)
- Date: free text field ("March 15" or "mid-March" both work)
- Location + virtual checkbox
- Audience type: 9 options matching your target demographics
- Audience size: ranges (under 30, 30–100, 100–300, 300+, not sure)

**3. Topic preferences**
- Checkbox list of your speaking topics (can select multiple)
- Free text for custom requests or context about their needs

**4. Practical details**
- Budget: 6 options matching speaking fee ranges (honorarium, under $500, $500–$1,500, $1,500–$3,000, $3,000+, let's discuss)
- Travel covered checkbox
- Additional notes (AV, other speakers, recording, etc.)
- How did you hear about me

### Sliding Scale Messaging

Both forms include a gentle note under the budget field:
- **Consulting**: "No pressure — this just helps me suggest the right starting point. Community pricing is available."
- **Speaking**: "I offer flexible pricing and community rates for smaller churches and volunteer-run organisations. Don't let budget stop you from reaching out."

### Backend Integration

The speaking form submits to the **existing** `/api/intake` endpoint with:
- `formType: "speaking_invitation"` flag
- `industry: "speaking_invitation"` (to distinguish in coach dashboard)
- Event details concatenated into `problemStatement` field

This means **zero backend changes needed** to start using it. The coach dashboard intake review will show all the relevant info. Later you can add a dedicated endpoint and separate dashboard view.

---

## Implementation Notes

### Route to add in App.tsx:
```tsx
<Route path="/speaking/invite" component={SpeakingInvitePage} />
```

### Phone input styling:
The `react-phone-number-input` package is already in your `package.json`. The CSS import `react-phone-number-input/style.css` provides base styles. Custom Tailwind classes handle border/background matching with your existing form inputs.

### Link from Speaking page:
Add a CTA button on `/speaking` that links to `/speaking/invite`:
```tsx
<Button asChild>
  <Link href="/speaking/invite">Invite me to speak</Link>
</Button>
```

### Link from Pricing page (future):
Both forms should be linked from your pricing page:
- "Book a free discovery call" → `/intake`
- "Invite me to speak" → `/speaking/invite`
