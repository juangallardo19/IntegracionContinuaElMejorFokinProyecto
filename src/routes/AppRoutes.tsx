import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import SettingsView from "../views/SettingsView";

// Vistas educativas
import KeyboardView from "../views/KeyboardView";
import ColorTheoryView from "../views/ColorTheoryView";
import PatternGameView from "../views/PatternGameView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="settings" element={<SettingsView />} />

        {/* Rutas educativas - Mentes Creativas */}
        <Route path="teclado-magico" element={<KeyboardView />} />
        <Route path="teoria-color" element={<ColorTheoryView />} />
        <Route path="secuencias-patrones" element={<PatternGameView />} />
      </Route>
    </Routes>
  );
}
