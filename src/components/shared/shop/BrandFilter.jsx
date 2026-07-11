import { Radio } from "@material-tailwind/react/components/Radio";
import { Typography } from "@material-tailwind/react/components/Typography";

const BrandFilter = () => {
  const brands = [
    "Adidas",
    "Nike",
    "Puma",
    "Converse",
    "Vans",
    "New Balance",
    "Balenciaga",
    "Gucci",
  ];
  return (
    <>
      <Typography variant="h6">Thương hiệu</Typography>
      <div className="flex flex-col">
        {brands.map((brand) => (
          <Radio
            key={brand}
            name="brand"
            label={
              <div>
                <Typography color="blue-gray" className="font-medium">
                  {brand}
                </Typography>
              </div>
            }
          />
        ))}
      </div>
    </>
  );
};

export default BrandFilter;
