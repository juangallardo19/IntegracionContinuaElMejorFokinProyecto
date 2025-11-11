import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomeContent() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--gray-100)', padding: '2rem 1rem' }}>
      <div className="educational-container">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          {/* SVG Logo Educativo */}
          <svg
            style={{ width: '8rem', height: '8rem', margin: '0 auto 1.5rem' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ucc-blue)"
            strokeWidth="1.5"
          >
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: 'var(--ucc-blue)',
            lineHeight: '1.2'
          }}>
            Mentes Creativas
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--gray-600)',
            maxWidth: '42rem',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Plataforma educativa interactiva para estudiantes de 4to y 5to grado.
            Aprende, explora y desarrolla tus habilidades en tecnología, arte y pensamiento lógico.
          </p>
        </motion.div>

        {/* Áreas Educativas */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}
        >
          {/* Tecnología e Informática */}
          <Link to="/teclado-magico" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(0, 165, 181, 0.15)' }}
              className="educational-card"
              style={{ cursor: 'pointer', height: '100%', transition: 'all 0.3s' }}
            >
              <div style={{ padding: '2rem' }}>
                <svg
                  style={{ width: '3rem', height: '3rem', marginBottom: '1rem', color: 'var(--ucc-blue)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
                </svg>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--ucc-blue)' }}>
                  Tecnología e Informática
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                  Aprende mecanografía y desarrolla habilidades digitales con ejercicios interactivos de teclado.
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Educación Artística */}
          <Link to="/teoria-color" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(132, 189, 0, 0.15)' }}
              className="educational-card"
              style={{ cursor: 'pointer', height: '100%', transition: 'all 0.3s' }}
            >
              <div style={{ padding: '2rem' }}>
                <svg
                  style={{ width: '3rem', height: '3rem', marginBottom: '1rem', color: 'var(--ucc-green)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--ucc-green)' }}>
                  Educación Artística
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                  Descubre la teoría del color mezclando colores primarios y creando colores secundarios.
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Pensamiento Lógico */}
          <Link to="/secuencias-patrones" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(0, 165, 181, 0.15)' }}
              className="educational-card"
              style={{ cursor: 'pointer', height: '100%', transition: 'all 0.3s' }}
            >
              <div style={{ padding: '2rem' }}>
                <svg
                  style={{ width: '3rem', height: '3rem', marginBottom: '1rem', color: 'var(--purple-600)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M12 16a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
                </svg>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--purple-600)' }}>
                  Pensamiento Lógico
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                  Desarrolla tu razonamiento identificando patrones numéricos y geométricos en secuencias.
                </p>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Sección Informativa */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="educational-card"
          style={{ marginBottom: '2rem' }}
        >
          <div className="educational-card-header">
            <h2>Sobre Mentes Creativas</h2>
          </div>
          <div className="educational-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.75rem', color: 'var(--ucc-blue)' }}>
                  Aprendizaje Interactivo
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-700)', lineHeight: '1.6' }}>
                  Cada módulo está diseñado para que los estudiantes aprendan de forma práctica y divertida,
                  con retroalimentación inmediata y actividades multimedia.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.75rem', color: 'var(--ucc-green)' }}>
                  Educación de Calidad
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-700)', lineHeight: '1.6' }}>
                  Contenidos alineados con los estándares curriculares colombianos para estudiantes
                  de educación básica primaria (8-11 años).
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.75rem', color: 'var(--purple-600)' }}>
                  Seguimiento de Progreso
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-700)', lineHeight: '1.6' }}>
                  Sistema de estadísticas y métricas que permite a estudiantes y profesores
                  visualizar el avance en cada área de aprendizaje.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="info-panel success"
          style={{ textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Comienza tu Aventura de Aprendizaje
          </h3>
          <p style={{ fontSize: '1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Selecciona cualquiera de las tres áreas educativas del menú lateral para comenzar a explorar y aprender.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/teclado-magico" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">
                Comenzar Ahora
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
