import PatternSequence from "../components/PatternSequence";

export default function PatternGameView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#00a5b5" }}>
            🧩 Pensamiento Lógico
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Desarrolla tu razonamiento lógico identificando patrones y completando secuencias
          </p>
        </div>

        {/* Componente del juego */}
        <PatternSequence />

        {/* Información adicional */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#00a5b5" }}>
              Desarrolla tu mente
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ejercita tu cerebro reconociendo patrones matemáticos y geométricos
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#84bd00" }}>
              Mejora continua
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Cada patrón completado mejora tus habilidades de razonamiento lógico
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#00a5b5" }}>
              Precisión y rapidez
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Mejora tu precisión identificando los patrones correctos
            </p>
          </div>
        </div>

        {/* Sección educativa */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4 text-center" style={{ color: "#00a5b5" }}>
            📚 ¿Qué son los patrones?
          </h3>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-bold text-lg mb-2" style={{ color: "#84bd00" }}>
                🔢 Patrones Numéricos
              </h4>
              <p className="text-sm mb-2">
                Los patrones numéricos son secuencias de números que siguen una regla específica.
                Por ejemplo:
              </p>
              <ul className="space-y-1 text-sm pl-4">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>2, 4, 6, 8...</strong> → Suma de 2 en 2
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>5, 10, 15, 20...</strong> → Suma de 5 en 5
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>1, 2, 3, 4...</strong> → Números consecutivos
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-2" style={{ color: "#00a5b5" }}>
                🔶 Patrones Geométricos
              </h4>
              <p className="text-sm mb-2">
                Los patrones geométricos usan figuras que se repiten siguiendo un orden. Por ejemplo:
              </p>
              <ul className="space-y-1 text-sm pl-4">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>🔵 🟦 🔵 🟦...</strong> → Alternancia de círculo y cuadrado
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>⭐ 🔺 ⭐ 🔺...</strong> → Alternancia de estrella y triángulo
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tips para mejorar */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
          <h4 className="font-bold text-lg mb-3 text-center" style={{ color: "#00a5b5" }}>
            💡 Consejos para identificar patrones
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>1.</span>
              <span>Observa todos los elementos de la secuencia con atención</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>2.</span>
              <span>Busca qué tienen en común los elementos que ves</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>3.</span>
              <span>En números: ¿aumentan?, ¿disminuyen?, ¿cuánto cambian?</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>4.</span>
              <span>En figuras: ¿se repiten?, ¿cuál es el orden?</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>5.</span>
              <span>Practica mucho, ¡cada patrón te hace mejor!</span>
            </li>
          </ul>
        </div>

        {/* Beneficios educativos */}
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="font-bold text-lg mb-3 text-center" style={{ color: "#84bd00" }}>
            🌟 Beneficios de trabajar con patrones
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-2xl">🧠</span>
              <div>
                <strong>Desarrollo cognitivo:</strong> Mejora tu capacidad de razonamiento y análisis
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-2xl">🎯</span>
              <div>
                <strong>Concentración:</strong> Aumenta tu atención y enfoque
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-2xl">📊</span>
              <div>
                <strong>Matemáticas:</strong> Fortalece tus bases matemáticas
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-2xl">💡</span>
              <div>
                <strong>Resolución de problemas:</strong> Aprende a enfrentar desafíos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
