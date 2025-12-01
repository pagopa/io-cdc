import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Toast } from "../Toast";

describe("Test Toast Components", () => {
  it("Should match the snapshot with default type", () => {
    const comp = render(<Toast message="Default" messageType="default" />);
    expect(comp).toMatchSnapshot();
  });
  it("Should match the snapshot with success type", () => {
    const comp = render(<Toast message="Success" messageType="success" />);
    expect(comp).toMatchSnapshot();
  });
  it("Should match the snapshot with error type", () => {
    const comp = render(<Toast message="Error" messageType="error" />);
    expect(comp).toMatchSnapshot();
  });
});
