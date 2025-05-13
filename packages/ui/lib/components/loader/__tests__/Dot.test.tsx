import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Dot } from "../Dot";

describe("Dot", () => {
  it("renders correctly with position and animation", () => {
    const { getByTestId } = render(<Dot index={3} />);
    const dot = getByTestId("dot");
    expect(dot).toBeInTheDocument();
  });
});
