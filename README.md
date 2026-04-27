# SpidyUniverse CDS - Defence Exam Prep Platform

A secure Next.js 14 web platform for defence exam video lectures (CDS, NDA, CAPF).

## Features
- 🔐 AES-256-CBC encrypted video tokens
- 🛡️ API key authentication
- ⚡ Rate limiting (60 req/min)
- 🎯 5 batches, 400+ lectures
- 🎨 Beautiful dark UI with glass morphism

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your keys

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
npm start
```

## Environment Variables

| Variable | Description |
|---|---|
| `API_SECRET_KEY` | Master API key for all API routes |
| `AES_ENCRYPTION_KEY` | 32-byte key for AES-256 encryption |
| `AES_IV` | 16-byte IV for AES encryption |
| `TOKEN_EXPIRY_MINUTES` | Video token expiry (default: 60) |

## API Routes

All routes require `x-api-key` header or `?key=` query param.

| Route | Method | Description |
|---|---|---|
| `/api/batches` | GET | List all batches |
| `/api/subjects/[batchId]` | GET | Subjects for a batch |
| `/api/lectures/[batchId]/[subjectId]` | GET | Encrypted lecture tokens |
| `/api/play` | POST | Resolve encrypted token to URL |

## Security
- Video URLs never exposed in browser/DevTools
- All tokens encrypted with AES-256-CBC
- Rate limiting prevents abuse
- No raw links in HTML source
