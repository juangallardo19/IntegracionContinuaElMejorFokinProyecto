import { motion } from "framer-motion";
import DrawingCanvas from "../components/DrawingCanvas";

export default function ColorTheoryView() {
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
        backgroundImage: 'url(/images/art-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.3,
        zIndex: 0
      }} />

      <div className="educational-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Componente del lienzo de dibujo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DrawingCanvas />
        </motion.div>
      </div>
    </motion.div>
  );
}
