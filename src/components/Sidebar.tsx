import { NavLink } from "react-router-dom";
import { FaHome, FaKeyboard, FaPalette, FaBrain } from "react-icons/fa";

interface SidebarItem {
  label: string;
  route: string;
  icon?: React.ReactNode;
}

const menuItems: SidebarItem[] = [
  { label: "Inicio", route: "/", icon: <FaHome /> },
  { label: "Tecnología e Informática", route: "/teclado-magico", icon: <FaKeyboard /> },
  { label: "Educación Artística", route: "/teoria-color", icon: <FaPalette /> },
  { label: "Pensamiento Lógico", route: "/secuencias-patrones", icon: <FaBrain /> },
];

export default function Sidebar() {
  const renderNavItem = ({ label, route, icon }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      className={({ isActive }) =>
        `w-full text-left flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200
         ${isActive
           ? "bg-white shadow-md text-ucc-blue"
           : "text-gray-700 hover:bg-white/50 hover:shadow-sm"
         }`
      }
      style={({ isActive }) => ({
        color: isActive ? 'var(--ucc-blue)' : 'var(--gray-700)',
        borderLeft: isActive ? '4px solid var(--ucc-blue)' : '4px solid transparent'
      })}
    >
      {({ isActive }) => (
        <>
          <span style={{ fontSize: '1.25rem' }}>{icon}</span>
          <span style={{ fontSize: '0.875rem', fontWeight: isActive ? '600' : '500' }}>{label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <aside style={{
      width: '100%',
      maxWidth: '280px',
      minHeight: '100vh',
      backgroundColor: 'var(--gray-100)',
      borderRight: '1px solid var(--gray-200)',
      padding: '1.5rem 1rem'
    }}>
      {/* Header del Sidebar */}
      <div style={{
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid var(--gray-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
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
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'var(--ucc-blue)',
              lineHeight: '1.2',
              margin: 0
            }}>
              Mentes Creativas
            </h2>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--gray-600)',
              margin: 0,
              marginTop: '0.25rem'
            }}>
              Plataforma Educativa
            </p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map(renderNavItem)}
      </nav>

      {/* Footer Info */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <svg
            style={{ width: '1.25rem', height: '1.25rem', color: 'var(--ucc-green)' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--ucc-green)',
            margin: 0
          }}>
            3 Áreas Educativas
          </h4>
        </div>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--gray-600)',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Explora las actividades interactivas diseñadas para estudiantes de 4to y 5to grado.
        </p>
      </div>
    </aside>
  );
}
