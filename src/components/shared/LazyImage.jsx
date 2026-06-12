import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * LazyImage — drop-in <img> replacement with:
 *  - Native loading="lazy" (browser-level deferral)
 *  - Shimmer placeholder while loading (via .lazy-image-wrapper CSS)
 *  - Smooth fade-in once the image has loaded
 *  - Falls back gracefully if src is empty/null
 *
 * Props mirror <img>: src, alt, className, style, width, height, ...rest
 * wrapperClassName — extra classes on the wrapping div
 * aspectRatio      — CSS aspect-ratio value (e.g. "4/3", "1/1"). Helps
 *                    the browser reserve layout space before load.
 */
const LazyImage = ({
  src,
  alt = "",
  className = "",
  wrapperClassName = "",
  style,
  aspectRatio,
  width,
  height,
  ...rest
}) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // If image is already cached (complete), mark immediately
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  const wrapperStyle = {
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      className={`lazy-image-wrapper ${loaded ? "loaded" : ""} ${wrapperClassName}`}
      style={wrapperStyle}
    >
      {src ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${loaded ? "img-loaded" : ""} ${className}`}
          style={style}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)} // remove shimmer even on broken image
          {...rest}
        />
      ) : (
        // Empty placeholder — shimmer runs until a real src is provided
        <div style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  style: PropTypes.object,
  aspectRatio: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LazyImage;
