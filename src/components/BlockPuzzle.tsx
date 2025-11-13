import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Definición de formas de las piezas (como Tetris)
type PieceShape = number[][];

interface Piece {
  id: number;
  shape: PieceShape;
  color: string;
  placed: boolean;
}

interface Level {
  name: string;
  boardSize: number;
  pieces: Omit<Piece, "id" | "placed">[];
}

// Formas de piezas tipo Tetris (1 = ocupado, 0 = vacío)
const PIECE_SHAPES: { shape: PieceShape; color: string }[] = [
  // Línea horizontal
  { shape: [[1, 1, 1]], color: "#3b82f6" },
  // Línea horizontal larga
  { shape: [[1, 1, 1, 1]], color: "#8b5cf6" },
  // Cuadrado 2x2
  { shape: [[1, 1], [1, 1]], color: "#10b981" },
  // L pequeña
  { shape: [[1, 0], [1, 1]], color: "#ef4444" },
  // L invertida
  { shape: [[0, 1], [1, 1]], color: "#f59e0b" },
  // T
  { shape: [[1, 1, 1], [0, 1, 0]], color: "#ec4899" },
  // Z
  { shape: [[1, 1, 0], [0, 1, 1]], color: "#06b6d4" },
  // Línea vertical
  { shape: [[1], [1], [1]], color: "#6366f1" },
  // Cubo simple
  { shape: [[1]], color: "#84cc16" },
];

// Niveles del juego
const LEVELS: Level[] = [
  {
    name: "Nivel 1: Principiante",
    boardSize: 4,
    pieces: [
      PIECE_SHAPES[0], // Línea horizontal 3
      PIECE_SHAPES[2], // Cuadrado 2x2
      PIECE_SHAPES[8], // Cubo simple
      PIECE_SHAPES[8], // Cubo simple
      PIECE_SHAPES[0], // Línea horizontal 3
      PIECE_SHAPES[8], // Cubo simple
    ],
  },
  {
    name: "Nivel 2: Intermedio",
    boardSize: 5,
    pieces: [
      PIECE_SHAPES[1], // Línea horizontal 4
      PIECE_SHAPES[2], // Cuadrado 2x2
      PIECE_SHAPES[3], // L
      PIECE_SHAPES[4], // L invertida
      PIECE_SHAPES[0], // Línea horizontal 3
      PIECE_SHAPES[7], // Línea vertical
      PIECE_SHAPES[8], // Cubo
    ],
  },
  {
    name: "Nivel 3: Avanzado",
    boardSize: 6,
    pieces: [
      PIECE_SHAPES[1], // Línea horizontal 4
      PIECE_SHAPES[5], // T
      PIECE_SHAPES[6], // Z
      PIECE_SHAPES[2], // Cuadrado 2x2
      PIECE_SHAPES[3], // L
      PIECE_SHAPES[4], // L invertida
      PIECE_SHAPES[7], // Línea vertical
      PIECE_SHAPES[0], // Línea horizontal 3
    ],
  },
];

export default function BlockPuzzle() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [board, setBoard] = useState<number[][]>(() =>
    Array(LEVELS[0].boardSize).fill(null).map(() => Array(LEVELS[0].boardSize).fill(0))
  );
  const [pieces, setPieces] = useState<Piece[]>(() =>
    LEVELS[0].pieces.map((p, i) => ({ ...p, id: i, placed: false }))
  );
  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<{ row: number; col: number } | null>(null);

  // Reproducir sonido de éxito
  const playSuccessSound = () => {
    try {
      const audio = new Audio('/sounds/correct.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Error al reproducir sonido de éxito:', err));
    } catch (err) {
      console.log('Error al cargar sonido de éxito:', err);
    }
  };

  // Reproducir sonido de error
  const playErrorSound = () => {
    try {
      const audio = new Audio('/sounds/incorrect.mp3');
      audio.volume = 0.3; // Volumen más bajo para que no sea tan duro
      audio.play().catch(err => console.log('Error al reproducir sonido de error:', err));
    } catch (err) {
      console.log('Error al cargar sonido de error:', err);
    }
  };

  // Iniciar nuevo nivel
  const startLevel = (levelIndex: number) => {
    const level = LEVELS[levelIndex];
    setCurrentLevel(levelIndex);
    setBoard(Array(level.boardSize).fill(null).map(() => Array(level.boardSize).fill(0)));
    setPieces(level.pieces.map((p, i) => ({ ...p, id: i, placed: false })));
    setShowSuccess(false);
  };

  // Verificar si una pieza cabe en una posición
  const canPlacePiece = (piece: PieceShape, row: number, col: number): boolean => {
    for (let r = 0; r < piece.length; r++) {
      for (let c = 0; c < piece[r].length; c++) {
        if (piece[r][c] === 1) {
          const boardRow = row + r;
          const boardCol = col + c;

          // Fuera de límites
          if (boardRow >= board.length || boardCol >= board[0].length) {
            return false;
          }

          // Celda ya ocupada
          if (board[boardRow][boardCol] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Colocar pieza en el tablero
  const placePiece = (piece: Piece, row: number, col: number) => {
    if (!canPlacePiece(piece.shape, row, col)) return false;

    const newBoard = board.map(r => [...r]);

    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c] === 1) {
          newBoard[row + r][col + c] = piece.id + 1;
        }
      }
    }

    setBoard(newBoard);
    setPieces(pieces.map(p => p.id === piece.id ? { ...p, placed: true } : p));

    // Verificar si el tablero está completo
    if (isBoardComplete(newBoard)) {
      setShowSuccess(true);
      setScore(score + 100 * (currentLevel + 1));
      setTimeout(() => {
        if (currentLevel < LEVELS.length - 1) {
          startLevel(currentLevel + 1);
        }
      }, 2000);
    }

    return true;
  };

  // Verificar si el tablero está completo
  const isBoardComplete = (b: number[][]): boolean => {
    return b.every(row => row.every(cell => cell !== 0));
  };

  // Manejar drop de pieza
  const handleDrop = (row: number, col: number) => {
    if (draggedPiece) {
      placePiece(draggedPiece, row, col);
      setDraggedPiece(null);
      setHoverPosition(null);
    }
  };

  // Manejar hover sobre el tablero
  const handleDragOver = (row: number, col: number) => {
    if (draggedPiece && canPlacePiece(draggedPiece.shape, row, col)) {
      setHoverPosition({ row, col });
    } else {
      setHoverPosition(null);
    }
  };

  // Verificar si una celda está en la zona de hover
  const isInHoverZone = (row: number, col: number): boolean => {
    if (!hoverPosition || !draggedPiece) return false;

    for (let r = 0; r < draggedPiece.shape.length; r++) {
      for (let c = 0; c < draggedPiece.shape[r].length; c++) {
        if (draggedPiece.shape[r][c] === 1) {
          if (hoverPosition.row + r === row && hoverPosition.col + c === col) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Reiniciar nivel
  const resetLevel = () => {
    playErrorSound();
    startLevel(currentLevel);
  };

  // Avanzar al siguiente nivel
  const nextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      playSuccessSound();
      startLevel(currentLevel + 1);
    }
  };

  // Obtener color de la celda
  const getCellColor = (value: number): string => {
    if (value === 0) return "transparent";
    const piece = pieces.find(p => p.id === value - 1);
    return piece?.color || "#gray";
  };

  return (
    <div className="educational-card">
      {/* Header */}
      <div className="educational-card-header">
        <h2>Rompecabezas de Bloques</h2>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          Arrastra las piezas y llena todo el tablero
        </p>
      </div>

      <div className="educational-card-body">
        {/* Estadísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-label">Nivel Actual</div>
            <div className="stat-value" style={{ color: 'var(--ucc-blue)' }}>{currentLevel + 1}/{LEVELS.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Puntos</div>
            <div className="stat-value success">{score}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Piezas Restantes</div>
            <div className="stat-value" style={{ color: 'var(--ucc-green)' }}>
              {pieces.filter(p => !p.placed).length}
            </div>
          </div>
        </div>

        {/* Nivel actual */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--ucc-blue)', marginBottom: '0.5rem' }}>
            {LEVELS[currentLevel].name}
          </h3>
        </div>

        {/* Tablero */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
            gap: '2px',
            backgroundColor: 'var(--gray-300)',
            padding: '4px',
            borderRadius: '0.5rem',
            maxWidth: '400px',
            margin: '0 auto',
            border: '3px solid var(--ucc-blue)',
          }}>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const inHoverZone = isInHoverZone(rowIndex, colIndex);
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      handleDragOver(rowIndex, colIndex);
                    }}
                    onDrop={() => handleDrop(rowIndex, colIndex)}
                    style={{
                      aspectRatio: '1',
                      backgroundColor: cell === 0
                        ? (inHoverZone ? 'rgba(59, 130, 246, 0.3)' : 'white')
                        : getCellColor(cell),
                      border: '1px solid var(--gray-200)',
                      borderRadius: '2px',
                      transition: 'all 0.2s',
                      cursor: draggedPiece ? 'pointer' : 'default',
                    }}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Piezas disponibles */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center', color: 'var(--gray-700)' }}>
            Piezas Disponibles
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {pieces.filter(p => !p.placed).map((piece) => (
              <motion.div
                key={piece.id}
                draggable
                onDragStart={() => setDraggedPiece(piece)}
                onDragEnd={() => setDraggedPiece(null)}
                whileHover={{ scale: 1.05 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.max(...piece.shape.map(r => r.length))}, 1fr)`,
                  gap: '2px',
                  padding: '0.75rem',
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: '0.5rem',
                  cursor: 'grab',
                  border: '2px solid var(--gray-300)',
                }}
              >
                {piece.shape.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: cell === 1 ? piece.color : 'transparent',
                        borderRadius: '2px',
                      }}
                    />
                  ))
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mensaje de éxito */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="info-panel success"
              style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              <h4 className="info-title">¡Nivel Completado!</h4>
              <p className="info-text">
                {currentLevel < LEVELS.length - 1
                  ? "¡Excelente! Pasando al siguiente nivel..."
                  : "¡Felicitaciones! Completaste todos los niveles"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={resetLevel}
            className="btn btn-secondary"
          >
            <svg className="icon" style={{ marginRight: '0.5rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Reiniciar Nivel
          </button>

          {currentLevel > 0 && (
            <button
              onClick={() => startLevel(currentLevel - 1)}
              className="btn btn-secondary"
            >
              Nivel Anterior
            </button>
          )}

          {currentLevel < LEVELS.length - 1 && (
            <button
              onClick={nextLevel}
              className="btn btn-primary"
            >
              Nivel Siguiente
            </button>
          )}
        </div>

        {/* Información educativa */}
        <div className="info-panel" style={{ marginTop: '2rem', borderLeftColor: 'var(--blue-500)' }}>
          <h4 className="info-title">¿Cómo jugar?</h4>
          <ul className="help-list">
            <li>Arrastra las piezas coloridas hacia el tablero blanco</li>
            <li>Las piezas deben encajar sin superponerse</li>
            <li>El objetivo es llenar completamente todo el tablero</li>
            <li>Usa tu pensamiento espacial para encontrar la mejor ubicación</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
