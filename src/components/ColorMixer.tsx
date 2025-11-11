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
    console.log("🎵 Sonido de selección de color");
  };

  const playSuccessSound = () => {
    console.log("🎉 Sonido de mezcla exitosa");
  };

  // Reiniciar mezcla
  const resetMix = () => {
    setSelectedColor1(null);
    setSelectedColor2(null);
    setMixedColor(null);
    setColorName("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#00a5b5" }}>
          🎨 Teoría del Color
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ¡Mezcla colores primarios y descubre los secundarios!
        </p>
      </div>

      {/* Puntuación */}
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-6 py-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Mezclas realizadas</p>
          <p className="text-3xl font-bold" style={{ color: "#84bd00" }}>
            {score / 10}
          </p>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          {!selectedColor1 && "👆 Selecciona el primer color primario"}
          {selectedColor1 && !selectedColor2 && "👆 Ahora selecciona un segundo color diferente"}
          {selectedColor1 && selectedColor2 && showAnimation && "✨ ¡Mezclando colores!"}
          {selectedColor1 && selectedColor2 && !showAnimation && mixedColor && "🎉 ¡Mira el resultado!"}
        </p>
      </div>

      {/* Colores primarios */}
      <div className="grid grid-cols-3 gap-4 mb-8">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-bold text-xl drop-shadow-lg">
                {color.name}
              </span>
              {selectedColor1 === key && (
                <span className="text-white text-sm mt-2">✓ Seleccionado</span>
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
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-4">
              {/* Primer color seleccionado */}
              <motion.div
                animate={showAnimation ? { x: [0, 50, 0] } : {}}
                transition={{ duration: 1, repeat: showAnimation ? Infinity : 0 }}
                className="w-20 h-20 rounded-full shadow-lg"
                style={{ backgroundColor: PRIMARY_COLORS[selectedColor1].hex }}
              />

              <span className="text-3xl font-bold" style={{ color: "#00a5b5" }}>
                +
              </span>

              {/* Segundo color o placeholder */}
              {selectedColor2 ? (
                <motion.div
                  animate={showAnimation ? { x: [0, -50, 0] } : {}}
                  transition={{ duration: 1, repeat: showAnimation ? Infinity : 0 }}
                  className="w-20 h-20 rounded-full shadow-lg"
                  style={{ backgroundColor: PRIMARY_COLORS[selectedColor2].hex }}
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">?</span>
                </div>
              )}

              <span className="text-3xl font-bold" style={{ color: "#00a5b5" }}>
                =
              </span>

              {/* Color resultante */}
              {mixedColor ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 rounded-full shadow-xl"
                  style={{ backgroundColor: mixedColor }}
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">?</span>
                </div>
              )}
            </div>

            {/* Nombre del color resultante */}
            {colorName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-4"
              >
                <p className="text-2xl font-bold" style={{ color: "#84bd00" }}>
                  ¡Creaste {colorName}! 🎨
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón para reiniciar */}
      {selectedColor1 && (
        <div className="text-center mt-6">
          <button
            onClick={resetMix}
            className="px-6 py-3 rounded-lg text-white font-bold transition-transform hover:scale-105"
            style={{ backgroundColor: "#00a5b5" }}
          >
            🔄 Mezclar otros colores
          </button>
        </div>
      )}

      {/* Información educativa */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
          <div className="text-3xl mb-2">🔴</div>
          <h4 className="font-bold text-sm mb-1" style={{ color: "#ef4444" }}>
            Colores Primarios
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Rojo, Azul y Amarillo no se pueden crear mezclando
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
          <div className="text-3xl mb-2">🟢</div>
          <h4 className="font-bold text-sm mb-1" style={{ color: "#22c55e" }}>
            Colores Secundarios
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Verde, Naranja y Morado se crean mezclando primarios
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
          <div className="text-3xl mb-2">🌈</div>
          <h4 className="font-bold text-sm mb-1" style={{ color: "#a855f7" }}>
            ¡Experimenta!
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Prueba todas las combinaciones posibles
          </p>
        </div>
      </div>
    </div>
  );
}
