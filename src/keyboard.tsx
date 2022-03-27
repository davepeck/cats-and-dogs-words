import { useEffect } from "react";
import { ALPHABET } from "./alphabet";
import { getClueClass, LetterClues } from "./clue";
import clsx from "clsx";

/** Known key types. */
type KeyType = "letter" | "Backspace" | "Enter";

/** The keyboard layout. Backspace is represented with B; enter with E. */
const KEYBOARD_LAYOUT = ["qwertyuiop", "asdfghjkl", "EzxcvbnmB"];

/** Get the KeyType for a key from the layout. */
const getKeyType = (key: string): KeyType => {
  if (key === "B") {
    return "Backspace";
  } else if (key === "E") {
    return "Enter";
  } else {
    return "letter";
  }
};

/** Select an item based on the key. Prevents nesting ternarys. */
const selectForKeyType = <T,>(
  keyType: KeyType,
  backspace: T,
  enter: T,
  letter: T
): T => {
  if (keyType === "Backspace") {
    return backspace;
  } else if (keyType === "Enter") {
    return enter;
  } else {
    return letter;
  }
};

/** Props to the keyboard component. */
export interface KeyboardProps {
  /** Currently clued letters. */
  letterClues: LetterClues;

  /** Callback for when a letter key is pressed. Always sent lowercase. */
  onLetterKey: (key: string) => void;

  /** Callback for when the backspace key is pressed. */
  onBackspaceKey: () => void;

  /** Callback for when the enter/return key is pressed. */
  onEnterKey: () => void;
}

/** The primary keyboard component. */
export const Keyboard: React.FC<KeyboardProps> = ({
  letterClues,
  onLetterKey,
  onBackspaceKey,
  onEnterKey,
}) => {
  // listen for actual keyboard events
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        return;
      }
      if (e.key === "Backspace") {
        onBackspaceKey();
      } else if (e.key === "Enter") {
        onEnterKey();
      } else if (e.key.length === 1) {
        const lower = e.key.toLowerCase();
        if (ALPHABET.includes(lower)) {
          onLetterKey(lower);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [onLetterKey, onBackspaceKey, onEnterKey]);

  // render a good-enough keyboard
  return (
    <div className="keyboard">
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div className="row" key={`keyboard-row-${i}`}>
          {row.split("").map((key) => {
            const keyType = getKeyType(key);
            const clickHandler = selectForKeyType(
              keyType,
              onBackspaceKey,
              onEnterKey,
              onLetterKey
            );
            return (
              <button
                className={clsx(
                  "key",
                  keyType !== "letter" && "wide",
                  getClueClass(letterClues[key])
                )}
                key={`keyboard-key-${key}`}
                onClick={() => clickHandler(key)}
              >
                {selectForKeyType(keyType, "⌫", "enter", key)}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
