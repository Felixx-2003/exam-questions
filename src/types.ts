export const domains = ['Cloud Concepts', 'Security and Compliance', 'Cloud Technology and Services', 'Billing, Pricing and Support'] as const;
export type Domain = typeof domains[number];
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Question = { id: string; domain: Domain; topic: string; difficulty: Difficulty; type: 'single' | 'multi'; question: string; options: { id: string; text: string }[]; correctAnswers: string[]; explanation: string; optionExplanations: Record<string, string> };
export type Attempt = { questionId: string; selected: string[]; correct: boolean; at: string; mode: 'practice' | 'exam' };
export type ExamResult = { id: string; at: string; questionIds: string[]; answers: Record<string, string[]>; correct: number; total: number; durationSeconds: number };
export type Progress = { attempts: Attempt[]; flagged: string[]; exams: ExamResult[]; streak: number; bestStreak: number };
export type QuestionRequest = { domain?: Domain; topic?: string; difficulty?: Difficulty; count: number; excludeIds?: string[] };
export interface QuestionGenerator { generate(request: QuestionRequest): Promise<Question[]> }
