import { useState } from "react";
import { isWord } from "./dictionary";
import { Clue, getClues, LetterClues, updateLetterClues } from "./clue";
import { Grid, Row, RowState } from "./grid";
import { Keyboard } from "./keyboard";

const LENGTH = 5;
const GUESSES = 6;
const TARGET = "vivid";

const getRowState = (i: number, iActive: number): RowState => {
  if (i < iActive) {
    return "past";
  } else if (i === iActive) {
    return "present";
  } else {
    return "future";
  }
};

export const App: React.FC = () => {
  const [letterClues, setLetterClues] = useState<LetterClues>({});
  const [words, setWords] = useState<string[]>([]);
  const [clueGrid, setClueGrid] = useState<Clue[][]>([]);
  const iActive = Math.max(0, words.length - 1);
  const appendToActiveWord = (letter: string) => {
    setWords((words) => [
      ...words.slice(0, iActive),
      ((words[iActive] ?? "") + letter).slice(0, LENGTH),
    ]);
  };
  const appendClues = (clues: Clue[]) => {
    setClueGrid((clueGrid) => [...clueGrid.slice(0, iActive), clues]);
  };
  const deleteFromActiveWord = () => {
    setWords((words) => [
      ...words.slice(0, iActive),
      words[iActive].slice(0, -1),
    ]);
  };
  const maybeAdvanceWord = () => {
    const word = words[iActive];
    if (word.length !== LENGTH) {
      alert("Guess a five-letter word, please!");
    } else if (!isWord(word)) {
      alert(`"${word}" is not a word!`);
    } else {
      const clues = getClues(word, TARGET);
      appendClues(clues);
      setLetterClues((letterClues) =>
        updateLetterClues(letterClues, word, clues)
      );
      setWords((words) => [...words, ""]);
    }
  };

  return (
    <div>
      <h1 className="title">Cat &amp; Dog Word</h1>
      <h6 className="subtitle">
        By{" "}
        <a href="https://cats-and-dogs.club/" target="_blank">
          Ellie
        </a>{" "}
        (age 7) &amp;{" "}
        <a href="https://davepeck.org/" target="_blank">
          daddy
        </a>{" "}
        (age old).
      </h6>
      <Grid>
        {[...Array(GUESSES)].map((_, i) => {
          const word = words[i] ?? "";
          const clues = clueGrid[i];
          return (
            <Row
              length={LENGTH}
              state={getRowState(i, iActive)}
              word={word}
              clues={clues}
            />
          );
        })}
      </Grid>
      <div style={{ marginTop: "3em" }}>
        <Keyboard
          letterClues={letterClues}
          onLetterKey={appendToActiveWord}
          onBackspaceKey={deleteFromActiveWord}
          onEnterKey={maybeAdvanceWord}
        />
      </div>
    </div>
  );
};
