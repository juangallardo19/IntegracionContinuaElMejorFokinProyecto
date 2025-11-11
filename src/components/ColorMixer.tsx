import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Definición de colores primarios
const PRIMARY_COLORS = {
  red: { name: "Rojo", hex: "#ff0000", rgb: [255, 0, 0], temp: "cálido" },
  blue: { name: "Azul", hex: "#0000ff", rgb: [0, 0, 255], temp: "frío" },
  yellow: { name: "Amarillo", hex: "#ffff00", rgb: [255, 255, 0], temp: "cálido" },
};

// Desafíos para el usuario
const CHALLENGES = [
  { name: "Morado", colors: ["red", "blue"], description: "Mezcla rojo y azul" },
  { name: "Naranja", colors: ["red", "yellow"], description: "Mezcla rojo y amarillo" },
  { name: "Verde", colors: ["blue", "yellow"], description: "Mezcla azul y amarillo" },
];

// Función mejorada para mezclar colores RGB con proporción
const mixColors = (color1: number[], color2: number[], ratio: number = 0.5): string => {
  // Usar mezcla cuadrática para colores más vibrantes y realistas
  const mixChannel = (c1: number, c2: number, r: number) => {
    const c1Normalized = c1 / 255;
    const c2Normalized = c2 / 255;
    const mixed = Math.sqrt((1 - r) * c1Normalized * c1Normalized + r * c2Normalized * c2Normalized);
    return Math.round(mixed * 255);
  };

  const r = mixChannel(color1[0], color2[0], ratio);
  const g = mixChannel(color1[1], color2[1], ratio);
  const b = mixChannel(color1[2], color2[2], ratio);

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

// Colores secundarios disponibles para combinar
const SECONDARY_COLORS = {
  purple: { name: "Morado", rgb: [128, 0, 128], from: "Rojo + Azul" },
  orange: { name: "Naranja", rgb: [255, 128, 0], from: "Rojo + Amarillo" },
  green: { name: "Verde", rgb: [0, 255, 0], from: "Azul + Amarillo" },
};

type SecondaryColorKey = keyof typeof SECONDARY_COLORS;

export default function ColorMixer() {
  const [selectedColor1, setSelectedColor1] = useState<ColorKey | null>(null);
  const [selectedColor2, setSelectedColor2] = useState<ColorKey | null>(null);
  const [mixedColor, setMixedColor] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [colorRatio, setColorRatio] = useState(0.5);
  const [secondaryColorsCreated, setSecondaryColorsCreated] = useState<Set<string>>(new Set());
  const [showChallengeMode, setShowChallengeMode] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  // Estados para combinar colores secundarios
  const [selectedSecondary1, setSelectedSecondary1] = useState<SecondaryColorKey | null>(null);
  const [selectedSecondary2, setSelectedSecondary2] = useState<SecondaryColorKey | null>(null);
  const [tertiaryColor, setTertiaryColor] = useState<string | null>(null);
  const [tertiaryRatio, setTertiaryRatio] = useState(0.5);

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

  // Función para mezclar colores secundarios
  const handleSelectSecondary1 = (color: SecondaryColorKey) => {
    setSelectedSecondary1(color);
    setSelectedSecondary2(null);
    setTertiaryColor(null);
  };

  const handleSelectSecondary2 = (color: SecondaryColorKey) => {
    if (!selectedSecondary1 || color === selectedSecondary1) return;

    setSelectedSecondary2(color);

    // Mezclar los dos colores secundarios
    const color1Data = SECONDARY_COLORS[selectedSecondary1];
    const color2Data = SECONDARY_COLORS[color];
    const mixed = mixColors(color1Data.rgb, color2Data.rgb, tertiaryRatio);

    setTertiaryColor(mixed);
  };

  const resetSecondaryMix = () => {
    setSelectedSecondary1(null);
    setSelectedSecondary2(null);
    setTertiaryColor(null);
    setTertiaryRatio(0.5);
  };

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
        {/* Estadísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-label">Mezclas Realizadas</div>
            <div className="stat-value success">{score / 10}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Colores Secundarios Creados</div>
            <div className="stat-value" style={{ color: 'var(--ucc-blue)' }}>{secondaryColorsCreated.size}/3</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Desafíos Completados</div>
            <div className="stat-value" style={{ color: 'var(--ucc-green)' }}>{challengesCompleted}</div>
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
              Selecciona la proporción de mezcla
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={() => setColorRatio(0.25)}
                className={`btn ${colorRatio === 0.25 ? 'btn-primary' : 'btn-secondary'}`}
                style={{ minWidth: '80px' }}
              >
                25%
              </button>
              <button
                onClick={() => setColorRatio(0.5)}
                className={`btn ${colorRatio === 0.5 ? 'btn-primary' : 'btn-secondary'}`}
                style={{ minWidth: '80px' }}
              >
                50%
              </button>
              <button
                onClick={() => setColorRatio(0.75)}
                className={`btn ${colorRatio === 0.75 ? 'btn-primary' : 'btn-secondary'}`}
                style={{ minWidth: '80px' }}
              >
                75%
              </button>
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

        {/* Tabla de Combinaciones de Colores Secundarios */}
        {secondaryColorsCreated.size >= 2 && (
          <div className="educational-card" style={{ marginTop: '2rem' }}>
            <div className="educational-card-header">
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>
                Combina tus Colores Secundarios
              </h3>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
                Mezcla los colores secundarios que creaste para obtener colores terciarios
              </p>
            </div>
            <div className="educational-card-body">
              {/* Control de Proporción para secundarios */}
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--gray-600)' }}>
                  Proporción de mezcla:
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <button
                    onClick={() => setTertiaryRatio(0.25)}
                    className={`btn ${tertiaryRatio === 0.25 ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ minWidth: '80px' }}
                  >
                    25%
                  </button>
                  <button
                    onClick={() => setTertiaryRatio(0.5)}
                    className={`btn ${tertiaryRatio === 0.5 ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ minWidth: '80px' }}
                  >
                    50%
                  </button>
                  <button
                    onClick={() => setTertiaryRatio(0.75)}
                    className={`btn ${tertiaryRatio === 0.75 ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ minWidth: '80px' }}
                  >
                    75%
                  </button>
                </div>
              </div>

              {/* Tabla de colores secundarios */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {Array.from(secondaryColorsCreated).map((colorName) => {
                  const colorKey = Object.entries(SECONDARY_COLORS).find(
                    ([_, color]) => color.name === colorName
                  )?.[0] as SecondaryColorKey | undefined;

                  if (!colorKey) return null;

                  const color = SECONDARY_COLORS[colorKey];
                  // Usar el color RGB predefinido en lugar de calcularlo
                  const colorRgb = `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`;

                  return (
                    <motion.button
                      key={colorKey}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (!selectedSecondary1) {
                          handleSelectSecondary1(colorKey);
                        } else if (!selectedSecondary2) {
                          handleSelectSecondary2(colorKey);
                        }
                      }}
                      disabled={selectedSecondary1 === colorKey}
                      className={`
                        relative h-32 rounded-2xl shadow-lg transition-all
                        ${selectedSecondary1 === colorKey ? "ring-4 ring-offset-2 ring-[#00a5b5]" : "hover:shadow-xl"}
                        ${selectedSecondary1 === colorKey && "opacity-75"}
                      `}
                      style={{
                        backgroundColor: colorRgb,
                      }}
                    >
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.125rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                          {color.name}
                        </span>
                        <span style={{ color: 'white', fontSize: '0.75rem', marginTop: '0.25rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                          {color.from}
                        </span>
                        {selectedSecondary1 === colorKey && (
                          <span style={{ color: 'white', fontSize: '0.875rem', marginTop: '0.5rem' }}>Seleccionado</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Resultado de mezcla terciaria */}
              {selectedSecondary1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '2rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      backgroundColor: `rgb(${SECONDARY_COLORS[selectedSecondary1].rgb[0]}, ${SECONDARY_COLORS[selectedSecondary1].rgb[1]}, ${SECONDARY_COLORS[selectedSecondary1].rgb[2]})`
                    }} />

                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ucc-blue)' }}>+</span>

                    {selectedSecondary2 ? (
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        backgroundColor: `rgb(${SECONDARY_COLORS[selectedSecondary2].rgb[0]}, ${SECONDARY_COLORS[selectedSecondary2].rgb[1]}, ${SECONDARY_COLORS[selectedSecondary2].rgb[2]})`
                      }} />
                    ) : (
                      <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', border: '4px dashed var(--gray-300)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--gray-400)', fontSize: '1.5rem' }}>?</span>
                      </div>
                    )}

                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ucc-blue)' }}>=</span>

                    {tertiaryColor ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ width: '5rem', height: '5rem', borderRadius: '50%', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', backgroundColor: tertiaryColor }}
                      />
                    ) : (
                      <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', border: '4px dashed var(--gray-300)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--gray-400)', fontSize: '1.5rem' }}>?</span>
                      </div>
                    )}
                  </div>

                  {tertiaryColor && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ textAlign: 'center', marginTop: '1rem' }}
                    >
                      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--ucc-green)' }}>
                        ¡Color Terciario Creado!
                      </p>
                    </motion.div>
                  )}

                  {selectedSecondary1 && (
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                      <button
                        onClick={resetSecondaryMix}
                        className="btn btn-primary"
                      >
                        <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="23 4 23 10 17 10" />
                          <polyline points="1 20 1 14 7 14" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                        Nueva combinación
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
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
