import Tile from "./tile";
import type { LetterStatus } from "../types/games";

interface RowProps {
  word: string;
  statuses?: LetterStatus[];
}

function Row({
  word,
  statuses,
}: RowProps) {
  const tiles = Array.from({
    length: 5,
  });

  return (
    <div className="word-row">
      {tiles.map((_, index) => (
        <Tile
          key={index}
          letter={word[index] || ""}
          status={statuses?.[index]}
        />
      ))}
    </div>
  );
}

export default Row;