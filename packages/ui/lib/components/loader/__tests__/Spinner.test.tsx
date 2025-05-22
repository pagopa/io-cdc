import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "../Spinner";

describe("Spinner", () => {
  it("renders with expected style", () => {
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
