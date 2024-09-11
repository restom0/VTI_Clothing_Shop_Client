import { Radio, Typography } from "@material-tailwind/react";
import React from "react";

const CategoryFilter = () => {
  const categories = [
    "Áo",
    "Quần",
    "Giày",
    "Phụ kiện",
    "Túi xách",
    "Đồng hồ",
    "Mắt kính",
    "Nước hoa",
  ];
  return (
    <>
      <Typography variant="h6">Loại sản phẩm</Typography>
      <div className="flex flex-col">
        {categories.map((category) => (
          <Radio
            key={category}
            name="category"
            label={
              <div>
                <Typography color="blue-gray" className="font-medium">
                  {category}
                </Typography>
              </div>
            }
          />
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
