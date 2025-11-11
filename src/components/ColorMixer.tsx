import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Definición de colores primarios
const PRIMARY_COLORS = {
  red: { name: "Rojo", hex: "#ef4444", rgb: [239, 68, 68] },
  blue: { name: "Azul", hex: "#3b82f6", rgb: [59, 130, 246] },
  yellow: { name: "Amarillo", hex: "#fde047", rgb: [253, 224, 71] },
};

// Función para mezclar colores RGB
const mixColors = (color1: number[], color2: number[]): string => {
  const r = Math.floor((color1[0] + color2[0]) / 2);
  const g = Math.floor((color1[1] + color2[1]) / 2);
  const b = Math.floor((color1[2] + color2[2]) / 2);
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

type ColorKey = keyof typeof PRIMARY_COLORS;

export default function ColorMixer() {
  const [selectedColor1, setSelectedColor1] = useState<ColorKey | null>(null);
  const [selectedColor2, setSelectedColor2] = useState<ColorKey | null>(null);
  const [mixedColor, setMixedColor] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

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
      const mixed = mixColors(color1Data.rgb, color2Data.rgb);
      const name = getColorName(selectedColor1, color);

      setMixedColor(mixed);
      setColorName(name);
      setScore((prev) => prev + 10);
      setShowAnimation(false);
      playSuccessSound();
    }, 1000);
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
  };

  return (
    <div className="educational-card">
      {/* Header */}
      <div className="educational-card-header">
        <h2>Teoría del Color</h2>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          Mezcla colores primarios y descubre los secundarios
        </p>
      </div>

      <div className="educational-card-body">
        {/* Puntuación */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ display: 'inline-block', minWidth: '200px' }}>
            <div className="stat-label">Mezclas Realizadas</div>
            <div className="stat-value success">{score / 10}</div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="info-panel" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p className="info-text">
            {!selectedColor1 && "Selecciona el primer color primario"}
            {selectedColor1 && !selectedColor2 && "Ahora selecciona un segundo color diferente"}
            {selectedColor1 && selectedColor2 && showAnimation && "Mezclando colores..."}
            {selectedColor1 && selectedColor2 && !showAnimation && mixedColor && "Mira el resultado"}
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

              {/* Nombre del color resultante */}
              {colorName && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', marginTop: '1rem' }}
                >
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ucc-green)' }}>
                    Creaste {colorName}
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

        {/* Información educativa */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div className="info-panel" style={{ borderLeftColor: 'var(--red-500)' }}>
            <h4 className="info-title">Colores Primarios</h4>
            <p className="info-text">Rojo, Azul y Amarillo no se pueden crear mezclando</p>
          </div>

          <div className="info-panel success">
            <h4 className="info-title">Colores Secundarios</h4>
            <p className="info-text">Verde, Naranja y Morado se crean mezclando primarios</p>
          </div>

          <div className="info-panel" style={{ borderLeftColor: 'var(--blue-500)' }}>
            <h4 className="info-title">Experimenta</h4>
            <p className="info-text">Prueba todas las combinaciones posibles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
