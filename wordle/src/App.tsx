import './App.css'
import InfoButton from './règles.tsx'
import './règles.css'

function App() {
  return (
    <main className="menu-shell">
      <header className="menu-header">
        <h1>Wordle</h1>
        <p className="subtitle">Trouvez le mot en six essais</p>
      </header>

      <section className="menu-panel" aria-label="Menu principal">
        <div className="letter-mark" aria-hidden="true">
          <span>W</span>
          <span className="correct">O</span>
          <span>R</span>
          <span className="present">D</span>
               <span>L</span>
                    <span>E</span>
        </div>

        <div className="menu-actions">
          <button type="button" className="play-button">
            Jouer
            <span aria-hidden="true">→</span>
          </button>
          <InfoButton />
        </div>
      </section>

      <footer className="menu-footer">Un jeu de Van et Gabor</footer>
    </main>
  )
}



export default App