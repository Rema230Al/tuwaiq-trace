import type { Answers, Question } from "../types/assessment";

export const OTHER = "أخرى";

export const questions: Question[] = [
  {
    id: "experience",
    code: "experience.level",
    kind: "single",
    title: "أي وصف أقرب لتجربتك مع البرمجة إلى الآن؟",
    hint: "اختر الأقرب لك",
    options: [
      { label: "أغلب تجربتي من مواد الجامعة والتكاليف" },
      { label: "جربت أبني مشروع أو مشروعين خارج متطلبات الجامعة" },
      { label: "بنيت عدة مشاريع وأقدر أشتغل بشكل مستقل" },
      { label: "عندي تجربة في مشاريع كبيرة، هاكاثونات، تدريب، أو ضمن فريق تقني" },
    ],
  },
  {
    id: "buildAbility",
    code: "build.fromScratch()",
    kind: "single",
    title: "لو كنت مسؤول إنك تبني مشروع برمجي من البداية، أي خيار يصفك أكثر؟",
    hint: "اختر الأقرب لك",
    options: [
      { label: "أحتاج أحد يوضح لي الخطوات ويساعدني أبدأ" },
      { label: "أعرف أبدأ بنفسي، لكن ممكن أحتاج مساعدة في بعض الخطوات" },
      { label: "أقدر أبني المشروع كامل بنفسي غالبًا" },
      { label: "أقدر أبني المشروع بنفسي وأساعد غيري إذا واجه مشكلة" },
    ],
  },
  {
    id: "workedAreas",
    code: "areas.worked[]",
    kind: "multi",
    title: "إيش المجالات اللي سبق واشتغلت عليها فعليًا؟",
    hint: "اختر كل اللي ينطبق",
    options: [
      { label: "Web Development" },
      { label: "Mobile Development" },
      { label: "Backend & APIs" },
      { label: "Databases" },
      { label: "AI / Machine Learning" },
      { label: "Computer Vision" },
      { label: "Automation" },
      { label: "Cloud & DevOps" },
      { label: "Git / GitHub" },
      { label: "ما سبق لي العمل على أي منها", exclusive: true },
      { label: OTHER, other: true },
    ],
  },
  {
    id: "technologies",
    code: "stack.used",
    kind: "text",
    title: "إيش اللغات أو التقنيات والأدوات اللي استخدمتها فعليًا في مشروع؟",
    hint: "اكتبها مفصولة بفاصلة، أو اضغط على الاقتراحات",
    placeholder: "Python, Java, React, Flutter, Firebase, Docker...",
    suggestions: ["Python", "Java", "JavaScript", "React", "Flutter", "Firebase", "SQL", "Docker", "C++", "Git"],
  },
  {
    id: "interests",
    code: "interests.pick(3)",
    kind: "multi",
    max: 3,
    title: "إيش أكثر 3 مجالات ودك تجربها أو تتعمق فيها معنا هذا الترم؟",
    hint: "اختر 3 كحد أقصى",
    options: [
      { label: "AI Agents" },
      { label: "Automation" },
      { label: "Computer Vision" },
      { label: "Fine-Tuning AI Models" },
      { label: "DevOps & Cloud" },
      { label: "Web Development" },
      { label: "Mobile Development" },
      { label: "Backend & APIs" },
      { label: "Open Source" },
      { label: OTHER, other: true },
    ],
  },
  {
    id: "learningPreference",
    code: "explore.mode",
    kind: "single",
    title: "لو قدمنا لك مجال أو تقنية ما سبق لك جربتها، إيش الأقرب لك؟",
    hint: "اختر الأقرب لك",
    options: [
      { label: "هذا اللي أبغاه، ودي أجرب أشياء جديدة" },
      { label: "متحمس/ة أجرب، لكن أحتاج توجيه في البداية" },
      { label: "أفضل أتعمق في المجالات اللي أعرفها أصلًا" },
      { label: "أبغى مزيج بين الاثنين" },
    ],
  },
  {
    id: "expectedOutcome",
    code: "track.expect()",
    kind: "single",
    title: "إيش أكثر شيء تتوقع إن Programming Track يضيفه لك هذا الترم؟",
    hint: "اختر الأهم لك",
    options: [
      { label: "مشروع قوي أضيفه للـ Portfolio" },
      { label: "تطوير GitHub والـ Portfolio" },
      { label: "تجربة تقنيات ومجالات جديدة" },
      { label: "تطوير مستواي البرمجي" },
      { label: "تجربة العمل ضمن فريق تقني" },
      { label: "التعرف على مختصين وسوق العمل" },
      { label: "اكتشاف المجال التقني الأنسب لي" },
      { label: OTHER, other: true },
    ],
  },
  {
    id: "successDefinition",
    code: "success.define()",
    kind: "text",
    multiline: true,
    title: "بنهاية الترم، إيش الشيء اللي لو حققته بتقول: \"دخولي Programming Track كان يستاهل\"؟",
    hint: "جملة أو جملتين تكفي",
    placeholder: "مثلًا: أطلق مشروع حقيقي مع فريق وأضيفه للـ Portfolio...",
  },
  {
    id: "favoriteColor",
    code: "identity.color",
    kind: "color",
    lead: "آخر شيء، بدون تفكير كثير...",
    title: "لو كان لك لون، إيش بيكون؟",
    hint: "اضغط على لونك",
    // Shades tuned to read clearly on the dark interface. Name + hex are both submitted.
    options: [
      { name: "Purple", hex: "#7B4DFF" },
      { name: "Blue", hex: "#3D7BFF" },
      { name: "Cyan", hex: "#57E3D8" },
      { name: "Green", hex: "#4ADE80" },
      { name: "Yellow", hex: "#FACC15" },
      { name: "Orange", hex: "#F4A664" },
      { name: "Red", hex: "#F0524F" },
      { name: "Pink", hex: "#F472B6" },
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#F5F5F5" },
    ],
  },
];

export const emptyAnswers: Answers = {
  experience: "",
  buildAbility: "",
  workedAreas: [],
  technologies: "",
  interests: [],
  learningPreference: "",
  expectedOutcome: "",
  successDefinition: "",
  favoriteColor: null,
};

export function isAnswered(q: Question, answers: Answers): boolean {
  const value = answers[q.id];
  if (Array.isArray(value)) return value.length > 0;
  if (value === null || typeof value === "object") return value !== null;
  if (q.kind === "text") return value.trim().length >= 2;
  return value !== "";
}
