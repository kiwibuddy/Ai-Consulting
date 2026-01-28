# Holger Coaching Portal

A comprehensive PWA coaching management platform with separate client and coach portals.

## Overview

This application provides a complete coaching management solution with:
- **Public Site**: Landing page with features, testimonials, pricing, and intake form
- **Client Portal**: Dashboard, sessions, resources, action items, and profile management
- **Coach Portal**: Dashboard, client management, session scheduling, intake review, resources, and pricing calculator

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (Google/GitHub/email)
- **Storage**: Object Storage for file uploads
- **Styling**: Tailwind CSS + shadcn/ui components

## Project Structure

```
├── client/                 # Frontend React application
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utility libraries
│       └── pages/          # Route pages
│           ├── client/     # Client portal pages
│           └── coach/      # Coach portal pages
├── server/                 # Backend Express application
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database storage interface
│   └── db.ts               # Database connection
├── shared/                 # Shared types and schemas
│   ├── schema.ts           # Drizzle database schemas
│   └── models/             # Auth models
└── attached_assets/        # User-uploaded assets
```

## Data Models

- **Users**: Authentication users with role (client/coach)
- **Client Profiles**: Extended client information, goals, preferences
- **Intake Forms**: Prospective client applications
- **Sessions**: Coaching sessions with scheduling, notes
- **Resources**: Files and materials shared with clients
- **Action Items**: Tasks assigned to clients
- **Notifications**: User notifications for events
- **Coach Settings**: Pricing configuration

## Design System

The application uses a warm, professional color palette:
- **Primary**: Orange-brown tones (HSL 25)
- **Background**: Warm off-white (HSL 40, 33%)
- **Cards**: White/dark variants
- **Semantic colors**: Success (green), warning (amber), destructive (red)

## API Routes

### Public
- `POST /api/intake` - Submit intake form

### Client Routes (Authenticated)
- `GET /api/client/profile` - Get client profile
- `PATCH /api/client/profile` - Update profile
- `GET /api/client/sessions` - List sessions
- `GET /api/client/sessions/:id` - Get session detail
- `PATCH /api/client/sessions/:id/reflection` - Save reflection
- `GET /api/client/resources` - List resources
- `GET /api/client/actions` - List action items
- `PATCH /api/client/actions/:id` - Update action status

### Coach Routes (Authenticated, Coach Role)
- `GET /api/coach/clients` - List all clients
- `GET /api/coach/intake` - List intake requests
- `PATCH /api/coach/intake/:id` - Accept/decline intake
- `GET /api/coach/sessions` - List all sessions
- `POST /api/coach/sessions` - Create session
- `GET /api/coach/resources` - List resources
- `POST /api/coach/resources` - Upload resource
- `POST /api/coach/actions` - Create action item
- `GET /api/coach/settings` - Get pricing settings
- `PATCH /api/coach/settings` - Update settings

## Recent Changes

- **Timezone Support**: Users have timezone field stored in database (IANA format, defaults to UTC)
  - `PATCH /api/user/timezone` endpoint to update user timezone
  - Timezone badge displayed on session pages
  - TimezoneSelector component for changing timezone
- **Session Calendar**: Interactive calendar component with week/month/year views
  - Shows scheduled sessions on their dates
  - Navigation (prev/next/today) and view switching
  - Click session to view details
- **Timezone Confirmation Dialogs**: When requesting or confirming sessions
  - Shows session details in both client and coach timezones
  - Date/time conversion displayed for clarity
  - Two-step confirmation process ensures timezone awareness
- **Session Request Workflow**: Bidirectional request/confirmation system
  - Clients can request sessions with preferred date/time
  - Coaches can confirm/decline/reschedule session requests
  - Notifications sent for session events
- Initial implementation of complete coaching portal
- Role-based authorization (client/coach)
- Ownership verification on all client data access
- Zod validation on all API endpoints
- Warm professional design system with dark mode support

## TODO: Future Integrations

### Email Service (Not Yet Configured)
When accepting intake forms, the system should send a welcome email to the client. To enable this:
1. Set up Resend or SendGrid integration via Replit's integration panel
2. Update `server/routes.ts` PATCH `/api/coach/intake/:id` to send welcome email on acceptance
3. Email should include: login instructions, what to expect, first steps

## User Preferences

- Use shadcn/ui components exclusively
- Warm orange/brown color palette
- Professional coaching aesthetic
- Responsive design for all screen sizes
