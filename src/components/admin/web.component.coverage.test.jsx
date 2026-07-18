import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

const harness = vi.hoisted(() => ({
  deleteOpen: true,
  handleDeleteOpen: vi.fn(),
  handleDetailOpen: vi.fn(),
  handleUpdateOpen: vi.fn(),
  updateOpen: true,
}));

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  const useEffect = (effect) => effect();

  return {
    ...actual,
    default: { ...actual.default, useEffect },
    useEffect,
  };
});
vi.mock("@material-tailwind/react/components/Typography", async () => {
  const React = await import("react");
  return { Typography: ({ children }) => React.createElement("div", null, children) };
});
vi.mock("@mui/material", async () => {
  const React = await import("react");
  return { Container: ({ children }) => React.createElement("section", null, children) };
});
vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn(() => Promise.resolve({ isConfirmed: true })) },
}));
vi.mock("../../configs/sweetalert2.config", () => ({
  Toast: { fire: vi.fn(() => Promise.resolve({ isConfirmed: true })) },
}));
vi.mock("../../hooks/useOpen.hook", () => ({
  default: () => harness,
}));
vi.mock("../shared/table.component", async () => {
  const React = await import("react");
  return {
    default: ({ TABLE_ROWS }) =>
      React.createElement("table", null, TABLE_ROWS.map((row) => row.name).join(",")),
  };
});

afterEach(() => {
  harness.handleDeleteOpen.mockClear();
  harness.handleDetailOpen.mockClear();
  harness.handleUpdateOpen.mockClear();
});

describe("Web admin effect coverage", () => {
  it("confirms restore and maintenance actions when dialogs resolve", async () => {
    const React = await import("react");
    const { default: Web } = await import("./web.component.jsx");

    expect(renderToStaticMarkup(React.createElement(Web))).toContain("Danh sách trang web");
    await Promise.resolve();

    expect(harness.handleUpdateOpen).toHaveBeenCalled();
    expect(harness.handleDeleteOpen).toHaveBeenCalled();
  });
});
