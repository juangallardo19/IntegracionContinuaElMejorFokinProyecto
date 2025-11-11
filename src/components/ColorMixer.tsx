import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Definición de colores primarios
const PRIMARY_COLORS = {
  red: { name: "Rojo", hex: "#ef4444", rgb: [239, 68, 68], temp: "cálido" },
  blue: { name: "Azul", hex: "#3b82f6", rgb: [59, 130, 246], temp: "frío" },
  yellow: { name: "Amarillo", hex: "#fde047", rgb: [253, 224, 71], temp: "cálido" },
};

// Desafíos para el usuario
const CHALLENGES = [
  { name: "Morado", colors: ["red", "blue"], description: "Mezcla rojo y azul" },
  { name: "Naranja", colors: ["red", "yellow"], description: "Mezcla rojo y amarillo" },
  { name: "Verde", colors: ["blue", "yellow"], description: "Mezcla azul y amarillo" },
  { name: "Morado Intenso", colors: ["red", "blue"], ratio: [0.4, 0.6], description: "Más azul que rojo" },
  { name: "Naranja Suave", colors: ["red", "yellow"], ratio: [0.3, 0.7], description: "Más amarillo que rojo" },
];

// Logros desbloqueables
const ACHIEVEMENTS = [
  { id: 1, name: "Primera Mezcla", description: "Realiza tu primera mezcla", requirement: 1 },
  { id: 2, name: "Experimentador", description: "Realiza 5 mezclas", requirement: 5 },
  { id: 3, name: "Explorador de Colores", description: "Crea los 3 colores secundarios", requirement: 3 },
  { id: 4, name: "Maestro del Color", description: "Completa 3 desafíos", requirement: 3 },
];

// Función para mezclar colores RGB con proporción
const mixColors = (color1: number[], color2: number[], ratio: number = 0.5): string => {
  const r = Math.floor(color1[0] * (1 - ratio) + color2[0] * ratio);
  const g = Math.floor(color1[1] * (1 - ratio) + color2[1] * ratio);
  const b = Math.floor(color1[2] * (1 - ratio) + color2[2] * ratio);
  return `rgb(${r}, ${g}, ${b})`;
};

// Función para obtener el nombre del color resultante
const getColorName = (color1: string, color2: string): string => {
  const combinations: Record<string, string> = {
    "red-blue": "Morado",
    "blue-red": "Morado",
    "red-yellow": "Naranja",
    "yellow-red": "Naranja",
    "blue-yellow": "Verde",
    "yellow-blue": "Verde",
  };
  return combinations[`${color1}-${color2}`] || "Color mezclado";
};

// Función para determinar si un color es cálido o frío
const getColorTemperature = (color1Key: string, color2Key: string): string => {
  const color1 = PRIMARY_COLORS[color1Key as ColorKey];
  const color2 = PRIMARY_COLORS[color2Key as ColorKey];

  if (color1.temp === color2.temp) return color1.temp;
  return "neutro";
};

type ColorKey = keyof typeof PRIMARY_COLORS;

export default function ColorMixer() {
  const [selectedColor1, setSelectedColor1] = useState<ColorKey | null>(null);
  const [selectedColor2, setSelectedColor2] = useState<ColorKey | null>(null);
  const [mixedColor, setMixedColor] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [colorRatio, setColorRatio] = useState(0.5);
  const [colorHistory, setColorHistory] = useState<Array<{ color: string; name: string }>>([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<number[]>([]);
  const [secondaryColorsCreated, setSecondaryColorsCreated] = useState<Set<string>>(new Set());
  const [showChallengeMode, setShowChallengeMode] = useState(false);

  // Función para seleccionar el primer color
  const handleSelectColor1 = (color: ColorKey) => {
    setSelectedColor1(color);
    setSelectedColor2(null);
    setMixedColor(null);
    setColorName("");
    playColorSound();
  };

  // Función para seleccionar el segundo color
  const handleSelectColor2 = (color: ColorKey) => {
    if (!selectedColor1 || color === selectedColor1) return;

    setSelectedColor2(color);
    setShowAnimation(true);

    // Simular animación de mezcla
    setTimeout(() => {
      const color1Data = PRIMARY_COLORS[selectedColor1];
      const color2Data = PRIMARY_COLORS[color];
      const mixed = mixColors(color1Data.rgb, color2Data.rgb, colorRatio);
      const name = getColorName(selectedColor1, color);

      setMixedColor(mixed);
      setColorName(name);
      setScore((prev) => prev + 10);

      // Agregar al historial
      setColorHistory((prev) => [...prev.slice(-4), { color: mixed, name }]);

      // Rastrear colores secundarios creados
      if (["Morado", "Naranja", "Verde"].includes(name)) {
        setSecondaryColorsCreated((prev) => new Set(prev).add(name));
      }

      // Verificar desafío completado
      if (showChallengeMode) {
        const challenge = CHALLENGES[currentChallenge];
        const correctColors =
          (challenge.colors.includes(selectedColor1) && challenge.colors.includes(color));

        if (correctColors) {
          setChallengesCompleted((prev) => prev + 1);
          setCurrentChallenge((prev) => (prev + 1) % CHALLENGES.length);
        }
      }

      setShowAnimation(false);
      playSuccessSound();
    }, 1000);
  };

  // Verificar logros
  useEffect(() => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (unlockedAchievements.includes(achievement.id)) return;

      let unlocked = false;
      if (achievement.id === 1 && score >= 10) unlocked = true;
      if (achievement.id === 2 && score >= 50) unlocked = true;
      if (achievement.id === 3 && secondaryColorsCreated.size >= 3) unlocked = true;
      if (achievement.id === 4 && challengesCompleted >= 3) unlocked = true;

      if (unlocked) {
        setUnlockedAchievements((prev) => [...prev, achievement.id]);
      }
    });
  }, [score, secondaryColorsCreated, challengesCompleted, unlockedAchievements]);

  // Simular sonidos
  const playColorSound = () => {
    console.log("Sonido de selección de color");
  };

  const playSuccessSound = () => {
    console.log("Sonido de mezcla exitosa");
  };

  // Reiniciar mezcla
  const resetMix = () => {
    setSelectedColor1(null);
    setSelectedColor2(null);
    setMixedColor(null);
    setColorName("");
    setColorRatio(0.5);
  };

  return (
    <div className="educational-card">
      {/* Header */}
      <div className="educational-card-header">
        <h2>Laboratorio de Mezclas de Color</h2>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          Experimenta con colores primarios, descubre secundarios y completa desafíos
        </p>
      </div>

      <div className="educational-card-body">
        {/* Estadísticas y Modo de Juego */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-label">Mezclas Realizadas</div>
            <div className="stat-value success">{score / 10}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Colores Secundarios</div>
            <div className="stat-value" style={{ color: 'var(--ucc-blue)' }}>{secondaryColorsCreated.size}/3</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Desafíos Completados</div>
            <div className="stat-value" style={{ color: 'var(--ucc-green)' }}>{challengesCompleted}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Logros</div>
            <div className="stat-value" style={{ color: '#f59e0b' }}>{unlockedAchievements.length}/{ACHIEVEMENTS.length}</div>
          </div>
        </div>

        {/* Botón de Modo Desafío */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setShowChallengeMode(!showChallengeMode)}
            className={`btn ${showChallengeMode ? 'btn-primary' : 'btn-secondary'}`}
            style={{ marginRight: '0.5rem' }}
          >
            {showChallengeMode ? '✓ Modo Desafío Activo' : 'Activar Modo Desafío'}
          </button>
        </div>

        {/* Panel de Desafío */}
        <AnimatePresence>
          {showChallengeMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="info-panel"
              style={{ marginBottom: '2rem', backgroundColor: '#fef3c7', borderLeftColor: '#f59e0b' }}
            >
              <h4 className="info-title" style={{ color: '#f59e0b' }}>
                Desafío Actual: {CHALLENGES[currentChallenge].name}
              </h4>
              <p className="info-text">{CHALLENGES[currentChallenge].description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instrucciones */}
        <div className="info-panel" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p className="info-text">
            {!selectedColor1 && "Selecciona el primer color primario"}
            {selectedColor1 && !selectedColor2 && "Ahora selecciona un segundo color diferente"}
            {selectedColor1 && selectedColor2 && showAnimation && "Mezclando colores..."}
            {selectedColor1 && selectedColor2 && !showAnimation && mixedColor && "¡Mira el resultado!"}
          </p>
        </div>

        {/* Colores primarios */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {Object.entries(PRIMARY_COLORS).map(([key, color]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!selectedColor1) {
                  handleSelectColor1(key as ColorKey);
                } else if (!selectedColor2) {
                  handleSelectColor2(key as ColorKey);
                }
              }}
              disabled={selectedColor1 === key}
              className={`
                relative h-32 rounded-2xl shadow-lg transition-all
                ${selectedColor1 === key ? "ring-4 ring-offset-2 ring-[#00a5b5]" : "hover:shadow-xl"}
                ${selectedColor1 === key && "opacity-75"}
              `}
              style={{
                backgroundColor: color.hex,
              }}
            >
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {color.name}
                </span>
                {selectedColor1 === key && (
                  <span style={{ color: 'white', fontSize: '0.875rem', marginTop: '0.5rem' }}>Seleccionado</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Control de Proporción */}
        {selectedColor1 && !selectedColor2 && (
          <div className="info-panel" style={{ marginBottom: '2rem' }}>
            <h4 className="info-title">Control de Proporción</h4>
            <p className="info-text" style={{ marginBottom: '1rem' }}>
              Ajusta la proporción de los colores (50% = partes iguales)
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ minWidth: '60px', fontSize: '0.875rem' }}>
                {Math.round((1 - colorRatio) * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={colorRatio}
                onChange={(e) => setColorRatio(parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--ucc-blue)' }}
              />
              <span style={{ minWidth: '60px', fontSize: '0.875rem', textAlign: 'right' }}>
                {Math.round(colorRatio * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Área de mezcla */}
        <AnimatePresence>
          {selectedColor1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ marginBottom: '2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {/* Primer color seleccionado */}
                <motion.div
                  animate={showAnimation ? { x: [0, 50, 0] } : {}}
                  transition={{ duration: 1, repeat: showAnimation ? Infinity : 0 }}
                  style={{ width: '5rem', height: '5rem', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: PRIMARY_COLORS[selectedColor1].hex }}
                />

                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--ucc-blue)' }}>
                  +
                </span>

                {/* Segundo color o placeholder */}
                {selectedColor2 ? (
                  <motion.div
                    animate={showAnimation ? { x: [0, -50, 0] } : {}}
                    transition={{ duration: 1, repeat: showAnimation ? Infinity : 0 }}
                    style={{ width: '5rem', height: '5rem', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: PRIMARY_COLORS[selectedColor2].hex }}
                  />
                ) : (
                  <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', border: '4px dashed var(--gray-300)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--gray-400)', fontSize: '2rem' }}>?</span>
                  </div>
                )}

                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--ucc-blue)' }}>
                  =
                </span>

                {/* Color resultante */}
                {mixedColor ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ width: '6rem', height: '6rem', borderRadius: '50%', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', backgroundColor: mixedColor }}
                  />
                ) : (
                  <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', border: '4px dashed var(--gray-300)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--gray-400)', fontSize: '2rem' }}>?</span>
                  </div>
                )}
              </div>

              {/* Nombre del color resultante e información */}
              {colorName && selectedColor1 && selectedColor2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', marginTop: '1rem' }}
                >
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ucc-green)' }}>
                    ¡Creaste {colorName}!
                  </p>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--gray-600)' }}>
                    Temperatura: <strong>{getColorTemperature(selectedColor1, selectedColor2)}</strong>
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón para reiniciar */}
        {selectedColor1 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={resetMix}
              className="btn btn-primary"
            >
              <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Mezclar otros colores
            </button>
          </div>
        )}

        {/* Historial de Colores */}
        {colorHistory.length > 0 && (
          <div className="info-panel" style={{ marginTop: '2rem', backgroundColor: '#f0f9ff', borderLeftColor: 'var(--ucc-blue)' }}>
            <h4 className="info-title" style={{ color: 'var(--ucc-blue)' }}>Tu Paleta de Colores</h4>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {colorHistory.map((item, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.5rem',
                      backgroundColor: item.color,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                  <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--gray-600)' }}>
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logros Desbloqueados */}
        {unlockedAchievements.length > 0 && (
          <div className="info-panel success" style={{ marginTop: '2rem' }}>
            <h4 className="info-title">Logros Desbloqueados</h4>
            <div style={{ marginTop: '1rem' }}>
              {ACHIEVEMENTS.filter((a) => unlockedAchievements.includes(a.id)).map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '0.875rem', margin: 0 }}>
                      {achievement.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', margin: 0, color: 'var(--gray-600)' }}>
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Información educativa */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div className="info-panel" style={{ borderLeftColor: 'var(--red-500)' }}>
            <h4 className="info-title">Colores Primarios</h4>
            <p className="info-text">Rojo, Azul y Amarillo son la base. No se pueden crear mezclando otros colores.</p>
          </div>

          <div className="info-panel success">
            <h4 className="info-title">Colores Secundarios</h4>
            <p className="info-text">Verde, Naranja y Morado se crean mezclando dos colores primarios en partes iguales.</p>
          </div>

          <div className="info-panel" style={{ borderLeftColor: 'var(--blue-500)' }}>
            <h4 className="info-title">Temperatura del Color</h4>
            <p className="info-text">Los colores pueden ser cálidos (rojo, amarillo) o fríos (azul). Esto afecta cómo nos hacen sentir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
