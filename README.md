# ZERO ONE Website

The public ZERO ONE website and participant-facing contest experience, built
with Next.js.

## Requirements

- Node.js and npm
- MongoDB available at the URI in `.env.local`
- A reachable Judge0 API for running and grading code

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local`:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   On macOS or Linux, use `cp .env.example .env.local`.

3. Set the values in `.env.local`. The example file uses local defaults for
   MongoDB, the website, the admin panel, and Judge0. Replace the secret
   placeholders with development-only values. For a connected admin panel,
   configure the same MongoDB database and `NEXTAUTH_SECRET` in both apps.

   `JUDGE0_URI` should be the base URL of a running Judge0 API. The example
   points to `http://localhost:2358`; starting Judge0 is a separate
   prerequisite for code execution and grading.

   Email and UploadThing credentials are needed only for features that use
   those services.

4. Start the website:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Other commands

```bash
npm run lint
npm run build
npm start
```
