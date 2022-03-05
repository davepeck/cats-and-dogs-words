import { Keyboard } from "./keyboard";

export const App: React.FC = () => {
  return (
    <div>
      <h1>Cat &amp; Dog Word</h1>
      <Keyboard
        letterClues={{}}
        onLetterKey={() => {}}
        onBackspaceKey={() => {}}
        onEnterKey={() => {}}
      />
    </div>
  );
};
