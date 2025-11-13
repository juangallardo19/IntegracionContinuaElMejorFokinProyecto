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

// Función para convertir hex a RGB
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
};

// Función para mezclar dos colores RGB
const mixColors = (color1: [number, number, number], color2: [number, number, number], ratio: number): [number, number, number] => {
  return [
    Math.round(color1[0] * (1 - ratio) + color2[0] * ratio),
    Math.round(color1[1] * (1 - ratio) + color2[1] * ratio),
    Math.round(color1[2] * (1 - ratio) + color2[2] * ratio)
  ];
};

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ef4444");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pencil" | "spray" | "eraser">("pencil");
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // Inicializar canvas y ajustar tamaño
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Ajustar tamaño del canvas al contenedor
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Establecer fondo blanco
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Obtener coordenadas relativas al canvas
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
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
    setLastX(x);
    setLastY(y);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Dibujar con lápiz (líneas sólidas)
  const drawWithPencil = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // Dibujar con spray (efecto difuminado)
  const drawWithSpray = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Calcular puntos intermedios para trazo suave
    const dx = x - lastX;
    const dy = y - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.ceil(distance / 3), 1);

    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      const currentX = lastX + dx * ratio;
      const currentY = lastY + dy * ratio;

      // Crear efecto spray con gradiente radial y transparencia
      const radius = brushSize * 2;
      const gradient = ctx.createRadialGradient(
        currentX, currentY, 0,
        currentX, currentY, radius
      );

      // Convertir color hex a rgba para transparencia
      const rgb = hexToRgb(currentColor);

      // Gradiente suave desde el centro hacia afuera (efecto spray)
      gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.15)`);
      gradient.addColorStop(0.5, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.08)`);
      gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);

      // Configurar el estilo de dibujo
      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = "multiply"; // Mezcla los colores

      // Dibujar círculo con gradiente
      ctx.beginPath();
      ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    setLastX(x);
    setLastY(y);
  };

  // Dibujar
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === "pencil") {
      drawWithPencil(ctx, x, y);
    } else if (tool === "spray") {
      drawWithSpray(ctx, x, y);
    }
  };

  // Terminar dibujo
  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
    }
  };

  // Limpiar canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    // Restablecer el modo de composición antes de limpiar
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
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
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setTool("pencil")}
                className={`btn ${tool === "pencil" ? "btn-primary" : "btn-secondary"}`}
                style={{ minWidth: '100px' }}
              >
                <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
                Lápiz
              </button>
              <button
                onClick={() => setTool("spray")}
                className={`btn ${tool === "spray" ? "btn-primary" : "btn-secondary"}`}
                style={{ minWidth: '100px' }}
              >
                <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="8" cy="10" r="1" />
                  <circle cx="16" cy="10" r="1" />
                  <circle cx="10" cy="15" r="1" />
                  <circle cx="14" cy="15" r="1" />
                  <circle cx="12" cy="8" r="1" />
                  <circle cx="6" cy="14" r="1" />
                  <circle cx="18" cy="14" r="1" />
                </svg>
                Spray
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
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--gray-600)' }}>
              {tool === "pencil" && "Lápiz: Líneas sólidas y precisas"}
              {tool === "spray" && "Spray: Efecto difuminado que mezcla colores de forma suave y transparente"}
              {tool === "eraser" && "Borrador: Borra tus trazos"}
            </p>
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
                    if (tool === "eraser") setTool("spray");
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
              Tamaño
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {BRUSH_SIZES.map((size) => (
                <button
                  key={size.size}
                  onClick={() => setBrushSize(size.size)}
                  className={`btn ${brushSize === size.size ? "btn-primary" : "btn-secondary"}`}
                  style={{ minWidth: '100px' }}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas - ARREGLADO para que el área dibujable coincida con el visual */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            ref={containerRef}
            style={{
              border: '3px solid var(--ucc-blue)',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              width: '100%',
              height: '600px',
              position: 'relative'
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{
                cursor: tool === "pencil" ? "crosshair" : tool === "spray" ? "cell" : "pointer",
                touchAction: "none",
                width: '100%',
                height: '100%',
                display: 'block'
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
            <li><strong>Lápiz:</strong> Perfecto para líneas nítidas y detalles precisos</li>
            <li><strong>Spray:</strong> Crea trazos suaves y difuminados que se mezclan</li>
            <li>Pinta varias veces sobre el mismo lugar para colores más intensos</li>
            <li>Prueba pintar amarillo sobre azul para crear verde</li>
            <li>O rojo sobre amarillo para crear naranja</li>
            <li>El borrador te ayuda a corregir errores</li>
            <li>Guarda tus mejores dibujos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
