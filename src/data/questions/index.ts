import { cloudConcepts } from './cloudConcepts';
import { security } from './security';
import { technology } from './technology';
import { billing } from './billing';
import type { Question } from '../../types';
export { localQuestionGenerator, generatedTopics, localVariantCapacity, restoreGeneratedQuestions } from './generator';
export const questions = [...cloudConcepts, ...security, ...technology, ...billing];
export function validateQuestions(bank: Question[]): void {
  const seen = new Set<string>();
  for (const q of bank) {
    const fail = (message: string): never => { throw new Error(`Question ${q.id}: ${message}`) };
    if (!q.id || seen.has(q.id)) fail('ID is missing or duplicated');
    seen.add(q.id);
    if (q.options.length !== 4 || new Set(q.options.map(o => o.id)).size !== 4) fail('exactly four unique options required');
    if (!q.question.trim() || !q.explanation.trim()) fail('question and explanation required');
    if (q.correctAnswers.length < (q.type === 'multi' ? 2 : 1) || (q.type === 'single' && q.correctAnswers.length !== 1) || new Set(q.correctAnswers).size !== q.correctAnswers.length) fail('invalid correct answer count');
    if (q.correctAnswers.some(id => !q.options.some(o => o.id === id))) fail('correct answer missing from options');
    if (q.options.some(o => !o.text.trim() || !q.optionExplanations[o.id]?.trim())) fail('option or option explanation missing');
  }
}
if (import.meta.env.DEV) validateQuestions(questions);
