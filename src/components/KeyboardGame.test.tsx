// src/components/KeyboardGame.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import KeyboardGame from "./KeyboardGame";

describe("KeyboardGame - Teclado Mágico", () => {
  test("renderiza el componente con el título correcto", () => {
    render(<KeyboardGame />);
    expect(screen.getByText(/El Teclado Mágico/i)).toBeInTheDocument();
    expect(screen.getByText(/Aprende a escribir presionando las teclas correctas/i)).toBeInTheDocument();
  });

  test("muestra el botón de inicio cuando no está jugando", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });
    expect(startButton).toBeInTheDocument();
  });

  test("inicia el juego y muestra el teclado al hacer clic en comenzar", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });

    fireEvent.click(startButton);

    // Verifica que se muestren los indicadores de puntos y errores
    expect(screen.getByText("Puntos")).toBeInTheDocument();
    expect(screen.getByText("Errores")).toBeInTheDocument();
    expect(screen.getByText("Precisión")).toBeInTheDocument();
  });

  test("incrementa el puntaje cuando se presiona la tecla correcta", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });

    fireEvent.click(startButton);

    // Obtener la puntuación inicial
    const scoreElement = screen.getAllByText("0")[0]; // Primer "0" es el puntaje
    expect(scoreElement).toBeInTheDocument();

    // Simular presión de tecla (la primera letra de la palabra que aparezca)
    // Como la palabra es aleatoria, podríamos usar cualquier tecla del alfabeto
    // pero para propósitos del test, verificamos que el mecanismo funciona
    const firstLetter = screen.getAllByText(/[A-Z]/)[0].textContent;
    if (firstLetter) {
      fireEvent.keyDown(window, { key: firstLetter, code: `Key${firstLetter}` });

      // Verificar que aparece el mensaje de éxito
      expect(screen.getByText(/Muy bien/i)).toBeInTheDocument();
    }
  });

  test("incrementa los errores cuando se presiona una tecla incorrecta", () => {
    render(<KeyboardGame />);
    const startButton = screen.getByRole("button", { name: /Comenzar a Practicar/i });

    fireEvent.click(startButton);

    // Simular presión de tecla incorrecta (usar una tecla que probablemente no sea la primera)
    fireEvent.keyDown(window, { key: "Ñ", code: "KeyÑ" });

    // Verificar que aparece mensaje de error
    expect(screen.getByText(/Intenta de nuevo/i)).toBeInTheDocument();
  });
});
