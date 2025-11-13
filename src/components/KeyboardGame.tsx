import { useState, useEffect, useRef } from "react";

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
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);

  // Generar nueva palabra al iniciar
  const startGame = () => {
    const randomWord = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
    setCurrentWord(randomWord);
    setCurrentLetterIndex(0);
    setScore(0);
    setErrors(0);
    setMessage("Presiona las teclas correctas");
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
        setMessage("Correcto");

        // Avanzar a la siguiente letra
        if (currentLetterIndex + 1 < currentWord.length) {
          setCurrentLetterIndex(prev => prev + 1);
        } else {
          // Palabra completada - incrementar índice para mostrar la última letra en verde
          setCurrentLetterIndex(prev => prev + 1);
          setMessage("Palabra completada");
          setTimeout(() => {
            const newWord = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
            setCurrentWord(newWord);
            setCurrentLetterIndex(0);
            setMessage("Nueva palabra");
          }, 1500);
        }
      } else {
        // Tecla incorrecta
        playErrorSound();
        setErrors(prev => prev + 1);
        setMessage("Intenta de nuevo");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, currentTargetLetter, currentLetterIndex, currentWord]);

  // Reproducir sonido de éxito
  const playSuccessSound = () => {
    try {
      const audio = new Audio('/sounds/correct.mp3');
      audio.volume = 0.5; // Volumen al 50%
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

  // Verificar si una tecla debe estar resaltada
  const isKeyHighlighted = (key: string): boolean => {
    return isPlaying && key === currentTargetLetter;
  };

  // Verificar si una letra ya fue escrita
  const isLetterTyped = (index: number): boolean => {
    return index < currentLetterIndex;
  };

  return (
    <div className="educational-card">
      {/* Header */}
      <div className="educational-card-header">
        <h2>El Teclado Mágico</h2>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          Aprende a escribir presionando las teclas correctas
        </p>
      </div>

      <div className="educational-card-body">
        {/* Botón de inicio */}
        {!isPlaying && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={startGame}
              className="btn btn-success"
              style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Comenzar a Practicar
            </button>
          </div>
        )}

        {/* Panel de información */}
        {isPlaying && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Puntos</div>
                <div className="stat-value primary">{score}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Errores</div>
                <div className="stat-value danger">{errors}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Precisión</div>
                <div className="stat-value success">
                  {score + errors > 0 ? Math.round((score / (score + errors * 10)) * 100) : 0}%
                </div>
              </div>
            </div>

            {/* Mensaje de retroalimentación */}
            <div className="info-panel" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p className="info-text" style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--ucc-blue)' }}>
                {message}
              </p>
            </div>

            {/* Palabra a escribir */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {currentWord.split("").map((letter, index) => (
                <div
                  key={index}
                  style={{
                    width: '3rem',
                    height: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    backgroundColor: isLetterTyped(index) ? 'var(--ucc-green)' : 'var(--gray-200)',
                    color: isLetterTyped(index) ? 'white' : 'var(--gray-700)',
                    border: index === currentLetterIndex ? '3px solid var(--ucc-blue)' : '1px solid var(--gray-300)',
                    boxShadow: index === currentLetterIndex ? '0 0 0 3px rgba(0, 165, 181, 0.2)' : 'none',
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>

            {/* Teclado visual */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '600px', margin: '0 auto' }}>
              {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
                  {row.map((key) => (
                    <div
                      key={key}
                      style={{
                        width: '3rem',
                        height: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        borderRadius: '0.375rem',
                        backgroundColor: isKeyHighlighted(key) ? 'var(--ucc-green)' : 'var(--gray-200)',
                        color: isKeyHighlighted(key) ? 'white' : 'var(--gray-700)',
                        border: '1px solid var(--gray-300)',
                        boxShadow: isKeyHighlighted(key) ? '0 4px 8px rgba(132, 189, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
                        transform: isKeyHighlighted(key) ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {key}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Instrucciones */}
            <div className="info-panel" style={{ marginTop: '2rem' }}>
              <p className="info-text" style={{ textAlign: 'center' }}>
                Observa la tecla resaltada en verde y presiónala en tu teclado
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
