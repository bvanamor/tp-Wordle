import Row from "./Row";
import type { LetterStatus } from "../types/games";

interface BoardProps {
  guesses: string[];
  currentWord: string;
  statuses: LetterStatus[][];
}

function Board({
  guesses,
  currentWord,
  statuses,
}: BoardProps) {
  const rows = Array.from({
    length: 6,
  });

  return (
    <div className="board">
      {rows.map((_, rowIndex) => {
        let word = "";

        let rowStatuses:
          | LetterStatus[]
          | undefined;

        if (rowIndex < guesses.length) {
          word = guesses[rowIndex];

          rowStatuses =
            statuses[rowIndex];
        }

        if (rowIndex === guesses.length) {
          word = currentWord;
        }

        return (
          <Row
            key={rowIndex}
            word={word}
            statuses={rowStatuses}
          />
        );
      })}
    </div>
  );
}

export default Board;