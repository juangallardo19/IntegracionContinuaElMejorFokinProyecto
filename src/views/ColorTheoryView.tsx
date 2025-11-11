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
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>La Ciencia del Color</h3>
          </div>
          <div className="educational-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Colores primarios */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--red-500)' }}>
                  Colores Primarios
                </h4>
                <ul className="help-list">
                  <li>Son los colores base que no se pueden crear mezclando otros colores</li>
                  <li>Los tres colores primarios son: <strong>Rojo, Azul y Amarillo</strong></li>
                  <li>Todos los demás colores se crean combinando estos tres</li>
                  <li>Son como los "ingredientes básicos" de una receta de colores</li>
                </ul>
              </div>

              {/* Colores secundarios */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--green-500)' }}>
                  Colores Secundarios
                </h4>
                <ul className="help-list">
                  <li><strong>Rojo + Azul =</strong> Morado (Violeta)</li>
                  <li><strong>Rojo + Amarillo =</strong> Naranja</li>
                  <li><strong>Azul + Amarillo =</strong> Verde</li>
                  <li>Se forman mezclando dos colores primarios en partes iguales</li>
                </ul>
              </div>

              {/* Colores terciarios */}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: '#f59e0b' }}>
                  Colores Terciarios
                </h4>
                <ul className="help-list">
                  <li>Se crean mezclando un color primario con uno secundario</li>
                  <li>Ejemplos: rojo-naranja, amarillo-verde, azul-violeta</li>
                  <li>Hay 6 colores terciarios en total</li>
                  <li>Crean transiciones suaves entre colores</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rueda Cromática y Relaciones de Color */}
        <div className="educational-card" style={{ marginTop: '2rem' }}>
          <div className="educational-card-header">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>La Rueda Cromática</h3>
          </div>
          <div className="educational-card-body">
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
              La rueda cromática es una herramienta visual que organiza los colores en un círculo.
              Los artistas y diseñadores la usan para crear combinaciones armoniosas de colores.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="info-panel" style={{ borderLeftColor: '#8b5cf6' }}>
                <h4 className="info-title">Colores Complementarios</h4>
                <p className="info-text">
                  Son colores opuestos en la rueda cromática. Cuando se colocan juntos, crean un
                  contraste fuerte y vibrante. Ejemplo: rojo y verde, azul y naranja.
                </p>
              </div>

              <div className="info-panel" style={{ borderLeftColor: '#06b6d4' }}>
                <h4 className="info-title">Colores Análogos</h4>
                <p className="info-text">
                  Son colores que están juntos en la rueda cromática. Crean armonía y se ven bien
                  juntos. Ejemplo: azul, azul-verde y verde.
                </p>
              </div>

              <div className="info-panel" style={{ borderLeftColor: '#ec4899' }}>
                <h4 className="info-title">Colores Triádicos</h4>
                <p className="info-text">
                  Son tres colores equidistantes en la rueda. Los colores primarios (rojo, azul, amarillo)
                  forman una tríada perfecta.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Temperatura del Color */}
        <div className="educational-card" style={{ marginTop: '2rem' }}>
          <div className="educational-card-header">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Temperatura del Color</h3>
          </div>
          <div className="educational-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: '#dc2626' }}>
                  Colores Cálidos 🔥
                </h4>
                <ul className="help-list">
                  <li>Incluyen rojo, naranja, amarillo y sus variaciones</li>
                  <li>Nos recuerdan el fuego, el sol y el calor</li>
                  <li>Transmiten energía, pasión y alegría</li>
                  <li>Parecen "avanzar" en un dibujo o pintura</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '1rem', color: '#2563eb' }}>
                  Colores Fríos ❄️
                </h4>
                <ul className="help-list">
                  <li>Incluyen azul, verde, violeta y sus variaciones</li>
                  <li>Nos recuerdan el agua, el hielo y la naturaleza</li>
                  <li>Transmiten calma, tranquilidad y serenidad</li>
                  <li>Parecen "retroceder" en un dibujo o pintura</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Propiedades del Color */}
        <div className="educational-card" style={{ marginTop: '2rem' }}>
          <div className="educational-card-header">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Propiedades del Color</h3>
          </div>
          <div className="educational-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div className="info-panel">
                <h4 className="info-title">Tono (Hue)</h4>
                <p className="info-text">
                  Es el nombre del color en sí: rojo, azul, verde, etc. Es lo que distingue un
                  color de otro en la rueda cromática.
                </p>
              </div>

              <div className="info-panel">
                <h4 className="info-title">Saturación</h4>
                <p className="info-text">
                  Es la intensidad o pureza del color. Los colores muy saturados son vibrantes,
                  mientras que los poco saturados son más apagados o grisáceos.
                </p>
              </div>

              <div className="info-panel">
                <h4 className="info-title">Valor (Brillo)</h4>
                <p className="info-text">
                  Es qué tan claro u oscuro es un color. Agregando blanco obtienes tintes (más claros),
                  y agregando negro obtienes sombras (más oscuros).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* El Color en el Arte */}
        <div className="info-panel warning" style={{ marginTop: '2rem' }}>
          <h4 className="info-title">El Color en el Arte</h4>
          <div className="info-text" style={{ lineHeight: '1.8' }}>
            <p style={{ marginBottom: '0.75rem' }}>
              Los artistas famosos han usado el color de maneras únicas:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '0.75rem' }}>
              <li><strong>Vincent van Gogh</strong> usaba amarillos brillantes para expresar emociones</li>
              <li><strong>Pablo Picasso</strong> tuvo su "período azul" donde pintaba principalmente en tonos azules</li>
              <li><strong>Claude Monet</strong> estudió cómo cambia el color de un objeto según la luz del día</li>
            </ul>
            <p>
              Los colores pueden contar historias y hacer sentir emociones. ¡Sigue practicando y descubre tu propia paleta artística!
            </p>
          </div>
        </div>

        {/* Dato Curioso */}
        <div className="info-panel" style={{ marginTop: '2rem', backgroundColor: '#f0fdf4', borderLeftColor: '#22c55e' }}>
          <h4 className="info-title" style={{ color: '#22c55e' }}>¿Sabías que...?</h4>
          <p className="info-text">
            El ojo humano puede distinguir aproximadamente <strong>10 millones de colores diferentes</strong>.
            Además, la percepción del color puede variar entre personas. Algunas personas tienen una
            condición llamada sinestesia donde pueden "ver" colores cuando escuchan música.
          </p>
        </div>
      </div>
    </div>
  );
}
