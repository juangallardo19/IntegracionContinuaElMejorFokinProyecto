import { useState, useRef } from "react";
import { motion } from "framer-motion";

// Tipos de patrones
interface Pattern {
  sequence: (number | string)[];
  missingIndex: number;
  correctAnswer: number | string;
  options: (number | string)[];
  type: "numeric" | "geometric";
  explanation: string;
}

// Componentes SVG para formas geométricas
const ShapeSVG = ({ shape }: { shape: string }) => {
  const shapeStyles = {
    width: "2rem",
    height: "2rem",
    display: "inline-block",
  };

  switch (shape) {
    case "circle":
      return (
        <svg style={shapeStyles} viewBox="0 0 24 24" fill="#3b82f6">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case "square":
      return (
        <svg style={shapeStyles} viewBox="0 0 24 24" fill="#3b82f6">
          <rect x="2" y="2" width="20" height="20" />
        </svg>
      );
    case "triangle":
      return (
        <svg style={shapeStyles} viewBox="0 0 24 24" fill="#ef4444">
          <path d="M12 2 L22 22 L2 22 Z" />
        </svg>
      );
    case "star":
      return (
        <svg style={shapeStyles} viewBox="0 0 24 24" fill="#fbbf24">
          <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" />
        </svg>
      );
    default:
      return null;
  }
};

// Formas geométricas (ahora sin emojis)
const SHAPES = {
  circle: "circle",
  square: "square",
  triangle: "triangle",
  star: "star",
};

// Generar secuencias numéricas
const generateNumericPattern = (): Pattern => {
  const patterns = [
    // Secuencias de suma
    { start: 2, step: 2, length: 5, explanation: "Suma de 2 en 2" },
    { start: 5, step: 5, length: 5, explanation: "Suma de 5 en 5" },
    { start: 10, step: 10, length: 5, explanation: "Suma de 10 en 10" },
    { start: 1, step: 3, length: 5, explanation: "Suma de 3 en 3" },
    // Secuencias simples
    { start: 1, step: 1, length: 5, explanation: "Números consecutivos" },
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  const sequence = Array.from(
    { length: pattern.length },
    (_, i) => pattern.start + i * pattern.step
  );

  const missingIndex = Math.floor(Math.random() * pattern.length);
  const correctAnswer = sequence[missingIndex];

  // Generar opciones incorrectas
  const options = [
    correctAnswer,
    correctAnswer + pattern.step,
    correctAnswer - pattern.step,
    correctAnswer + 1,
  ]
    .filter((v, i, arr) => arr.indexOf(v) === i && v > 0) // Eliminar duplicados y negativos
    .slice(0, 4)
    .sort(() => Math.random() - 0.5); // Mezclar

  (sequence as (number | string)[])[missingIndex] = "?";

  return {
    sequence,
    missingIndex,
    correctAnswer,
    options,
    type: "numeric",
    explanation: pattern.explanation,
  };
};

// Generar secuencias geométricas
const generateGeometricPattern = (): Pattern => {
  const shapeKeys = Object.keys(SHAPES) as Array<keyof typeof SHAPES>;
  const patternLength = 4;

  // Crear patrón repetitivo simple (ej: círculo, cuadrado, círculo, cuadrado)
  const pattern = [
    shapeKeys[Math.floor(Math.random() * shapeKeys.length)],
    shapeKeys[Math.floor(Math.random() * shapeKeys.length)],
  ];

  const sequence = Array.from({ length: patternLength }, (_, i) => pattern[i % pattern.length]);

  const missingIndex = Math.floor(Math.random() * patternLength);
  const correctAnswer = sequence[missingIndex];

  // Generar opciones
  const options = [...new Set([correctAnswer, ...shapeKeys.slice(0, 3)])].slice(0, 4);

  (sequence as any[])[missingIndex] = "?";

  return {
    sequence: sequence.map((key: any) => (key === "?" ? "?" : SHAPES[key as keyof typeof SHAPES])),
    missingIndex,
    correctAnswer: SHAPES[correctAnswer as keyof typeof SHAPES],
    options: options.map((key) => SHAPES[key as keyof typeof SHAPES]),
    type: "geometric",
    explanation: "Patrón de figuras geométricas",
  };
};

export default function PatternSequence() {
  const [pattern, setPattern] = useState<Pattern>(generateNumericPattern());
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);

  // Generar nuevo patrón
  const generateNewPattern = () => {
    const isNumeric = Math.random() > 0.5;
    const newPattern = isNumeric ? generateNumericPattern() : generateGeometricPattern();
    setPattern(newPattern);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  // Manejar selección de respuesta
  const handleAnswer = (answer: number | string) => {
    setSelectedAnswer(answer);
    const correct = answer === pattern.correctAnswer;
    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);

    if (correct) {
      setScore((prev) => prev + 10);
      playSuccessSound();
      setShowExplanation(true);

      // Generar nuevo patrón después de un delay
      setTimeout(() => {
        generateNewPattern();
      }, 2000);
    } else {
      playErrorSound();
    }
  };

  // Reproducir sonido de éxito
  const playSuccessSound = () => {
    try {
      const audio = new Audio('/sounds/correct.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Error al reproducir sonido de éxito:', err));
    } catch (err) {
      console.log('Error al cargar sonido de éxito:', err);
    }
  };

  // Reproducir sonido de error (cancela el anterior si está sonando)
  const playErrorSound = () => {
    try {
      // Si ya hay un sonido de error reproduciéndose, lo pausamos y reiniciamos
      if (incorrectAudioRef.current) {
        incorrectAudioRef.current.pause();
        incorrectAudioRef.current.currentTime = 0;
      }

      // Crear nuevo audio
      const audio = new Audio('/sounds/incorrect.mp3');
      audio.volume = 0.3; // Volumen más bajo para que no sea tan duro
      incorrectAudioRef.current = audio;
      audio.play().catch(err => console.log('Error al reproducir sonido de error:', err));
    } catch (err) {
      console.log('Error al cargar sonido de error:', err);
    }
  };

  return (
    <div className="educational-card">
      {/* Header */}
      <div className="educational-card-header">
        <h2>Secuencias y Patrones</h2>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          Descubre el patrón y completa la secuencia
        </p>
      </div>

      <div className="educational-card-body">
        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Aciertos</div>
            <div className="stat-value success">{score / 10}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Intentos</div>
            <div className="stat-value primary">{attempts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Precisión</div>
            <div className="stat-value" style={{ color: 'var(--purple-600)' }}>
              {attempts > 0 ? Math.round(((score / 10) / attempts) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Tipo de patrón */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'var(--gray-100)',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--gray-700)'
          }}>
            {pattern.type === "numeric" ? "Secuencia Numérica" : "Patrón Geométrico"}
          </span>
        </div>

        {/* Secuencia */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          {pattern.sequence.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                width: '4rem',
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                backgroundColor: item === "?" ? 'var(--yellow-100)' : 'var(--gray-100)',
                border: item === "?" ? '2px dashed var(--yellow-400)' : '1px solid var(--gray-300)',
              }}
            >
              {typeof item === 'string' && item !== '?' ? (
                <ShapeSVG shape={item} />
              ) : (
                item
              )}
            </motion.div>
          ))}
        </div>

        {/* Mensaje de instrucción */}
        <div className="info-panel" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p className="info-text" style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--ucc-blue)' }}>
            {!selectedAnswer && "¿Qué número o figura falta?"}
            {isCorrect === true && "Muy bien"}
            {isCorrect === false && "Intenta de nuevo"}
          </p>
        </div>

        {/* Opciones de respuesta */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {pattern.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(option)}
              disabled={isCorrect === true}
              style={{
                height: '4rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                transition: 'all 0.2s',
                backgroundColor: selectedAnswer === option
                  ? (isCorrect ? 'var(--green-500)' : 'var(--red-500)')
                  : 'var(--gray-100)',
                color: selectedAnswer === option ? 'white' : 'var(--gray-700)',
                border: '1px solid var(--gray-300)',
                opacity: isCorrect === true ? 0.5 : 1,
                cursor: isCorrect === true ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {typeof option === 'string' && option !== '?' ? (
                <ShapeSVG shape={option} />
              ) : (
                option
              )}
            </motion.button>
          ))}
        </div>

        {/* Explicación */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="info-panel success"
            style={{ textAlign: 'center' }}
          >
            <p className="info-text">
              <strong>Patrón:</strong> {pattern.explanation}
            </p>
          </motion.div>
        )}

        {/* Botón para saltar patrón */}
        {!isCorrect && attempts > 2 && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={generateNewPattern}
              className="btn btn-primary"
            >
              <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Siguiente patrón
            </button>
          </div>
        )}

        {/* Pista educativa */}
        <div className="info-panel" style={{ marginTop: '2rem', borderLeftColor: 'var(--blue-500)' }}>
          <h4 className="info-title">Consejo</h4>
          <p className="info-text" style={{ textAlign: 'center' }}>
            Observa bien la secuencia completa. ¿Los números aumentan? ¿Las figuras se repiten?
            Busca el patrón y elige la respuesta correcta.
          </p>
        </div>
      </div>
    </div>
  );
}
