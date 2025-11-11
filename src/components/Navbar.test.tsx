// src/components/Navbar.test.tsx
import { render, screen} from "@testing-library/react";
import Navbar from "./Navbar";

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'Mentes Creativas'", () => {
    render(<Navbar />);
    expect(screen.getByText(/Mentes Creativas/i)).toBeInTheDocument();
  });

  test("renderiza el botón con el texto 'Tema'", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
  });
});

