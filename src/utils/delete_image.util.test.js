import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { handleDelete } from "./delete_image.util";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("delete image utility", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-16T00:00:00Z"));
    axios.post.mockResolvedValue({ data: { result: "ok" } });
  });

  it("posts a signed Cloudinary destroy request", () => {
    handleDelete("public-avatar-id");

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("https://api.cloudinary.com/v1_1/"),
      expect.objectContaining({
        public_id: "public-avatar-id",
        signature: expect.any(String),
        timestamp: Date.now(),
      })
    );
  });

  it("logs delete failures without throwing", async () => {
    const error = new Error("network");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.post.mockRejectedValue(error);

    handleDelete("public-avatar-id");
    await Promise.resolve();

    expect(consoleError).toHaveBeenCalledWith("Unable to delete image: ", error);
    consoleError.mockRestore();
  });
});
