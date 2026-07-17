import { useEffect, useState } from "react";

export const DEFAULT_SKELETON_DELAY_MS = 400;

/** Uses delayed loading. */
const useDelayedLoading = (isLoading, delayMs = DEFAULT_SKELETON_DELAY_MS) => {
  const [shouldShowSkeleton, setShouldShowSkeleton] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShouldShowSkeleton(false);
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setShouldShowSkeleton(true);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs, isLoading]);

  return shouldShowSkeleton;
};

export default useDelayedLoading;
