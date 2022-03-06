import { Grid, Row } from "./grid";
import { Keyboard } from "./keyboard";

export const App: React.FC = () => {
  return (
    <div>
      <h1>Cat &amp; Dog Word</h1>
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
        <Row
          length={5}
          state="past"
          word="patio"
          clues={["incorrect", "correct", "move", "incorrect", "correct"]}
        />
        <Row
          length={5}
          state="past"
          word="codec"
          clues={["correct", "incorrect", "incorrect", "move", "incorrect"]}
        />
        <Row length={5} state="present" word="CAT" clues={[]} />
        <Row length={5} state="future" word="" clues={[]} />
        <Row length={5} state="future" word="" clues={[]} />
        <Row length={5} state="future" word="" clues={[]} />
      </Grid>
      <Keyboard
        letterClues={{ a: "incorrect", b: "correct", c: "move" }}
        onLetterKey={() => {}}
        onBackspaceKey={() => {}}
        onEnterKey={() => {}}
      />
    </div>
  );
};
