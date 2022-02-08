import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title", () => {
  render(<App />);
  const Element = screen.getByText(/100 photos/i);
  expect(Element).toBeInTheDocument();
});
