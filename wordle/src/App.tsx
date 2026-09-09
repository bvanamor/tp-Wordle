import {
  useEffect,
  useState,
} from "react";

import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Title from "./components/Title";

import {
  TARGET_WORD,
  WORD_LENGTH,
  MAX_ATTEMPTS,
} from "./data/words";

import type {
  LetterStatus,
  KeyStatus,
} from "./types/games";

function App() {
  const [currentWord, setCurrentWord] =
    useState("");

  const [guesses, setGuesses] =
    useState<string[]>([]);

  const [statuses, setStatuses] =
    useState<LetterStatus[][]>([]);

  const [keyStatuses, setKeyStatuses] =
    useState<Record<string, KeyStatus>>(
      {}
    );

  const [gameOver, setGameOver] =
    useState(false);

  const [won, setWon] =
    useState(false);

  function getStatuses(
    word: string
  ): LetterStatus[] {
    const result: LetterStatus[] =
      Array(WORD_LENGTH).fill(
        "absent"
      );

    const targetLetters =
      TARGET_WORD.split("");

    const usedTargetIndexes =
      new Set<number>();

    for (
      let i = 0;
      i < WORD_LENGTH;
      i++
    ) {
      if (
        word[i] ===
        TARGET_WORD[i]
      ) {
        result[i] = "correct";

        usedTargetIndexes.add(i);
      }
    }

    for (
      let i = 0;
      i < WORD_LENGTH;
      i++
    ) {
      if (
        result[i] === "correct"
      ) {
        continue;
      }

      const targetIndex =
        targetLetters.findIndex(
          (letter, index) =>
            letter === word[i] &&
            !usedTargetIndexes.has(
              index
            )
        );

      if (targetIndex !== -1) {
        result[i] = "present";

        usedTargetIndexes.add(
          targetIndex
        );
      }
    }

    return result;
  }

  function updateKeyboard(
    word: string,
    wordStatuses: LetterStatus[]
  ) {
    setKeyStatuses(
      (previous) => {
        const updated = {
          ...previous,
        };

        word.split("").forEach(
          (letter, index) => {
            const status =
              wordStatuses[index];

            const oldStatus =
              updated[letter];

            if (
              status === "correct"
            ) {
              updated[letter] =
                "correct";

              return;
            }

            if (
              status === "present" &&
              oldStatus !== "correct"
            ) {
              updated[letter] =
                "present";

              return;
            }

            if (
              status === "absent" &&
              !oldStatus
            ) {
              updated[letter] =
                "absent";
            }
          }
        );

        return updated;
      }
    );
  }

  function handleKeyPress(
    key: string
  ) {
    if (gameOver) {
      return;
    }

    if (
      key === "BACKSPACE"
    ) {
      setCurrentWord(
        (previous) =>
          previous.slice(0, -1)
      );

      return;
    }

    if (key === "ENTER") {
      if (
        currentWord.length !==
        WORD_LENGTH
      ) {
        return;
      }

      const wordStatuses =
        getStatuses(
          currentWord
        );

      const newGuesses = [
        ...guesses,
        currentWord,
      ];

      const newStatuses = [
        ...statuses,
        wordStatuses,
      ];

      setGuesses(newGuesses);

      setStatuses(newStatuses);

      updateKeyboard(
        currentWord,
        wordStatuses
      );

      setCurrentWord("");

      if (
        currentWord ===
        TARGET_WORD
      ) {
        setWon(true);

        setGameOver(true);

        return;
      }

      if (
        newGuesses.length >=
        MAX_ATTEMPTS
      ) {
        setGameOver(true);
      }

      return;
    }

    if (
      currentWord.length >=
      WORD_LENGTH
    ) {
      return;
    }

    setCurrentWord(
      (previous) =>
        previous + key
    );
  }

  useEffect(() => {
    function handlePhysicalKeyboard(
      event: KeyboardEvent
    ) {
      const key =
        event.key.toUpperCase();

      if (key === "ENTER") {
        handleKeyPress("ENTER");

        return;
      }

      if (
        key === "BACKSPACE"
      ) {
        handleKeyPress(
          "BACKSPACE"
        );

        return;
      }

      if (
        /^[A-Z]$/.test(key)
      ) {
        handleKeyPress(key);
      }
    }

    window.addEventListener(
      "keydown",
      handlePhysicalKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handlePhysicalKeyboard
      );
    };
  });

  function restartGame() {
    setCurrentWord("");

    setGuesses([]);

    setStatuses([]);

    setKeyStatuses({});

    setGameOver(false);

    setWon(false);
  }

  return (
    <main className="game">

      <Title />

      <Board
        guesses={guesses}
        currentWord={currentWord}
        statuses={statuses}
      />

      <Keyboard
        onKeyPress={handleKeyPress}
        keyStatuses={keyStatuses}
      />

      {gameOver && (
        <div className="game-result">

          {won ? (
            <>
              <h2>
                🎉 Bravo !
              </h2>

              <p>
                Tu as trouvé le mot :
                {" "}
                {TARGET_WORD}
              </p>
            </>
          ) : (
            <>
              <h2>
                Partie terminée
              </h2>

              <p>
                Le mot était :
                {" "}
                {TARGET_WORD}
              </p>
            </>
          )}

          <button
            type="button"
            className="restart-button"
            onClick={
              restartGame
            }
          >
            Recommencer
          </button>

        </div>
      )}

    </main>
  );
}

export default App;