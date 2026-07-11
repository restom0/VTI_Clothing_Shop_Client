import { Radio } from "@material-tailwind/react/components/Radio";
import { Typography } from "@material-tailwind/react/components/Typography";
import { useI18n } from "../../../i18n";

const CategoryFilter = () => {
  const { t } = useI18n();
  const categories = [
    "filter.category_shirts",
    "filter.category_pants",
    "filter.category_shoes",
    "filter.category_accessories",
    "filter.category_bags",
    "filter.category_watches",
    "filter.category_glasses",
    "filter.category_perfume",
  ];
  return (
    <>
      <Typography variant="h6">{t("filter.product_type")}</Typography>
      <div className="flex flex-col">
        {categories.map((category) => (
          <Radio
            key={category}
            name="category"
            label={
              <div>
                <Typography color="blue-gray" className="font-medium">
                  {t(category)}
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
