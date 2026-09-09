import { useState } from "react";

export default function InfoButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="info">
      <button
        type="button"
        className="info-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? "Masquer" : "Règles"}
        <span className={open ? "arrow rotate" : "arrow"}>⌄</span>
      </button>

      <div className={`info-text ${open ? "show" : ""}`}>
        <p>Devinez un mot de cinq lettres en six tentatives maximum.</p>
        <div className="rules-list">
          <div><span className="rule-tile correct">V</span><span>Bonne lettre, bonne place</span></div>
          <div><span className="rule-tile present">A</span><span>Bonne lettre, mais mauvaise place</span></div>
          <div><span className="rule-tile absent">N</span><span>La lettre n'est pas dans le mot</span></div>
        </div>
      </div>
    </div>
  );
}