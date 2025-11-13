import { motion } from "framer-motion";
import KeyboardGame from "../components/KeyboardGame";

export default function KeyboardView() {
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
        backgroundImage: 'url(/images/technology-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.3,
        zIndex: 0
      }} />

      <div className="educational-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
          textAlign: 'center',
          marginBottom: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
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
        </motion.div>

        {/* Componente del juego */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <KeyboardGame />
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
        </motion.div>

        {/* Tips educativos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="help-section"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 className="help-title">Consejos para Mejorar</h3>
          <ul className="help-list">
            <li>Mantén una postura correcta frente al teclado</li>
            <li>Mira la pantalla, no el teclado mientras escribes</li>
            <li>Practica todos los días unos minutos para mejorar</li>
            <li>No te preocupes por los errores, son parte del aprendizaje</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
