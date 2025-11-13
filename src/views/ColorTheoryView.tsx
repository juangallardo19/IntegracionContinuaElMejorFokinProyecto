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
        backgroundImage: 'url(/images/art-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'var(--gray-100)',
        padding: '2rem 1rem'
      }}
    >
      <div className="educational-container">
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
