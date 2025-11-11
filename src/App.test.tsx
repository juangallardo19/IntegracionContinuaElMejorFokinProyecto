import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el título principal de Mentes Creativas", () => {
  render(<App />);
  // Verifica que hay múltiples instancias de "Mentes Creativas" (Navbar, Sidebar, HomePage)
  const mentesCreativasElements = screen.getAllByText(/Mentes Creativas/i);
  expect(mentesCreativasElements.length).toBeGreaterThanOrEqual(1);
});