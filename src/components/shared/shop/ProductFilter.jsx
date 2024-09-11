import { Button, Radio, Tooltip, Typography } from "@material-tailwind/react";
import React from "react";

const ProductFilter = () => {
  const materials = ["Cotton", "Polyester", "Wool", "Silk", "Linen", "Denim"];
  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const colors = [
    {
      color: "#aaaaaa",
      label: "Màu xám",
    },
    {
      color: "#ffffaa",
      label: "Màu vàng",
    },
    {
      color: "#012345",
      label: "Màu xanh",
    },
    {
      color: "#777777",
      label: "Màu xám đen",
    },
  ];
  return (
    <>
      <Typography variant="h6">Chất liệu</Typography>
      <div className="flex flex-col">
        {materials.map((material) => (
          <Radio
            key={material}
            name="material"
            label={
              <div>
                <Typography color="blue-gray" className="font-medium">
                  {material}
                </Typography>
              </div>
            }
          />
        ))}
      </div>
      <Typography variant="h6" className="mt-5 mb-5">
        Size
      </Typography>
      <div className="grid grid-cols-3 gap-4">
        {sizes.map((size) => (
          <Button
            key={size}
            size="sm"
            variant="gradient"
            color="white"
            className="rounded-full"
          >
            {size}
          </Button>
        ))}
      </div>
      <Typography variant="h6" className="mt-5 mb-5">
        Màu sắc
      </Typography>
      <div className="grid grid-cols-4 gap-4">
        {colors.map(({ color, label }, index) => (
          <Tooltip key={index} content={label}>
            <Button
              size="sm"
              className="rounded-full"
              style={{ backgroundColor: color }}
            >
              {""}
            </Button>
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default ProductFilter;
