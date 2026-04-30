import { Radio } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useI18n } from "../../../i18n";
import {
  SIZES,
  getColorOptions,
  getMaterialOptions,
  getProductFilterLabels,
  toggleSelection,
} from "./productFilter.config";

export const ProductFilterView = ({
  colorOptions,
  labels,
  materialOptions,
  onColorSelect,
  onSizeSelect,
  selectedColor,
  selectedSize,
  sizes,
}) => (
  <>
    <p className="filter-section-title">{labels.material}</p>
    <div className="flex flex-col gap-1">
      {materialOptions.map(({ value, label }) => (
        <Radio
          key={value}
          name="material"
          label={<span className="filter-radio-label">{label}</span>}
        />
      ))}
    </div>

    <p className="filter-section-title">{labels.size}</p>
    <div className="grid grid-cols-3 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          className={`btn-size ${selectedSize === size ? "active" : ""}`}
          onClick={() => onSizeSelect(size)}
        >
          {size}
        </button>
      ))}
    </div>

    <p className="filter-section-title">{labels.color}</p>
    <div className="flex flex-wrap gap-3">
      {colorOptions.map(({ color, label }) => (
        <button
          key={color}
          title={label}
          aria-label={label}
          className={`btn-color-swatch ${selectedColor === color ? "active" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  </>
);

ProductFilterView.propTypes = {
  colorOptions: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  labels: PropTypes.shape({
    material: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  materialOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onColorSelect: PropTypes.func.isRequired,
  onSizeSelect: PropTypes.func.isRequired,
  selectedColor: PropTypes.string,
  selectedSize: PropTypes.string,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ProductFilter = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { t } = useI18n();

  return (
    <ProductFilterView
      colorOptions={getColorOptions(t)}
      labels={getProductFilterLabels(t)}
      materialOptions={getMaterialOptions(t)}
      onColorSelect={(color) =>
        setSelectedColor((currentColor) => toggleSelection(currentColor, color))
      }
      onSizeSelect={(size) =>
        setSelectedSize((currentSize) => toggleSelection(currentSize, size))
      }
      selectedColor={selectedColor}
      selectedSize={selectedSize}
      sizes={SIZES}
    />
  );
};

export default ProductFilter;
