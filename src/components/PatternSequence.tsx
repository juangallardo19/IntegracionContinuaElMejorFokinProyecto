import { useState } from "react";
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

// Formas geométricas
const SHAPES = {
  circle: "🔵",
  square: "🟦",
  triangle: "🔺",
  star: "⭐",
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

  // Simular sonidos
  const playSuccessSound = () => {
    console.log("🎉 Sonido de respuesta correcta");
  };

  const playErrorSound = () => {
    console.log("❌ Sonido de error");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#00a5b5" }}>
          🧩 Secuencias y Patrones
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ¡Descubre el patrón y completa la secuencia!
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Aciertos</p>
          <p className="text-2xl font-bold" style={{ color: "#84bd00" }}>
            {score / 10}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Intentos</p>
          <p className="text-2xl font-bold" style={{ color: "#00a5b5" }}>
            {attempts}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Precisión</p>
          <p className="text-2xl font-bold text-purple-600">
            {attempts > 0 ? Math.round(((score / 10) / attempts) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Tipo de patrón */}
      <div className="text-center mb-4">
        <span className="inline-block bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
          {pattern.type === "numeric" ? "📊 Secuencia Numérica" : "🔶 Patrón Geométrico"}
        </span>
      </div>

      {/* Secuencia */}
      <div className="flex justify-center items-center gap-3 mb-8">
        {pattern.sequence.map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`
              w-16 h-16 flex items-center justify-center rounded-lg font-bold text-2xl
              ${
                item === "?"
                  ? "bg-yellow-100 dark:bg-yellow-900/30 border-2 border-dashed border-yellow-400"
                  : "bg-gray-100 dark:bg-gray-700"
              }
            `}
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* Mensaje de instrucción */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold" style={{ color: "#00a5b5" }}>
          {!selectedAnswer && "¿Qué número o figura falta?"}
          {isCorrect === true && "¡Muy bien! 🎉"}
          {isCorrect === false && "Intenta de nuevo 🤔"}
        </p>
      </div>

      {/* Opciones de respuesta */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {pattern.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(option)}
            disabled={isCorrect === true}
            className={`
              h-16 rounded-lg font-bold text-xl transition-all
              ${
                selectedAnswer === option
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
              ${isCorrect === true ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Explicación */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Patrón:</strong> {pattern.explanation}
          </p>
        </motion.div>
      )}

      {/* Botón para saltar patrón */}
      {!isCorrect && attempts > 2 && (
        <div className="text-center mt-6">
          <button
            onClick={generateNewPattern}
            className="px-4 py-2 rounded-lg text-white font-semibold text-sm transition-transform hover:scale-105"
            style={{ backgroundColor: "#00a5b5" }}
          >
            ⏭️ Siguiente patrón
          </button>
        </div>
      )}

      {/* Pista educativa */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-bold text-sm mb-2 text-center" style={{ color: "#00a5b5" }}>
          💡 Consejo
        </h4>
        <p className="text-xs text-center text-gray-700 dark:text-gray-300">
          Observa bien la secuencia completa. ¿Los números aumentan? ¿Las figuras se repiten?
          Busca el patrón y elige la respuesta correcta.
        </p>
      </div>
    </div>
  );
}
