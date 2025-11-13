import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Colores disponibles para pintar
const COLORS = [
  { name: "Rojo", hex: "#ef4444" },
  { name: "Azul", hex: "#3b82f6" },
  { name: "Amarillo", hex: "#fbbf24" },
  { name: "Verde", hex: "#22c55e" },
  { name: "Naranja", hex: "#f97316" },
  { name: "Morado", hex: "#a855f7" },
  { name: "Rosa", hex: "#ec4899" },
  { name: "Negro", hex: "#000000" },
  { name: "Café", hex: "#92400e" },
];

// Tamaños de pincel
const BRUSH_SIZES = [
  { name: "Pequeño", size: 2 },
  { name: "Mediano", size: 5 },
  { name: "Grande", size: 10 },
  { name: "Muy Grande", size: 20 },
];

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ef4444");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");

  // Inicializar canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Establecer fondo blanco
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Obtener coordenadas relativas al canvas
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  // Iniciar dibujo
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Dibujar
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // Terminar dibujo
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Limpiar canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Descargar dibujo
  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "mi-dibujo.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="educational-card">
      {/* Header */}
      <div className="educational-card-header">
        <h2>Lienzo de Dibujo Libre</h2>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          Dibuja lo que quieras con colores y pinceles
        </p>
      </div>

      <div className="educational-card-body">
        {/* Herramientas */}
        <div style={{ marginBottom: '2rem' }}>
          {/* Selector de herramienta */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--gray-700)' }}>
              Herramienta
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setTool("brush")}
                className={`btn ${tool === "brush" ? "btn-primary" : "btn-secondary"}`}
                style={{ minWidth: '100px' }}
              >
                <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
                Pincel
              </button>
              <button
                onClick={() => setTool("eraser")}
                className={`btn ${tool === "eraser" ? "btn-primary" : "btn-secondary"}`}
                style={{ minWidth: '100px' }}
              >
                <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 20H7L3 16 L12 4l9 9-1 7z" />
                  <path d="M12 12l-4 4" />
                </svg>
                Borrador
              </button>
            </div>
          </div>

          {/* Paleta de colores */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--gray-700)' }}>
              Color
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '0.5rem' }}>
              {COLORS.map((color) => (
                <motion.button
                  key={color.hex}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentColor(color.hex);
                    setTool("brush");
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '0.5rem',
                    backgroundColor: color.hex,
                    border: currentColor === color.hex ? '3px solid var(--ucc-blue)' : '2px solid var(--gray-300)',
                    cursor: 'pointer',
                    boxShadow: currentColor === color.hex ? '0 4px 8px rgba(0, 165, 181, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Tamaño del pincel */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--gray-700)' }}>
              Tamaño del Pincel
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {BRUSH_SIZES.map((size) => (
                <button
                  key={size.size}
                  onClick={() => {
                    setBrushSize(size.size);
                    setTool("brush");
                  }}
                  className={`btn ${brushSize === size.size ? "btn-primary" : "btn-secondary"}`}
                  style={{ minWidth: '100px' }}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            border: '3px solid var(--ucc-blue)',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{
                cursor: tool === "brush" ? "crosshair" : "pointer",
                touchAction: "none",
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={clearCanvas}
            className="btn btn-secondary"
          >
            <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Limpiar Todo
          </button>

          <button
            onClick={downloadDrawing}
            className="btn btn-primary"
          >
            <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Guardar Dibujo
          </button>
        </div>

        {/* Información educativa */}
        <div className="info-panel" style={{ marginTop: '2rem', borderLeftColor: 'var(--blue-500)' }}>
          <h4 className="info-title">Consejos para Dibujar</h4>
          <ul className="help-list">
            <li>Usa trazos suaves para líneas delicadas</li>
            <li>Combina diferentes colores para crear tu propio estilo</li>
            <li>El borrador te ayuda a corregir errores</li>
            <li>Experimenta con diferentes tamaños de pincel</li>
            <li>Guarda tus mejores dibujos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
