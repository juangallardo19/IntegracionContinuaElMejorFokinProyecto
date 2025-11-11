// src/components/ColorMixer.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ColorMixer from "./ColorMixer";

describe("ColorMixer - Teoría del Color", () => {
  test("renderiza el componente con el título correcto", () => {
    render(<ColorMixer />);
    expect(screen.getByText(/Teoría del Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Mezcla colores primarios y descubre los secundarios/i)).toBeInTheDocument();
  });

  test("muestra los tres colores primarios", () => {
    render(<ColorMixer />);
    expect(screen.getByText("Rojo")).toBeInTheDocument();
    expect(screen.getByText("Azul")).toBeInTheDocument();
    expect(screen.getByText("Amarillo")).toBeInTheDocument();
  });

  test("permite seleccionar el primer color primario", () => {
    render(<ColorMixer />);
    const redButton = screen.getByText("Rojo").closest("button");

    if (redButton) {
      fireEvent.click(redButton);
      expect(screen.getByText("Seleccionado")).toBeInTheDocument();
    }
  });

  test("muestra instrucciones diferentes según el estado de la mezcla", () => {
    render(<ColorMixer />);

    // Instrucción inicial
    expect(screen.getByText(/Selecciona el primer color primario/i)).toBeInTheDocument();

    // Seleccionar primer color
    const redButton = screen.getByText("Rojo").closest("button");
    if (redButton) {
      fireEvent.click(redButton);
      expect(screen.getByText(/Ahora selecciona un segundo color diferente/i)).toBeInTheDocument();
    }
  });

  test("incrementa el contador de mezclas al completar una mezcla", async () => {
    render(<ColorMixer />);

    // Seleccionar primer color (Rojo)
    const redButton = screen.getByText("Rojo").closest("button");
    if (redButton) {
      fireEvent.click(redButton);
    }

    // Seleccionar segundo color (Azul)
    const blueButton = screen.getByText("Azul").closest("button");
    if (blueButton) {
      fireEvent.click(blueButton);
    }

    // Esperar a que se complete la animación y se muestre el resultado
    await waitFor(
      () => {
        expect(screen.getByText(/Creaste/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Verificar que el contador aumentó
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
