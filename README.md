# TUWAIQ INIT

A short member assessment for the **Programming Track** of Tuwaiq Club at the University of Jeddah: the member's name, then 9 questions (the last is "claim your color"), about 3–5 minutes, Arabic-first (RTL), and designed for phones first.

**Stack:** React · Vite · TypeScript · Tailwind CSS · Framer Motion. There is no backend. Answers go to a Google Apps Script web app, which appends them to a private Google Sheet.

## Run

```bash
npm install
cp .env.example .env   # optional
npm run dev
npm run build          # outputs to dist/
```

If `VITE_SUBMISSION_WEBHOOK_URL` is empty, submissions are only logged to the browser console, so you can still test the whole flow.

## Structure

```
src/
  App.tsx                 stage machine: init → assessment → complete
  screens/                IntroScreen · AssessmentScreen · SuccessScreen
  components/             OptionCard · MultiSelect · TerminalInput · ColorClaim · Progress · TerminalDetail · ui
  data/questions.ts       all question text and options (edit questions here)
  services/submissionService.ts   POST to Apps Script + local draft
  types/assessment.ts
google-apps-script/Code.gs
```

The name and answers are saved to `localStorage` while the student is answering. A refresh or a failed submit therefore never loses anything: the intro offers to resume, and a failed submit shows a Retry button.

**Logo:** put the official Tuwaiq × UJ Programming logo in `public/brand/` and set `LOGO_SRC` in `src/components/ui.tsx`.

## Google Sheets setup

1. Create a Google Sheet (keep it private).
2. Add a sheet (tab) named **`Responses`** and leave it empty. The header row is added automatically on the first submission, with these columns:

   `Name · Submitted At · Experience · Build Ability · Worked Areas · Technologies · Interests · Learning Preference · Expected Outcome · Success Definition · Favorite Color · Favorite Color Hex`

   Multi-select answers are stored comma-separated. If you already have a `Responses` tab with an older header row, clear it or rename it first.
3. Open **Extensions → Apps Script**.
4. Paste the contents of `google-apps-script/Code.gs` and save.
5. Click **Deploy → New deployment → Web app**. Set *Execute as*: **Me** and *Who has access*: **Anyone**, then deploy and authorize.
6. Copy the Web app URL, which ends in **`/exec`**.
7. Put it in `.env` (or in your hosting provider's environment variables):

   ```
   VITE_SUBMISSION_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
   ```

   Then rebuild.

The sheet itself stays private. The web app can only append rows; it cannot read them. If you edit `Code.gs` later, go to **Deploy → Manage deployments → Edit → New version**; the URL stays the same.
