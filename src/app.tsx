import { Keyboard } from "./keyboard";

export const App: React.FC = () => {
  return (
    <div>
      <h1>Cat &amp; Dog Word</h1>
      <h6>
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
      <Keyboard
        letterClues={{}}
        onLetterKey={() => {}}
        onBackspaceKey={() => {}}
        onEnterKey={() => {}}
      />
    </div>
  );
};
