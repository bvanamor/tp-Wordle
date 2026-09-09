import type { LetterStatus } from "../types/games";

interface TileProps {
  letter: string;
  status?: LetterStatus;
}

function Tile({
  letter,
  status,
}: TileProps) {
  let backgroundColor = "transparent";

  if (status === "correct") {
    backgroundColor = "#538D4E";
  }

  if (status === "present") {
    backgroundColor = "#B59F3B";
  }

  if (status === "absent") {
    backgroundColor = "#3A3A3C";
  }

  return (
    <div
      className="tile"
      style={{
        backgroundColor,
      }}
    >
      {letter}
    </div>
  );
}

export default Tile;