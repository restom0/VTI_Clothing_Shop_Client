import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const createStorage = () => {
  const values = new Map([["token", "client-token"]]);

  return {
    clear: vi.fn(() => values.clear()),
    getItem: vi.fn((key) => values.get(key) ?? null),
    removeItem: vi.fn((key) => values.delete(key)),
    setItem: vi.fn((key, value) => values.set(key, String(value))),
  };
};

beforeEach(() => {
  globalThis.localStorage = createStorage();
  globalThis.window = {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  globalThis.fetch = vi.fn(async () => ({
    json: async () => ({ public_id: "uploaded-public-id", url: "/uploaded.png" }),
  }));
  globalThis.FormData = class FormData {
    constructor() {
      this.entries = [];
    }

    append(key, value) {
      this.entries.push([key, value]);
    }
  };
});

describe("misc client coverage", () => {
  it("configures the Redux store and records rejected RTK query metrics", async () => {
    const { store } = await import("./apps/store.js");

    expect(store.getState()).toHaveProperty("reactMetrics");

    store.dispatch({
      error: { message: "Rejected" },
      meta: {
        arg: { endpointName: "getBrands" },
        rejectedWithValue: true,
        requestId: "request-1",
        requestStatus: "rejected",
      },
      payload: { message: "offline" },
      type: "brandApi/executeQuery/rejected",
    });
    await Promise.resolve();

    expect(store.getState().reactMetrics.webMetrics["rtk-query-error"].route).toBe("getBrands");
  });

  it("renders standalone SVG assets", async () => {
    const [{ default: Icon2 }, { default: LoginIcon }] = await Promise.all([
      import("./assets/Icon2.jsx"),
      import("./assets/login_icon.asset.jsx"),
    ]);

    expect(renderToStaticMarkup(<Icon2 />)).toContain("oops-404-error");
    expect(renderToStaticMarkup(<LoginIcon />)).toContain("mobile-login");
  });

  it("uploads images and passes Cloudinary response data to setters", async () => {
    const { default: ImageUpload } = await import("./components/upload_image.component.jsx");
    const setAvatar = vi.fn();
    const setPublicId = vi.fn();
    const element = ImageUpload({ image: "avatar-file", setAvatar, setPublicId });
    const input = element.props.children;

    await input.props.onChange({ target: { files: ["avatar-bytes"] } });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.cloudinary.com/v1_1/dnv0lrysf/image/upload",
      expect.objectContaining({ method: "POST" })
    );
    expect(setAvatar).toHaveBeenCalledWith("/uploaded.png");
    expect(setPublicId).toHaveBeenCalledWith("uploaded-public-id");
  });
});
