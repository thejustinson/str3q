# Str3q — Product Specification
*Version 0.1 · April 2026*

---

## 1. What Is Str3q?

Str3q is a streak-based accountability app that helps people stay consistent with their daily routines. It sits at the intersection of Duolingo's habit loop psychology, Strava's social accountability model, and the dopamine design of a well-crafted game. The name itself encodes the idea — the "3" is the streak.

The core promise is simple: **show up every day, mark it done, build your streak**. The experience around that core is rich — beautiful animations, satisfying sounds, friends watching, and eventually, on-chain rewards for the disciplined.

---

## 2. Core Philosophy

- **Consistency over intensity.** Str3q doesn't care if you ran 10km or 1km. It cares that you ran.
- **Accountability through visibility.** Friends can see your streaks, nudge you, and keep their own. Social pressure is a feature.
- **Delight as retention.** The UI should feel like a reward in itself — checking off a task should produce the same small joy as popping a bubble wrap cell.
- **Simple entry, rich depth.** Getting started is frictionless. Mastery — streaks, friend networks, categories, rewards — reveals itself over time.

---

## 3. Target Users

| Persona | Use Case |
|---|---|
| The Builder | Daily coding practice, reading, side project work |
| The Athlete | Gym, running, stretching routines |
| The Learner | Language practice, studying, chess training |
| The Spiritual Practitioner | Bible reading, prayer, journaling |
| The Accountable Friend Group | WhatsApp-adjacent squad that wants shared progress |

---

## 4. Feature Set

### 4.1 Authentication
- **Google OAuth** as the primary (and initially only) sign-in method
- Profile setup on first login: username, display name, avatar (upload or pick from illustrated defaults), timezone
- Planned: wallet connect for crypto rewards in a future version

### 4.2 Activities
- Users create **Activities** — named habits with an optional emoji, color tag, and category
- Each activity is either:
  - **Daily** (repeats every day)
  - **Scheduled** (specific days of the week, e.g. Mon/Wed/Fri)
  - **Once-off** (a single-day task, no streak implication)
- Activities have an optional **target time** — e.g. "Read my book" at 9:00 PM
- Activities are grouped into user-defined **categories** (e.g. Health, Learning, Creative)
- Examples: *Play chess*, *Read my book*, *10-minute walk*, *No sugar today*, *Ship one feature*

### 4.3 Streaks
- A **personal streak** increments for every day all required activities are completed
- Per-activity streaks also exist (so you can track *chess* vs *reading* separately)
- Streak state:
  - 🔥 **Active** — current streak is live
  - ❄️ **Frozen** — streak freeze used (grace day)
  - 💀 **Broken** — missed and not recovered
- **Streak Freezes**: users earn or purchase a limited number of grace days per month
- Milestone celebrations at 3, 7, 14, 30, 60, 100, 365 days — each with a distinct animation and sound

### 4.4 Friends & Social
- **Friend discovery**: search by username or connect via shareable invite link
- **Friend profiles** show: current streaks, activity list (if public), mutual friends
- **Accountability Feed**: a social timeline showing friends' completions and streak milestones
- **Nudges**: send a one-tap prompt to a friend who hasn't checked in today ("Oi, don't lose your streak!")
- **Friend Streaks**: a shared streak between two users — both must complete their tasks on the same day to keep it alive (inspired by Snapchat streaks)
- **Leaderboard**: weekly/monthly ranking among friends by streak length or total completions

### 4.5 Notifications
- **Hourly reminders** (user-configurable) or **per-activity reminders** at set times
- **Nudge notifications** from friends
- **Streak at risk** alert — fires in the evening if you haven't checked in yet
- **Milestone achieved** push notification with a celebration sound preview
- Delivered via: Web Push (PWA), Browser Extension notifications

### 4.6 Animations & Sound Design
This is a core differentiator. Every interaction should feel alive.

| Interaction | Animation | Sound |
|---|---|---|
| Task check-off | Confetti burst + checkmark morph | Satisfying *pop* or *ding* |
| Streak milestone | Full-screen flame burst, number counter | Trumpet fanfare or ascending chime |
| Streak broken | Screen crack effect, number drops to 0 | Low thud or crumble |
| Friend nudge sent | Paper airplane flies across screen | Whoosh |
| Receiving a nudge | Notification badge bounces + pulses | Soft ping |
| App open (active streak) | Flame flickers on dashboard | Subtle ambient crackle |
| New friend added | Handshake or high-five lottie animation | Cheerful chime |
| Streak freeze used | Ice crystal spreads over streak counter | Freeze/shatter sound |

Tech: **Framer Motion** for all React animations. Web Audio API or Howler.js for sound. Lottie for complex character animations where needed.

### 4.7 Rewards (Future — Crypto Layer)
- Wallet creation/connect during onboarding (optional at launch)
- Milestone streaks mint a **Streak Badge NFT** (soulbound, non-transferable)
- Consistent completions earn **Str3q Points** redeemable against premium features or partner drops
- Leaderboard prizes (seasonal tournaments)
- Smart contract on Solana (natural fit given SuperteamNG ecosystem context)

---

## 5. Platform Strategy

### 5.1 Web App (Primary)
- React + TypeScript
- Vite build system
- TailwindCSS + custom design tokens
- Framer Motion for animations
- React Query for server state
- Zustand for client state
- Deployed on Vercel

### 5.2 Progressive Web App (PWA)
- Service Worker for offline support (mark tasks done even without connectivity, sync on reconnect)
- Web App Manifest for install-to-homescreen
- Push notification support via Web Push API
- Responsive layout with mobile-first breakpoints
- App-like transitions and bottom navigation on mobile

### 5.3 Browser Extension
- Chrome + Firefox (Manifest V3)
- **Widget popup**: shows today's tasks and streak status from the extension icon
- **New Tab override** (optional, user toggle): replaces new tab with a minimal streak dashboard
- Background service worker for hourly check-in reminders
- OAuth token shared with web app (same session)

### 5.4 Homepage Widgets
- PWA: iOS/Android do not natively support web widgets yet, but the PWA lockscreen/home shortcut with badge count serves as a proxy
- Desktop: Extension new tab widget (above)
- Planned: Explore Glance/WidgetKit bridges as the ecosystem matures

---

## 6. Information Architecture

```
Str3q
├── Onboarding
│   ├── Google Sign-In
│   ├── Profile Setup (username, avatar, timezone)
│   └── First Activity Creation
│
├── Home (Dashboard)
│   ├── Today's Activities (checklist)
│   ├── Streak Summary Widget
│   ├── Friend Activity Feed
│   └── Quick Nudge Rail
│
├── Activities
│   ├── My Activities (list/grid)
│   ├── Add/Edit Activity
│   └── Activity Detail (history, streak graph)
│
├── Friends
│   ├── Friend List
│   ├── Friend Profile View
│   ├── Friend Streaks
│   ├── Leaderboard
│   └── Search / Invite
│
├── Progress
│   ├── Personal Streak Calendar
│   ├── Per-Activity Stats
│   └── Milestone History
│
├── Notifications
│   └── Notification Settings (per activity, global)
│
└── Profile & Settings
    ├── Edit Profile
    ├── Privacy Settings
    ├── Streak Freezes Inventory
    ├── Sound & Animation Preferences
    └── Wallet (future)
```

---

## 7. Data Model (Draft)

```typescript
// User
{
  id: string
  googleId: string
  username: string
  displayName: string
  avatarUrl: string
  timezone: string
  streakFreezes: number
  createdAt: Date
  settings: UserSettings
}

// Activity
{
  id: string
  userId: string
  name: string
  emoji: string
  color: string
  category: string
  recurrence: 'daily' | 'scheduled' | 'once'
  scheduledDays?: number[]   // 0 = Sun, 6 = Sat
  reminderTime?: string      // HH:MM
  isPublic: boolean
  createdAt: Date
}

// Completion
{
  id: string
  activityId: string
  userId: string
  completedAt: Date
  note?: string
}

// Streak
{
  id: string
  userId: string
  activityId?: string        // null = overall streak
  currentLength: number
  longestLength: number
  lastCompletedDate: Date
  isFrozen: boolean
}

// Friendship
{
  id: string
  userAId: string
  userBId: string
  friendStreakLength: number
  friendStreakLastDate: Date
  status: 'pending' | 'active'
  createdAt: Date
}

// Nudge
{
  id: string
  fromUserId: string
  toUserId: string
  sentAt: Date
  message?: string
}
```

---

## 8. Design Language

### Visual Identity
- **Name rendering**: always *Str3q* — the 3 is the streak, the brand mark
- **Tone**: energetic but not frenetic. Warm, motivating, slightly competitive
- **Primary metaphor**: fire 🔥 — streaks burn, freeze, or die. The visual system leans into this.

### Color Palette (Draft)
| Token | Value | Usage |
|---|---|---|
| `--flame-orange` | `#FF5E1A` | Primary CTA, active streak |
| `--ember-yellow` | `#FFB800` | Milestone accents, stars |
| `--ash-dark` | `#1A1A1A` | Background (dark mode default) |
| `--smoke-mid` | `#2E2E2E` | Card surfaces |
| `--frost-blue` | `#5BC4FF` | Streak freeze state |
| `--ghost-white` | `#F5F5F0` | Text on dark |
| `--broken-red` | `#FF3B3B` | Broken streak state |

### Typography
- **Display/Brand**: *Syne* — geometric, high energy, the logo and headings
- **Body/UI**: *DM Sans* — clean, warm, very readable at small sizes
- **Mono/Stats**: *JetBrains Mono* — streak numbers, counters

### Motion Principles
1. **Purposeful** — animations communicate state changes, not just decorate
2. **Satisfying** — completions must feel physically good to do
3. **Consistent** — same easing curves across the system (`spring(stiffness: 300, damping: 20)` as default)
4. **Interruptible** — all animations can be cut short without breaking state
5. **Respectful** — reduced motion preference is honored globally

---

## 9. Build Phases

### Phase 1 — Foundation (Now)
- [ ] Project scaffold (React + Vite + TypeScript + TailwindCSS)
- [ ] Design token system
- [ ] Component library foundation (Button, Card, Badge, StreakCounter)
- [ ] Routing (React Router v6)
- [ ] Auth flow (Google OAuth)
- [ ] Activity CRUD
- [ ] Basic streak logic
- [ ] Home dashboard

### Phase 2 — Social Layer
- [ ] Friend system (add, search, invite)
- [ ] Friend profiles
- [ ] Accountability feed
- [ ] Nudges
- [ ] Friend streaks

### Phase 3 — Delight Layer
- [ ] Full Framer Motion integration
- [ ] Sound system (Howler.js)
- [ ] Milestone animations
- [ ] Streak calendar visualization

### Phase 4 — Platform Expansion
- [ ] PWA manifest + service worker
- [ ] Push notifications
- [ ] Browser extension scaffold
- [ ] New tab widget

### Phase 5 — Rewards
- [ ] Wallet connect
- [ ] Str3q Points system
- [ ] NFT badge minting on Solana
- [ ] Leaderboard prizes

---

## 10. Open Questions

1. **Backend**: Supabase
2. **Streak calculation**: Server must be authoritative to prevent manipulation, especially when rewards are involved.
3. **Notification delivery for PWA on iOS**: Apple's Web Push support (added in iOS 16.4) requires the user to add the PWA to homescreen first. This UX friction needs an explicit onboarding prompt.
4. **Friend streak fairness across timezones**: each user's local midnight is their deadline, and a shared streak completes only when both local days are done.
5. **Privacy defaults**: activities should be private by default — users opt into sharing rather than having to opt out.
6. **Monetization pre-crypto**: streak freezes as IAP, premium themes, profile customization.

---

*This document is a living spec. Each build phase will produce updated versions.*
*Next step: Phase 1 scaffold and component library.*