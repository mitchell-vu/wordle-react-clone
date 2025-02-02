import VALID_GUESSES from '@/assets/data/valid-guesses.json';
import WORDS from '@/assets/data/word-list.json';

export const guessValidator = (guess: string, wordLength: number): { valid: boolean; message?: string } => {
  if (guess.length !== wordLength) {
    return {
      valid: false,
      message: 'Not enough letters',
    };
  }

  if (!VALID_GUESSES.includes(guess.toLowerCase()) && !WORDS.includes(guess.toLowerCase())) {
    return {
      valid: false,
      message: 'Not in word list',
    };
  }

  return { valid: true };
};
