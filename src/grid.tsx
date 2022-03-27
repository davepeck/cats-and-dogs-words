import clsx from "clsx";
import { getClueClass } from "./clue";
import type { Clue } from "./clue";

export type RowState /** Row was completed and clued. */ =
  | "past"
  /** Row is actively receiving keypresses. */
  | "present"
  /** Row has yet to be provided. */
  | "future";

/** Props to the Row component. */
export interface RowProps {
  /** The number of letters to display in this row. */
  length: number;

  /** The row's state. */
  state: RowState;

  /** The current word in this row. May be empty, or smaller than `length`. */
  word: string;

  /** The current clues, if any, for this row. */
  clues?: Clue[];
}

/** A row of cells in the grid. */
export const Row: React.FC<RowProps> = (props) => {
  return (
    <div className="row">
      {[...Array(props.length)].map((_, index) => (
        <div
          key={index}
          className={clsx("cell", "final", getClueClass(props.clues?.[index]))}
        >
          {props.word[index] ?? "\xa0"}
        </div>
      ))}
    </div>
  );
};

/** A grid of rows. */
export const Grid: React.FC = ({ children }) => (
  <div className="grid">{children}</div>
);
