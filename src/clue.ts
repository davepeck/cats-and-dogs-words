/** The funamental available clues. */
export type Clue =
  /** Letter is in correct position. */
  | "correct"
  /** Letter is in solution, but positioned incorrectly. */
  | "move"
  /** Letter is not in solution. */
  | "incorrect";

/** Mapping from all alphabet letters to a clue, if one exists. */
export type LetterClues = { [letter: string]: Clue | undefined };

/** Return the best of two clue values. */
const maxClue = (
  a: Clue | undefined,
  b: Clue | undefined
): Clue | undefined => {
  if (a === "correct" || b === "correct") {
    return "correct";
  } else if (a === "move" || b === "move") {
    return "move";
  } else if (a === "incorrect" || b === "incorrect") {
    return "incorrect";
  }
  return undefined;
};

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

/** Update per-letter clues based on a new set of single-word clues. */
export const updateLetterClues = (
  letterClues: LetterClues,
  word: string,
  clues: Clue[]
): LetterClues => {
  const updatedClues: LetterClues = { ...letterClues };
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    updatedClues[c] = maxClue(updatedClues[c], clues[i]);
  }
  return updatedClues;
};

/** Return CSS class name for clue (or unknown). */
export const getClueClass = (clue?: Clue): string => clue ?? "unknown";
