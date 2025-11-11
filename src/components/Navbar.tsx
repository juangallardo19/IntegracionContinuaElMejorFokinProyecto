// src/components/Navbar.tsx
import React, { useEffect } from "react";

const Navbar: React.FC = () => {
  // Inicializa el tema al cargar
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved) {
      root.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", next);
    // Notifica a la app para que vistas activas reaccionen en vivo
    document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
  };

  return (
    <header style={{
      height: '4rem',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: 'white',
      borderBottom: '2px solid var(--gray-200)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 2rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Lado izquierdo: logo + marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo Mentes Creativas"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.5rem',
              objectFit: 'contain'
            }}
          />
          <div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'var(--ucc-blue)'
            }}>
              Mentes Creativas
            </span>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--gray-600)',
              marginTop: '-0.25rem'
            }}>
              Universidad Cooperativa de Colombia
            </div>
          </div>
        </div>

        {/* Lado derecho: botón de tema */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Indicador de estadísticas */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--gray-100)',
            borderRadius: '0.5rem'
          }}>
            <svg
              style={{ width: '1.25rem', height: '1.25rem', color: 'var(--ucc-green)' }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--gray-700)'
            }}>
              3 Actividades
            </span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--ucc-blue)',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--blue-600)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ucc-blue)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              style={{ width: '1rem', height: '1rem' }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            Tema
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
