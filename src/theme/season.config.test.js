import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_SEASON,
  SEASON_OPTIONS,
  detectSeasonByMonth,
  normalizeSeason,
  resolveSeason,
} from "./season.config";

describe("season config", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("defines supported season modes", () => {
    expect(SEASON_OPTIONS.map(({ value }) => value)).toEqual([
      "auto",
      "spring",
      "summer",
      "autumn",
      "winter",
    ]);
  });

  it("normalizes unknown season values to the default", () => {
    expect(normalizeSeason("summer")).toBe("summer");
    expect(normalizeSeason("unknown")).toBe(DEFAULT_SEASON);
    expect(normalizeSeason()).toBe(DEFAULT_SEASON);
  });

  it("detects and resolves the calendar season", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-18T00:00:00Z"));
    expect(detectSeasonByMonth()).toBe("summer");
    expect(resolveSeason("auto")).toBe("summer");
    expect(resolveSeason("winter")).toBe("winter");

    vi.setSystemTime(new Date("2026-10-18T00:00:00Z"));
    expect(detectSeasonByMonth()).toBe("autumn");

    vi.setSystemTime(new Date("2026-01-18T00:00:00Z"));
    expect(detectSeasonByMonth()).toBe("winter");
  });
});
