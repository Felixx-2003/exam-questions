import type { Difficulty, Domain, Question } from '../../types';
export type Seed = [topic: string, difficulty: Difficulty, question: string, options: string[], correct: number[], explanation: string];
export function makeQuestions(domain: Domain, prefix: string, seeds: Seed[]): Question[] {
  return seeds.map(([topic, difficulty, question, raw, correct, explanation], index) => {
    const shift = index % 4;
    const rotated = [...raw.slice(shift), ...raw.slice(0, shift)];
    const originalIndex = (position: number) => (position + shift) % 4;
    const options = rotated.map((value, i) => ({ id: 'ABCD'[i], text: value.split('::')[0] }));
    const optionExplanations = Object.fromEntries(rotated.map((value, i) => ['ABCD'[i], `${correct.includes(originalIndex(i)) ? 'Correct' : 'Incorrect'}. ${value.split('::')[1] || explanation}`]));
    return { id: `${prefix}-${String(index + 1).padStart(3, '0')}`, domain, topic, difficulty, type: correct.length > 1 ? 'multi' : 'single', question, options, correctAnswers: options.filter((_, i) => correct.includes(originalIndex(i))).map(o => o.id), explanation, optionExplanations };
  });
}
