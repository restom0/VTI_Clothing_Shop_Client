import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  DEFAULT_SEASON,
  SEASON_OPTIONS,
  SEASON_STORAGE_KEY,
  normalizeSeason,
  resolveSeason,
} from "./season.config";

const SeasonContext = createContext(null);

/** Gets initial season. */
const getInitialSeason = () => {
  if (typeof window === "undefined") return DEFAULT_SEASON;
  return normalizeSeason(window.localStorage.getItem(SEASON_STORAGE_KEY));
};

/** Handles apply season to document. */
const applySeasonToDocument = (activeSeason) => {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.season = activeSeason;
};

/** Handles app season provider. */
export const AppSeasonProvider = ({ children }) => {
  const [season, setSeason] = useState(getInitialSeason);

  /** Sets season. */
  const updateSeason = useCallback((next) => {
    setSeason(normalizeSeason(next));
  }, []);

  // The "active" season is what the CSS actually uses — auto resolved to real name
  const activeSeason = resolveSeason(season);

  // Persist to localStorage
  useEffect(() => {
    window.localStorage.setItem(SEASON_STORAGE_KEY, season);
  }, [season]);

  // Apply data-season attribute to <html>
  useEffect(() => {
    applySeasonToDocument(activeSeason);
  }, [activeSeason]);

  /** Handles value. */
  const value = useMemo(
    () => ({
      activeSeason, // resolved: "spring" | "summer" | "autumn" | "winter"
      season, // stored: "auto" | "spring" | "summer" | "autumn" | "winter"
      setSeason: updateSeason,
      seasonOptions: SEASON_OPTIONS,
    }),
    [activeSeason, season, updateSeason]
  );

  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
};

AppSeasonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/** Uses season mode. */
export const useSeasonMode = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error("useSeasonMode must be used inside AppSeasonProvider");
  }
  return context;
};
