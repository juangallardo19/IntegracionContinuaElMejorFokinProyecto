import { motion } from "framer-motion";
import PatternSequence from "../components/PatternSequence";
import BlockPuzzle from "../components/BlockPuzzle";

export default function PatternGameView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--gray-100)',
        padding: '2rem 1rem',
        position: 'relative'
      }}
    >
      {/* Imagen de fondo PNG con opacidad reducida */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/images/logic-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.3,
        zIndex: 0
      }} />

      <div className="educational-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Rompecabezas de Bloques - Primero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <BlockPuzzle />
        </motion.div>

        {/* Espacio entre componentes */}
        <div style={{ height: '3rem' }} />

        {/* Secuencias y Patrones - Segundo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PatternSequence />
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="feature-grid"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}
        >
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
        </motion.div>

        {/* Sección educativa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="educational-card"
          style={{
            marginTop: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
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
        </motion.div>

        {/* Tips para mejorar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="help-section"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '2rem'
          }}
        >
          <h3 className="help-title">Consejos para Identificar Patrones</h3>
          <ul className="help-list">
            <li>Observa todos los elementos de la secuencia con atención</li>
            <li>Busca qué tienen en común los elementos que ves</li>
            <li>En números: ¿aumentan?, ¿disminuyen?, ¿cuánto cambian?</li>
            <li>En figuras: ¿se repiten?, ¿cuál es el orden?</li>
            <li>Practica mucho, cada patrón te hace mejor</li>
          </ul>
        </motion.div>

        {/* Beneficios educativos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="info-panel success"
          style={{
            marginTop: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
}
