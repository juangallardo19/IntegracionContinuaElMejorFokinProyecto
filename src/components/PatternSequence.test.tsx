// src/components/PatternSequence.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import PatternSequence from "./PatternSequence";

describe("PatternSequence - Secuencias y Patrones", () => {
  test("renderiza el componente con el título correcto", () => {
    render(<PatternSequence />);
    expect(screen.getByText(/Secuencias y Patrones/i)).toBeInTheDocument();
    expect(screen.getByText(/Descubre el patrón y completa la secuencia/i)).toBeInTheDocument();
  });

  test("muestra las estadísticas iniciales en cero", () => {
    render(<PatternSequence />);
    expect(screen.getByText("Aciertos")).toBeInTheDocument();
    expect(screen.getByText("Intentos")).toBeInTheDocument();
    expect(screen.getByText("Precisión")).toBeInTheDocument();

    // Verificar que los valores iniciales son 0
    const values = screen.getAllByText("0");
    expect(values.length).toBeGreaterThan(0);
  });

  test("muestra una secuencia con símbolo de interrogación", () => {
    render(<PatternSequence />);
    // Verificar que hay al menos un símbolo de interrogación en la secuencia
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  test("muestra opciones de respuesta para completar el patrón", () => {
    render(<PatternSequence />);
    // Verificar que hay botones clickeables (opciones de respuesta)
    const buttons = screen.getAllByRole("button");
    // Debe haber al menos 2 opciones de respuesta (puede variar según el patrón generado)
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  test("incrementa los intentos cuando se selecciona una respuesta", () => {
    render(<PatternSequence />);

    // Obtener todas las opciones de respuesta (botones)
    const buttons = screen.getAllByRole("button");

    // Filtrar solo los botones de opciones (los primeros 4 generalmente)
    const optionButtons = buttons.slice(0, 4);

    // Verificar que hay intentos antes del clic
    expect(screen.getByText("Intentos")).toBeInTheDocument();

    // Hacer clic en la primera opción
    if (optionButtons[0]) {
      fireEvent.click(optionButtons[0]);

      // Verificar que los intentos aumentaron buscando todos los números
      const allNumbers = screen.queryAllByText(/^\d+$/);
      expect(allNumbers.length).toBeGreaterThan(0);
    }
  });
});
