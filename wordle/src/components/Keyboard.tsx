import type { KeyStatus } from "../types/games";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyStatuses: Record<string, KeyStatus>;
}

const keyboardRows = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "BACKSPACE"],
];

function Keyboard({
  onKeyPress,
  keyStatuses,
}: KeyboardProps) {
  function getBackgroundColor(key: string) {
    const status = keyStatuses[key];

    if (status === "correct") {
      return "#538D4E";
    }

    if (status === "present") {
      return "#B59F3B";
    }

    if (status === "absent") {
      return "#3A3A3C";
    }

    return "#666666";
  }

  return (
    <div className="keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="keyboard-row"
        >
          {row.map((key) => {
            const isLarge =
              key === "ENTER" ||
              key === "BACKSPACE";

            let buttonText = key;

            if (key === "ENTER") {
              buttonText = "↵";
            }

            if (key === "BACKSPACE") {
              buttonText = "⌫";
            }

            return (
              <button
                key={key}
                type="button"
                className={
                  isLarge
                    ? "keyboard-key keyboard-key-large"
                    : "keyboard-key"
                }
                onClick={() =>
                  onKeyPress(key)
                }
                style={{
                  backgroundColor:
                    getBackgroundColor(key),
                }}
              >
                {buttonText}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;