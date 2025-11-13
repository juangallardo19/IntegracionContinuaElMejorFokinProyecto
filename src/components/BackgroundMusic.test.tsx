import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BackgroundMusic from "./BackgroundMusic";

describe("BackgroundMusic", () => {
  it("renders the audio element", () => {
    const { container } = render(<BackgroundMusic />);
    const audio = container.querySelector("audio");
    expect(audio).toBeInTheDocument();
  });

  it("renders the control button", () => {
    render(<BackgroundMusic />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
