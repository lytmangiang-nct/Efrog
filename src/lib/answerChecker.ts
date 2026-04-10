import { GoogleGenAI } from "@google/genai";

/**
 * Normalizes text by lowercasing, trimming, collapsing internal whitespace,
 * and removing trailing punctuation.
 */
export const normalizeText = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Collapse internal whitespace
    .replace(/[.,!?]$/, ''); // Remove trailing punctuation
};

/**
 * Calculates Levenshtein distance between two strings.
 */
const getLevenshteinDistance = (s1: string, s2: string) => {
  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator, // substitution
      );
    }
  }
  return track[s2.length][s1.length];
};

export interface AnswerCheckResult {
  isCorrect: boolean;
  feedback: string;
  status: 'perfect' | 'typo' | 'synonym' | 'incorrect';
  bonusTadpoles?: number;
}

/**
 * Smart answer checker for Efrog.
 * Handles normalization, typos, multiple correct answers, and semantic equivalence.
 */
export const checkAnswer = async (
  userInput: string, 
  correctAnswers: string | string[],
  questionContext?: string
): Promise<AnswerCheckResult> => {
  const answers = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
  const normalizedInput = normalizeText(userInput);
  
  if (!normalizedInput) {
    return { isCorrect: false, feedback: "Vui lòng nhập câu trả lời.", status: 'incorrect' };
  }

  // 1. Exact Match (normalized)
  for (const answer of answers) {
    if (normalizedInput === normalizeText(answer)) {
      return { 
        isCorrect: true, 
        feedback: "Tuyệt vời! Câu trả lời hoàn toàn chính xác.", 
        status: 'perfect' 
      };
    }
  }

  // 2. Typo Detection
  for (const answer of answers) {
    const normAnswer = normalizeText(answer);
    const distance = getLevenshteinDistance(normalizedInput, normAnswer);
    
    // Threshold: 10% of the sentence length or max 2 characters
    const threshold = Math.max(1, Math.floor(normAnswer.length * 0.1));
    if (distance <= threshold && distance > 0) {
      // Find the specific word with typo if possible
      const inputWords = normalizedInput.split(' ');
      const answerWords = normAnswer.split(' ');
      let typoWord = '';
      if (inputWords.length === answerWords.length) {
        for (let i = 0; i < inputWords.length; i++) {
          if (inputWords[i] !== answerWords[i]) {
            typoWord = inputWords[i];
            break;
          }
        }
      }

      return { 
        isCorrect: true, 
        feedback: `Gần đúng rồi! Bạn bị sai lỗi chính tả nhỏ${typoWord ? ` ở từ "${typoWord}"` : ''}.`, 
        status: 'typo',
        bonusTadpoles: -5 // Penalty for typo
      };
    }
  }

  // 3. Synonym/Semantic Check (using Gemini)
  // Only if we have an API key and it's not a simple multiple choice
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && normalizedInput.split(' ').length > 2) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        As an English teacher for "Efrog" (an English learning app), evaluate if the student's answer is semantically equivalent and grammatically correct compared to the target answers.
        
        Context/Question: ${questionContext || "English sentence rewrite/combine"}
        Student Answer: "${userInput}"
        Target Answers: ${JSON.stringify(answers)}
        
        Rules:
        - If it's a valid synonym, alternative phrasing, or different word order that is grammatically correct and conveys the same meaning, return "SYNONYM".
        - If it's almost correct but has a minor grammar issue, return "INCORRECT".
        - Otherwise, return "INCORRECT".
        
        Return ONLY the word "SYNONYM" or "INCORRECT".
      `;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      const resultText = response.text?.trim().toUpperCase();
      if (resultText === "SYNONYM") {
        return {
          isCorrect: true,
          feedback: "Cách diễn đạt của bạn rất hay và đúng ngữ pháp! Đã ghi nhận vào kho đáp án.",
          status: 'synonym'
        };
      }
    } catch (error) {
      console.error("Gemini check failed:", error);
    }
  }

  return { 
    isCorrect: false, 
    feedback: "Chưa chính xác. Hãy thử lại nhé!", 
    status: 'incorrect' 
  };
};
