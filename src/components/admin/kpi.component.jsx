import { Typography } from "@material-tailwind/react/components/Typography";
import { Card, CardBody } from "@material-tailwind/react/components/Card";

import PropTypes from "prop-types";
import { useCurrency } from "../../currency";
import { useI18n } from "../../i18n";

/** Handles kpi card. */
const KpiCard = ({ title, price }) => {
  return (
    <Card className="shadow-sm border border-gray-200 !rounded-lg mb-7">
      <CardBody className="p-4">
        <div className="flex justify-between items-center">
          <Typography className="!font-medium !text-xs text-gray-600">{title}</Typography>
          {/* <div className="flex items-center gap-1">
            {icon}
            <Typography color={color} className="font-medium !text-xs">
              {percentage}
            </Typography>
          </div> */}
        </div>
        <Typography color="blue-gray" className="mt-1 font-bold text-2xl">
          {price}
        </Typography>
      </CardBody>
    </Card>
  );
};
const data = [
  { titleKey: "kpi.revenue" },
  { titleKey: "kpi.order_count" },
  { titleKey: "kpi.completed_orders" },
  { titleKey: "kpi.user_count" },
  { titleKey: "kpi.products_sold" },
];

/** Handles kpi. */
const Kpi = ({ stat }) => {
  const { t } = useI18n();
  const { formatPrice, locale } = useCurrency();
  const numberFormatter = new Intl.NumberFormat(locale);
  const orderUnit = t("kpi.order_unit");
  const valuesByTitleKey = {
    "kpi.revenue": formatPrice(stat.income),
    "kpi.order_count": `${numberFormatter.format(stat.order)} ${orderUnit}`,
    "kpi.completed_orders": `${numberFormatter.format(stat.completed)} ${orderUnit}`,
    "kpi.user_count": numberFormatter.format(stat.user),
    "kpi.products_sold": numberFormatter.format(stat.product ?? stat.soldProduct ?? 0),
  };
  const rows = data.map((item) => ({
    title: t(item.titleKey),
    price: valuesByTitleKey[item.titleKey],
  }));

  return (
    <section className="container mx-auto py-5 pe-6">
      <div className="flex justify-between md:items-center"></div>
      <div className="flex flex-col">
        {rows.map((props) => (
          <KpiCard key={props.title} {...props} />
        ))}
      </div>
    </section>
  );
};
KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
export default Kpi;
