import { OTHER } from "../data/questions";
import type { Answers, OtherNotes, Submission } from "../types/assessment";

const WEBHOOK_URL = import.meta.env.VITE_SUBMISSION_WEBHOOK_URL?.trim() ?? "";
const DRAFT_KEY = "tuwaiq-init:draft";
const NAME_KEY = "tuwaiq-init:name";
const TIMEOUT_MS = 15000;

export type SubmitMode = "remote" | "local";

/** Replaces a bare "أخرى" with "أخرى: <what they typed>". */
function withNote(value: string, note?: string) {
  return value === OTHER && note?.trim() ? `${OTHER}: ${note.trim()}` : value;
}

export function buildSubmission(name: string, answers: Answers, others: OtherNotes): Submission {
  return {
    name: name.trim(),
    submittedAt: new Date().toISOString(),
    experience: answers.experience,
    buildAbility: answers.buildAbility,
    workedAreas: answers.workedAreas.map((v) => withNote(v, others.workedAreas)),
    technologies: answers.technologies.trim(),
    interests: answers.interests.map((v) => withNote(v, others.interests)),
    learningPreference: answers.learningPreference,
    expectedOutcome: withNote(answers.expectedOutcome, others.expectedOutcome),
    successDefinition: answers.successDefinition.trim(),
    favoriteColor: answers.favoriteColor ?? { name: "", hex: "" },
  };
}

/**
 * Sends one submission to the Google Apps Script web app.
 * The body goes as text/plain so the browser skips the CORS preflight, which
 * Apps Script can't answer. With no URL configured (local dev) the submission
 * is only logged, so the whole flow can still be tested.
 */
export async function submitAssessment(submission: Submission): Promise<SubmitMode> {
  if (!WEBHOOK_URL) {
    console.info("[tuwaiq-init] VITE_SUBMISSION_WEBHOOK_URL is not set — submission logged locally:", submission);
    await new Promise((r) => setTimeout(r, 700));
    return "local";
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(submission),
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Submission failed with HTTP ${res.status}`);
    const data = await res.json().catch(() => null);
    if (data && data.ok === false) throw new Error(data.error || "Submission rejected");
    return "remote";
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Local draft: a refresh or a failed submit never loses answers ----------

export interface Draft {
  answers: Answers;
  others: OtherNotes;
  step: number;
}

export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* storage unavailable (private mode): answers still live in memory */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

// ---------- Member name: kept on its own so it survives a refresh on the intro screen ----------

export function loadName(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveName(name: string) {
  try {
    if (name) localStorage.setItem(NAME_KEY, name);
    else localStorage.removeItem(NAME_KEY);
  } catch {
    /* ignore */
  }
}
