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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ef4444");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pencil" | "brush" | "eraser">("pencil");

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

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Dibujar con lápiz (líneas sólidas)
  const drawWithPencil = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentColor;
    ctx.globalAlpha = 1;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // Dibujar con pincel (difuminado/mezcla de colores)
  const drawWithBrush = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Crear efecto de difuminado con múltiples círculos de diferente opacidad
    const layers = 3;
    for (let i = 0; i < layers; i++) {
      const layerSize = brushSize * (1 + i * 0.3);
      const opacity = 0.3 - (i * 0.08);

      ctx.globalAlpha = opacity;
      ctx.fillStyle = currentColor;
      ctx.beginPath();
      ctx.arc(x, y, layerSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Núcleo sólido más pequeño
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
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
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 1;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === "pencil") {
      drawWithPencil(ctx, x, y);
    } else if (tool === "brush") {
      drawWithBrush(ctx, x, y);
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
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--gray-600)' }}>
              {tool === "pencil" && "Lápiz: Líneas sólidas y precisas"}
              {tool === "brush" && "Pincel: Trazo suave con difuminado, mezcla colores"}
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
                    if (tool === "eraser") setTool("pencil");
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
                  onClick={() => {
                    setBrushSize(size.size);
                    if (tool === "eraser") setTool("pencil");
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
                cursor: tool === "pencil" ? "crosshair" : tool === "brush" ? "cell" : "pointer",
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
            <li><strong>Pincel:</strong> Ideal para pintar áreas grandes y crear efectos suaves</li>
            <li>Mezcla colores con el pincel para crear nuevos tonos</li>
            <li>Usa trazos suaves para líneas delicadas</li>
            <li>El borrador te ayuda a corregir errores</li>
            <li>Guarda tus mejores dibujos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
