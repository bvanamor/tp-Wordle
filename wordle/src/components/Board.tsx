import Row from "./Row";
import type { LetterStatus } from "../types/games";

interface BoardProps {
  guesses: string[];
  currentWord: string;
  statuses: LetterStatus[][];
}

