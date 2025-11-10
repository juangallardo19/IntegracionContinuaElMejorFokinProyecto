import { useState, useEffect } from "react";

// Definición del layout del teclado (simplificado para niños)
const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

// Palabras simples para practicar
const PRACTICE_WORDS = [
  "CASA", "GATO", "PERRO", "SOL", "MAR", "LUNA", "PAN", "MESA",
  "MAMA", "PAPA", "AGUA", "FLOR", "AMOR", "CIELO", "RIO"
];

export default function KeyboardGame() {
  const [currentWord, setCurrentWord] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [message, setMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Generar nueva palabra al iniciar
  const startGame = () => {
    const randomWord = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
    setCurrentWord(randomWord);
    setCurrentLetterIndex(0);
    setScore(0);
    setErrors(0);
    setMessage("¡Presiona las teclas correctas!");
    setIsPlaying(true);
  };

  // Obtener la letra actual que debe presionar
  const currentTargetLetter = currentWord[currentLetterIndex];

  // Manejar presión de teclas
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.key.toUpperCase();

      // Ignorar teclas especiales
      if (pressedKey.length > 1) return;

      if (pressedKey === currentTargetLetter) {
        // Tecla correcta
        playSuccessSound();
        setScore(prev => prev + 10);
        setMessage("¡Muy bien! ✨");

        // Avanzar a la siguiente letra
        if (currentLetterIndex + 1 < currentWord.length) {
          setCurrentLetterIndex(prev => prev + 1);
        } else {
          // Palabra completada
          setMessage("¡Palabra completada! 🎉");
          setTimeout(() => {
            const newWord = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
            setCurrentWord(newWord);
            setCurrentLetterIndex(0);
            setMessage("¡Nueva palabra!");
          }, 1500);
        }
      } else {
        // Tecla incorrecta
        playErrorSound();
        setErrors(prev => prev + 1);
        setMessage("Intenta de nuevo 🤔");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, currentTargetLetter, currentLetterIndex, currentWord]);

  // Simular sonido de éxito
  const playSuccessSound = () => {
    // En una implementación real, usaríamos Web Audio API
    console.log("🎵 Sonido de éxito");
  };

  // Simular sonido de error
  const playErrorSound = () => {
    // En una implementación real, usaríamos Web Audio API
    console.log("🔊 Sonido de error");
  };

  // Verificar si una tecla debe estar resaltada
  const isKeyHighlighted = (key: string): boolean => {
    return isPlaying && key === currentTargetLetter;
  };

  // Verificar si una letra ya fue escrita
  const isLetterTyped = (index: number): boolean => {
    return index < currentLetterIndex;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#00a5b5" }}>
          💻 El Teclado Mágico
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ¡Aprende a escribir presionando las teclas correctas!
        </p>
      </div>

      {/* Botón de inicio */}
      {!isPlaying && (
        <div className="text-center mb-6">
          <button
            onClick={startGame}
            className="px-6 py-3 rounded-lg text-white font-bold text-lg transition-transform hover:scale-105"
            style={{ backgroundColor: "#84bd00" }}
          >
            🚀 Comenzar a Practicar
          </button>
        </div>
      )}

      {/* Panel de información */}
      {isPlaying && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Puntos</p>
            <p className="text-2xl font-bold" style={{ color: "#00a5b5" }}>
              {score}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Errores</p>
            <p className="text-2xl font-bold text-red-500">{errors}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Precisión</p>
            <p className="text-2xl font-bold" style={{ color: "#84bd00" }}>
              {score + errors > 0 ? Math.round((score / (score + errors * 10)) * 100) : 0}%
            </p>
          </div>
        </div>
      )}

      {/* Mensaje de retroalimentación */}
      {isPlaying && (
        <div className="text-center mb-6">
          <p className="text-xl font-semibold" style={{ color: "#00a5b5" }}>
            {message}
          </p>
        </div>
      )}

      {/* Palabra a escribir */}
      {isPlaying && (
        <div className="flex justify-center gap-2 mb-8">
          {currentWord.split("").map((letter, index) => (
            <div
              key={index}
              className={`
                w-12 h-16 flex items-center justify-center text-3xl font-bold rounded-lg
                ${isLetterTyped(index) ? "bg-green-100 text-green-700" : "bg-gray-100 dark:bg-gray-700"}
                ${index === currentLetterIndex ? "ring-4 ring-blue-400 animate-pulse" : ""}
              `}
            >
              {letter}
            </div>
          ))}
        </div>
      )}

      {/* Teclado visual */}
      {isPlaying && (
        <div className="space-y-2">
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((key) => (
                <div
                  key={key}
                  className={`
                    w-12 h-12 flex items-center justify-center text-lg font-bold rounded-lg
                    transition-all duration-200
                    ${
                      isKeyHighlighted(key)
                        ? "ring-4 ring-yellow-400 animate-bounce text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }
                  `}
                  style={
                    isKeyHighlighted(key)
                      ? { backgroundColor: "#84bd00" }
                      : {}
                  }
                >
                  {key}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Instrucciones */}
      {isPlaying && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            👀 Mira la tecla que brilla y presiónala en tu teclado
          </p>
        </div>
      )}
    </div>
  );
}
