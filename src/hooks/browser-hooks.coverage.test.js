import { afterEach, describe, expect, it, vi } from "vitest";

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

const withHookRuntime = async (
  { effectCleanup = false, refs = [], runEffects = true } = {},
  callback
) => {
  const cleanups = [];
  const setters = [];
  let refIndex = 0;
  await vi.resetModules();

  const useEffect = (effect) => {
    if (!runEffects) return;
    const cleanup = effect();
    if (typeof cleanup === "function") cleanups.push(cleanup);
  };
  const useRef = (initialValue) => refs[refIndex++] ?? { current: initialValue };
  const useState = (initialValue) => {
    const setter = vi.fn();
    setters.push(setter);
    return [typeof initialValue === "function" ? initialValue() : initialValue, setter];
  };

  vi.doMock("react", async () => {
    const actual = await vi.importActual("react");
    const defaultExport = {
      ...actual.default,
      useEffect,
      useRef,
      useState,
    };

    return {
      ...actual,
      default: defaultExport,
      useEffect,
      useRef,
      useState,
    };
  });

  try {
    const result = await callback({ cleanups, setters });
    if (effectCleanup) {
      for (const cleanup of cleanups) cleanup();
    }
    return result;
  } finally {
    vi.doUnmock("react");
    await vi.resetModules();
  }
};

afterEach(() => {
  vi.restoreAllMocks();
  delete globalThis.IntersectionObserver;
  delete globalThis.window;
  delete globalThis.fetch;
  delete globalThis.requestAnimationFrame;
  delete globalThis.cancelAnimationFrame;
  vi.useRealTimers();
});

describe("browser hook effect coverage", () => {
  it("runs useFetch success and error request branches", async () => {
    globalThis.fetch = vi.fn(async () => ({
      json: async () => ({ object: ["shirt"] }),
      ok: true,
      status: 200,
    }));

    await withHookRuntime({}, async ({ setters }) => {
      const { default: useFetch } = await import("./useFetch.hook");

      expect(useFetch("/products")).toEqual([null, false, null]);
      await flushPromises();

      expect(fetch).toHaveBeenCalled();
      expect(setters[1]).toHaveBeenCalledWith(true);
      expect(setters[0]).toHaveBeenCalledWith({ object: ["shirt"] });
      expect(setters[1]).toHaveBeenLastCalledWith(false);
    });

    globalThis.fetch = vi.fn(async () => ({
      json: async () => ({}),
      ok: false,
      status: 500,
    }));

    await withHookRuntime({}, async ({ setters }) => {
      const { default: useFetch } = await import("./useFetch.hook");

      useFetch("/broken");
      await flushPromises();

      expect(setters[2]).toHaveBeenCalledWith("HTTP error! status: 500");
      expect(setters[1]).toHaveBeenLastCalledWith(false);
    });
  });

  it("runs in-view fallback and observer branches", async () => {
    const target = { id: "hero" };

    await withHookRuntime({ refs: [{ current: target }] }, async ({ setters }) => {
      const { default: useInView } = await import("./useInView.hook");

      expect(useInView().ref.current).toBe(target);
      expect(setters[0]).toHaveBeenCalledWith(true);
    });

    const unobserve = vi.fn();
    const disconnect = vi.fn();
    globalThis.IntersectionObserver = class IntersectionObserver {
      constructor(callback, options) {
        this.callback = callback;
        this.options = options;
      }

      observe(element) {
        this.element = element;
        this.callback([{ isIntersecting: true }]);
        this.callback([{ isIntersecting: false }]);
      }

      unobserve = unobserve;
      disconnect = disconnect;
    };

    await withHookRuntime(
      { effectCleanup: true, refs: [{ current: target }] },
      async ({ setters }) => {
        const { default: useInView } = await import("./useInView.hook");

        useInView({ once: false, rootMargin: "10px", threshold: 0.5 });

        expect(setters[0]).toHaveBeenCalledWith(true);
        expect(setters[0]).toHaveBeenCalledWith(false);
      }
    );
    expect(disconnect).toHaveBeenCalled();

    await withHookRuntime({ refs: [{ current: target }] }, async () => {
      const { default: useInView } = await import("./useInView.hook");

      useInView();

      expect(unobserve).toHaveBeenCalledWith(target);
    });
  });

  it("calculates parallax offsets and cleans up listeners", async () => {
    const scrollTarget = {
      getBoundingClientRect: vi.fn(() => ({ bottom: 700, height: 200, top: 100 })),
    };
    const scrollHandlers = [];
    globalThis.window = {
      addEventListener: vi.fn((eventName, handler) => {
        if (eventName === "scroll") scrollHandlers.push(handler);
      }),
      innerHeight: 800,
      removeEventListener: vi.fn(),
    };
    globalThis.requestAnimationFrame = vi.fn((callback) => {
      callback();
      return 7;
    });
    globalThis.cancelAnimationFrame = vi.fn();

    await withHookRuntime(
      { effectCleanup: true, refs: [{ current: scrollTarget }, { current: 4 }] },
      async ({ setters }) => {
        const { default: useParallax } = await import("./useParallax.hook");

        const { ref, offsetY } = useParallax({ clamp: 20, speed: 0.5 });
        scrollHandlers.forEach((handler) => handler());

        expect(ref.current).toBe(scrollTarget);
        expect(offsetY).toBe(0);
        expect(setters[0]).toHaveBeenCalledWith(-20);
      }
    );

    expect(cancelAnimationFrame).toHaveBeenCalledWith(4);
    expect(window.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("runs responsive column resize and server initial branches", async () => {
    const resizeHandlers = [];
    globalThis.window = {
      addEventListener: vi.fn((eventName, handler) => {
        if (eventName === "resize") resizeHandlers.push(handler);
      }),
      innerWidth: 700,
      removeEventListener: vi.fn(),
    };
    globalThis.requestAnimationFrame = vi.fn((callback) => {
      callback();
      return 9;
    });
    globalThis.cancelAnimationFrame = vi.fn();

    await withHookRuntime({ effectCleanup: true }, async ({ setters }) => {
      const { default: useResponsiveColumns } = await import("./useResponsiveColumns.hook");

      expect(useResponsiveColumns()).toBe(2);
      window.innerWidth = 1200;
      resizeHandlers.forEach((handler) => handler());

      expect(setters[0]).toHaveBeenCalledWith(2);
      expect(setters[0]).toHaveBeenCalledWith(3);
    });

    expect(cancelAnimationFrame).toHaveBeenCalledWith(9);
    expect(window.removeEventListener).toHaveBeenCalledWith("resize", expect.any(Function));

    delete globalThis.window;
    await withHookRuntime({ runEffects: false }, async () => {
      const { default: useResponsiveColumns } = await import("./useResponsiveColumns.hook");

      expect(useResponsiveColumns([{ columns: 4, minWidth: 0 }])).toBe(4);
    });
  });

  it("runs delayed-loading immediate and delayed branches", async () => {
    vi.useFakeTimers();

    await withHookRuntime({}, async ({ setters }) => {
      const { default: useDelayedLoading } = await import("./useDelayedLoading.hook");

      expect(useDelayedLoading(false, 25)).toBe(false);
      expect(setters[0]).toHaveBeenCalledWith(false);
    });

    await withHookRuntime({ effectCleanup: true }, async ({ setters }) => {
      const { default: useDelayedLoading } = await import("./useDelayedLoading.hook");

      expect(useDelayedLoading(true, 25)).toBe(false);
      vi.advanceTimersByTime(25);

      expect(setters[0]).toHaveBeenCalledWith(true);
    });
  });
});
