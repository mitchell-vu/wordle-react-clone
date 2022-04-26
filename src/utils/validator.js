import { WORDS } from '../constants/word-list';
import { VALID_GUESSES } from '../constants/valid-guesses';

export const guessValidator = (guess, wordLength) => {
  if (guess.length !== wordLength) {
    return {
      valid: false,
      message: 'Not enough letters',
    };
  }

  if (
    !VALID_GUESSES.includes(guess.toLowerCase()) &&
    !WORDS.includes(guess.toLowerCase())
  ) {
    return {
      valid: false,
      message: 'Not in word list',
    };
  }

  return { valid: true };
};
