import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Navbar arriba */}
        <Navbar />

        {/* Contenido dinámico (cada vista) */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: 'var(--gray-100)'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
