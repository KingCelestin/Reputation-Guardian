# REPUTATION GUARDIAN - BUILD INSTRUCTIONS

## PROJECT GOAL
Build a simple, single-page web app that generates professional review responses using Claude AI.

## CRITICAL CONSTRAINTS
- **Build time target:** 60-75 minutes maximum
- **Technology:** React single-page app only
- **Deployment:** Vercel-ready
- **Complexity:** Keep it SIMPLE - this is an MVP demo

## WHAT TO BUILD

### Core Features (MUST HAVE)
1. Password protection (password: "reputation2024")
2. Star rating selector (1-5 stars)
3. Review text input (textarea)
4. "Generate Responses" button
5. Display 3 responses in card layout:
   - Apologetic tone
   - Solution-focused tone
   - Empathetic tone
6. Copy to clipboard button on each card
7. Loading state while generating
8. Error handling for failed API calls

### Design Requirements
- Dark professional theme (#1a1a1a background)
- Blue/purple accent colors
- Clean, modern cards with subtle shadows
- Mobile responsive
- No animations (keeps build simple)
- Use Tailwind CSS only (no external UI libraries unless needed)

### API Integration
- Use Anthropic Claude API
- API key hardcoded in environment variable
- Responses must be 4-5 sentences each
- Return JSON format with 3 tone variations

## WHAT NOT TO BUILD

### Features to SKIP (explicitly exclude)
- ❌ No user authentication/accounts
- ❌ No database (everything is ephemeral)
- ❌ No response history/saving
- ❌ No analytics/tracking
- ❌ No admin dashboard
- ❌ No email integration
- ❌ No payment processing
- ❌ No complex state management (no Redux/Zustand)
- ❌ No server-side rendering
- ❌ No API routes (frontend calls Claude API directly)
- ❌ No testing suite (we'll test manually)
- ❌ No CI/CD pipelines
- ❌ No Docker/containerization

### Technologies to AVOID
- ❌ No Next.js (use Vite + React)
- ❌ No TypeScript (JavaScript only for speed)
- ❌ No GraphQL
- ❌ No separate backend
- ❌ No MongoDB/PostgreSQL/any database
- ❌ No WebSockets
- ❌ No service workers/PWA features

## BUILD SEQUENCE

### Phase 1: Basic Structure (15 min)
1. Initialize Vite + React project
2. Set up Tailwind CSS
3. Create password protection component
4. Basic layout with dark theme

### Phase 2: Core UI (20 min)
5. Star rating selector
6. Review textarea
7. Generate button
8. Three response cards (empty state)
9. Copy to clipboard functionality

### Phase 3: Claude Integration (20 min)
10. Set up Claude API connection
11. Build prompt for 3 tone variations
12. Handle API response
13. Display responses in cards
14. Loading state

### Phase 4: Polish & Deploy (15 min)
15. Error handling
16. Mobile responsiveness check
17. Test with example reviews
18. Deploy to Vercel
19. Create .env.example

## SUCCESS CRITERIA
- ✅ Password works
- ✅ Can paste review and select rating
- ✅ Generates 3 different responses
- ✅ Copy to clipboard works
- ✅ Looks professional on desktop and mobile
- ✅ Deploys to Vercel without errors
- ✅ Total build time under 90 minutes

## CRITICAL REMINDERS
- Keep it simple - this is a demo/portfolio piece
- Don't over-engineer
- Don't add features not listed
- Don't refactor working code
- Stay focused on the 4-phase plan
- If something works, move on

## FILES STRUCTURE
```
reputation-guardian/
├── src/
│   ├── App.jsx (main component)
│   ├── components/
│   │   ├── PasswordGate.jsx
│   │   ├── ReviewInput.jsx
│   │   ├── ResponseCard.jsx
│   │   └── LoadingState.jsx
│   ├── utils/
│   │   └── claudeApi.js
│   └── index.css (Tailwind)
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## WHEN DONE
1. Test with all 3 example reviews
2. Deploy to Vercel
3. Share URL for testing
4. Document any issues encountered

---

READ THESE INSTRUCTIONS FIRST. DO NOT DEVIATE. ASK IF UNCLEAR.
