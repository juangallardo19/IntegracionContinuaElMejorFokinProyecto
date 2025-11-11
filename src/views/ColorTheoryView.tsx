import ColorMixer from "../components/ColorMixer";

export default function ColorTheoryView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#00a5b5" }}>
            🎨 Educación Artística
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre el fascinante mundo del color y aprende cómo se crean los diferentes tonos
          </p>
        </div>

        {/* Componente del mezclador */}
        <ColorMixer />

        {/* Información adicional */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#00a5b5" }}>
              Aprende jugando
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Experimenta con las mezclas y descubre nuevos colores de forma divertida
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🌈</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#84bd00" }}>
              Teoría práctica
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comprende cómo funcionan los colores primarios y secundarios
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#00a5b5" }}>
              Creatividad
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Desarrolla tu creatividad explorando todas las combinaciones posibles
            </p>
          </div>
        </div>

        {/* Sección educativa sobre la teoría del color */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4 text-center" style={{ color: "#00a5b5" }}>
            📚 Aprende sobre los colores
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Colores primarios */}
            <div>
              <h4 className="font-bold text-lg mb-3" style={{ color: "#ef4444" }}>
                🔴 Colores Primarios
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    Son los <strong>colores base</strong> que no se pueden crear mezclando otros
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>Los tres colores primarios son: Rojo, Azul y Amarillo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>Con estos tres colores puedes crear muchos otros</span>
                </li>
              </ul>
            </div>

            {/* Colores secundarios */}
            <div>
              <h4 className="font-bold text-lg mb-3" style={{ color: "#22c55e" }}>
                🟢 Colores Secundarios
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>Rojo + Azul =</strong> Morado
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>Rojo + Amarillo =</strong> Naranja
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#84bd00" }}>✓</span>
                  <span>
                    <strong>Azul + Amarillo =</strong> Verde
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Curiosidades del color */}
        <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-lg">
          <h4 className="font-bold text-lg mb-3 text-center" style={{ color: "#f97316" }}>
            💡 ¿Sabías que...?
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Los artistas usan la <strong>rueda cromática</strong> para entender mejor las relaciones
            entre los colores. ¡Sigue practicando y conviértete en un experto del color!
          </p>
        </div>
      </div>
    </div>
  );
}
