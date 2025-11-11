import KeyboardGame from "../components/KeyboardGame";

export default function KeyboardView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#00a5b5" }}>
            💻 Tecnología e Informática
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aprende a usar el teclado de manera divertida y mejora tus habilidades de mecanografía
          </p>
        </div>

        {/* Componente del juego */}
        <KeyboardGame />

        {/* Información adicional */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">⌨️</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#00a5b5" }}>
              Aprende jugando
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Practica la ubicación de las teclas de forma divertida
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#84bd00" }}>
              Mejora tu precisión
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Cada tecla correcta suma puntos y mejora tu precisión
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#00a5b5" }}>
              Sigue progresando
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Practica con diferentes palabras y sigue mejorando
            </p>
          </div>
        </div>

        {/* Tips educativos */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4 text-center" style={{ color: "#00a5b5" }}>
            📚 Consejos para mejorar
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>✓</span>
              <span>Mantén una postura correcta frente al teclado</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>✓</span>
              <span>Mira la pantalla, no el teclado mientras escribes</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>✓</span>
              <span>Practica todos los días unos minutos para mejorar</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#84bd00" }}>✓</span>
              <span>No te preocupes por los errores, son parte del aprendizaje</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
