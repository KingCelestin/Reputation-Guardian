# Reputation Guardian

A professional review response generator powered by Claude AI.

## Features

- Password-protected access (password: `reputation2024`)
- Star rating selector (1-5 stars)
- Review text input
- Generate 3 AI-powered responses:
  - Apologetic tone
  - Solution-focused tone
  - Empathetic tone
- Copy to clipboard (with iOS fallback)
- Dark professional theme
- Mobile responsive design
- Loading states and error handling

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Add your Anthropic API key to `.env`:
   ```
   VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

## Development

Run the development server:
```bash
npm run dev
```

Test with Vercel CLI:
```bash
npx vercel dev
```

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

Deploy to Vercel:
```bash
npx vercel
```

## Tech Stack

- React 18
- Vite 6
- Tailwind CSS 3
- Anthropic Claude API
- JavaScript (ES6+)

## Security Note

⚠️ **Demo Only** - This app makes client-side API calls to the Anthropic API. For production use, implement a backend proxy to keep your API key secure.

## License

MIT
