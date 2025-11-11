import ColorMixer from "../components/ColorMixer";

export default function ColorTheoryView() {
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
            Educación Artística
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-600)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Descubre el fascinante mundo del color y aprende cómo se crean los diferentes tonos
          </p>
        </div>

        {/* Componente del mezclador */}
        <ColorMixer />

        {/* Información adicional */}
        <div className="feature-grid">
          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <h3 className="feature-title">Aprende Jugando</h3>
            <p className="feature-description">
              Experimenta con las mezclas y descubre nuevos colores de forma divertida
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" style={{ color: 'var(--ucc-green)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <h3 className="feature-title" style={{ color: 'var(--ucc-green)' }}>
              Teoría Práctica
            </h3>
            <p className="feature-description">
              Comprende cómo funcionan los colores primarios y secundarios
            </p>
          </div>

          <div className="feature-card">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <h3 className="feature-title">Desarrolla Creatividad</h3>
            <p className="feature-description">
              Explora todas las combinaciones posibles y desarrolla tu creatividad
            </p>
          </div>
        </div>

        {/* Sección educativa sobre la teoría del color */}
        <div className="educational-card" style={{ marginTop: '2rem' }}>
          <div className="educational-card-header">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Aprende sobre los Colores</h3>
          </div>
          <div className="educational-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Colores primarios */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--red-500)' }}>
                  Colores Primarios
                </h4>
                <ul className="help-list">
                  <li>Son los colores base que no se pueden crear mezclando otros</li>
                  <li>Los tres colores primarios son: Rojo, Azul y Amarillo</li>
                  <li>Con estos tres colores puedes crear muchos otros</li>
                </ul>
              </div>

              {/* Colores secundarios */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--green-500)' }}>
                  Colores Secundarios
                </h4>
                <ul className="help-list">
                  <li><strong>Rojo + Azul =</strong> Morado</li>
                  <li><strong>Rojo + Amarillo =</strong> Naranja</li>
                  <li><strong>Azul + Amarillo =</strong> Verde</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Curiosidades del color */}
        <div className="info-panel warning" style={{ marginTop: '2rem' }}>
          <h4 className="info-title">Dato Interesante</h4>
          <p className="info-text">
            Los artistas usan la <strong>rueda cromática</strong> para entender mejor las relaciones
            entre los colores. Sigue practicando y conviértete en un experto del color.
          </p>
        </div>
      </div>
    </div>
  );
}
