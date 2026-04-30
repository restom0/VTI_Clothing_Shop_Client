import PropTypes from "prop-types";

const SkeletonBlock = ({
  as: Component = "div",
  className = "",
  children = "\u00A0",
  ...props
}) => (
  <Component
    className={`skeleton ${className}`.trim()}
    aria-hidden="true"
    {...props}
  >
    {children}
  </Component>
);

SkeletonBlock.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default SkeletonBlock;
