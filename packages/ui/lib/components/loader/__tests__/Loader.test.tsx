import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Loader } from "../Loader";

describe("Test Loader component", () => {
  it("renders Spinner container", () => {
    render(<Loader />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders 8 Dot elements", () => {
    render(<Loader />);
    const dots = screen.getAllByTestId("dot");
    expect(dots).toHaveLength(8);
  });
});
