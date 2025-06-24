import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CheckboxList } from "../CheckboxList";

const options = [
  { label: "Option 1", value: "a" },
  { label: "Option 2", value: "b" },
  { label: "Option 3", value: "c" },
];

describe("Test CheckboxList components", () => {
  it("renders title and all options", () => {
    render(
      <CheckboxList
        buttonLabel="Select All"
        multiple
        onChange={vi.fn()}
        options={options}
        title="Test Title"
        value={[]}
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    options.forEach(({ label }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("handles single selection", () => {
    const handleChange = vi.fn();

    render(
      <CheckboxList
        onChange={handleChange}
        options={options}
        title="Single Select"
        value={undefined}
      />,
    );

    const checkbox = screen.getByLabelText("Option 1");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith("a");
  });

  it("handles multiple selection", () => {
    const handleChange = vi.fn();
    const value = ["a"];

    render(
      <CheckboxList
        buttonLabel="Select All"
        multiple
        onChange={handleChange}
        options={options}
        title="Multiple Select"
        value={value}
      />,
    );

    fireEvent.click(screen.getByLabelText("Option 2"));
    expect(handleChange).toHaveBeenCalledWith(["a", "b"]);
  });

  it("select all button selects all", () => {
    const handleChange = vi.fn();

    render(
      <CheckboxList
        buttonLabel="Select All"
        multiple
        onChange={handleChange}
        options={options}
        title="Select All Test"
        value={[]}
      />,
    );

    fireEvent.click(screen.getByText("Select All"));
    expect(handleChange).toHaveBeenCalledWith(["a", "b", "c"]);
  });
});
