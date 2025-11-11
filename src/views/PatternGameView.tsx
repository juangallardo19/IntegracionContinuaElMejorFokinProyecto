import { useState } from "react";
import PatternSequence from "../components/PatternSequence";
import BlockPuzzle from "../components/BlockPuzzle";

export default function PatternGameView() {
  const [activeGame, setActiveGame] = useState<"patterns" | "puzzle">("patterns");

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--gray-100)', padding: '2rem 1rem' }}>
      <div className="educational-container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: 'var(--ucc-blue)'
          }}>
            Pensamiento Lógico
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-600)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Desarrolla tu razonamiento lógico identificando patrones y resolviendo rompecabezas
          </p>
        </div>

        {/* Selector de juego */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveGame("patterns")}
            className={`btn ${activeGame === "patterns" ? "btn-primary" : "btn-secondary"}`}
            style={{ minWidth: '200px' }}
          >
            <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Secuencias y Patrones
          </button>
          <button
            onClick={() => setActiveGame("puzzle")}
            className={`btn ${activeGame === "puzzle" ? "btn-primary" : "btn-secondary"}`}
            style={{ minWidth: '200px' }}
          >
            <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            Rompecabezas de Bloques
          </button>
        </div>

        {/* Componente del juego activo */}
        {activeGame === "patterns" ? <PatternSequence /> : <BlockPuzzle />}

        {/* Información adicional */}
        <div className="feature-grid">
          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M12 16a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
            </svg>
            <h3 className="feature-title">Desarrolla tu Mente</h3>
            <p className="feature-description">
              Ejercita tu cerebro reconociendo patrones matemáticos y geométricos
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" style={{ color: 'var(--ucc-green)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <h3 className="feature-title" style={{ color: 'var(--ucc-green)' }}>
              Mejora Continua
            </h3>
            <p className="feature-description">
              Cada patrón completado mejora tus habilidades de razonamiento lógico
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 className="feature-title">Precisión y Rapidez</h3>
            <p className="feature-description">
              Mejora tu precisión identificando los patrones correctos
            </p>
          </div>
        </div>

        {/* Sección educativa */}
        <div className="educational-card" style={{ marginTop: '2rem' }}>
          <div className="educational-card-header">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
              Qué son los Patrones
            </h3>
          </div>
          <div className="educational-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--ucc-green)' }}>
                  Patrones Numéricos
                </h4>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--gray-700)' }}>
                  Los patrones numéricos son secuencias de números que siguen una regla específica.
                  Por ejemplo:
                </p>
                <ul className="help-list">
                  <li><strong>2, 4, 6, 8...</strong> - Suma de 2 en 2</li>
                  <li><strong>5, 10, 15, 20...</strong> - Suma de 5 en 5</li>
                  <li><strong>1, 2, 3, 4...</strong> - Números consecutivos</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--ucc-blue)' }}>
                  Patrones Geométricos
                </h4>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--gray-700)' }}>
                  Los patrones geométricos usan figuras que se repiten siguiendo un orden.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips para mejorar */}
        <div className="help-section">
          <h3 className="help-title">Consejos para Identificar Patrones</h3>
          <ul className="help-list">
            <li>Observa todos los elementos de la secuencia con atención</li>
            <li>Busca qué tienen en común los elementos que ves</li>
            <li>En números: ¿aumentan?, ¿disminuyen?, ¿cuánto cambian?</li>
            <li>En figuras: ¿se repiten?, ¿cuál es el orden?</li>
            <li>Practica mucho, cada patrón te hace mejor</li>
          </ul>
        </div>

        {/* Beneficios educativos */}
        <div className="info-panel success" style={{ marginTop: '2rem' }}>
          <h4 className="info-title">Beneficios de Trabajar con Patrones</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <strong>Desarrollo cognitivo:</strong> Mejora tu capacidad de razonamiento y análisis
            </div>
            <div>
              <strong>Concentración:</strong> Aumenta tu atención y enfoque
            </div>
            <div>
              <strong>Matemáticas:</strong> Fortalece tus bases matemáticas
            </div>
            <div>
              <strong>Resolución de problemas:</strong> Aprende a enfrentar desafíos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
