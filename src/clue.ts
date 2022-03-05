/** The funamental available clues. */
export type Clue = "correct" | "move" | "incorrect";

/** Mapping from all alphabet letters to a clue, if one exists. */
export type LetterClues = { [letter: string]: Clue | undefined };

/** Return clues for a given word and target secret. */
export const getClues = (word: string, secret: string): Clue[] => {
  const clues: Clue[] = [...new Array(word.length)];
  const secretLetters = secret.split("");

  // Look for exact matches first
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    if (c === secretLetters[i]) {
      clues[i] = "correct";
      secretLetters[i] = "";
    }
  }

  // Look for misplaced letters and mismatches next
  for (let i = 0; i < word.length; i++) {
    if (!clues[i]) {
      const c = word[i];
      const secretIndex = secretLetters.indexOf(c);
      if (secretIndex !== -1) {
        clues[i] = "move";
        secretLetters[secretIndex] = "";
      } else {
        clues[i] = "incorrect";
      }
    }
  }

  return clues;
};
