import KeyboardGame from "../components/KeyboardGame";

export default function KeyboardView() {
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
            Tecnología e Informática
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-600)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Aprende a usar el teclado de manera divertida y mejora tus habilidades de mecanografía
          </p>
        </div>

        {/* Componente del juego */}
        <KeyboardGame />

        {/* Información adicional */}
        <div className="feature-grid">
          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M10 16h4" />
            </svg>
            <h3 className="feature-title">Aprende Practicando</h3>
            <p className="feature-description">
              Practica la ubicación de las teclas de forma interactiva
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" style={{ color: 'var(--ucc-green)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3 className="feature-title" style={{ color: 'var(--ucc-green)' }}>
              Mejora tu Precisión
            </h3>
            <p className="feature-description">
              Cada tecla correcta suma puntos y mejora tu precisión
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            <h3 className="feature-title">Progreso Continuo</h3>
            <p className="feature-description">
              Practica con diferentes palabras y sigue mejorando
            </p>
          </div>
        </div>

        {/* Tips educativos */}
        <div className="help-section">
          <h3 className="help-title">Consejos para Mejorar</h3>
          <ul className="help-list">
            <li>Mantén una postura correcta frente al teclado</li>
            <li>Mira la pantalla, no el teclado mientras escribes</li>
            <li>Practica todos los días unos minutos para mejorar</li>
            <li>No te preocupes por los errores, son parte del aprendizaje</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
