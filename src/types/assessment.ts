// The three stages of the experience: 01 INIT → 02 ASSESSMENT → 03 COMPLETE.
export type Stage = "init" | "assessment" | "complete";

export interface Answers {
  experience: string;
  buildAbility: string;
  workedAreas: string[];
  technologies: string;
  interests: string[];
  learningPreference: string;
  expectedOutcome: string;
  successDefinition: string;
  /** Q9 "claim your color": null until a color is claimed. */
  favoriteColor: FavoriteColor | null;
}

/** A claimable color: readable name + exact hex, both stored. */
export interface FavoriteColor {
  name: string;
  hex: string;
}

export type AnswerKey = keyof Answers;
export type AnswerValue = Answers[AnswerKey];

/** The object sent to the Google Apps Script endpoint. */
export interface Submission extends Omit<Answers, "favoriteColor"> {
  name: string;
  submittedAt: string;
  favoriteColor: FavoriteColor;
}

/** Free text typed next to an "أخرى" option, per question. */
export type OtherNotes = Partial<Record<AnswerKey, string>>;

export interface Option {
  label: string;
  /** Selecting it opens a short text field ("أخرى"). */
  other?: boolean;
  /** Selecting it clears every other choice (and vice versa). */
  exclusive?: boolean;
}

interface QuestionBase {
  id: AnswerKey;
  /** Code-style name shown above the question, e.g. `areas.worked[]`. */
  code: string;
  title: string;
  /** Short helper line under the title. */
  hint: string;
  /** Optional lead-in line shown above the title. */
  lead?: string;
}

export interface ChoiceQuestion extends QuestionBase {
  kind: "single" | "multi";
  options: Option[];
  /** multi only: maximum number of selections. */
  max?: number;
}

export interface TextQuestion extends QuestionBase {
  kind: "text";
  placeholder: string;
  multiline?: boolean;
  /** Tap-to-add tokens under the field. */
  suggestions?: string[];
}

export interface ColorQuestion extends QuestionBase {
  kind: "color";
  options: FavoriteColor[];
}

export type Question = ChoiceQuestion | TextQuestion | ColorQuestion;
