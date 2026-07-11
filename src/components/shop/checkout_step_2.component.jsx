import { Button } from "@material-tailwind/react/components/Button";
import { Card, CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import { Typography } from "@material-tailwind/react/components/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@mui/material";
import { useCurrency } from "../../currency";
import { useI18n } from "../../i18n";

const Step2Checkout = ({ handleNext, handlePrev }) => {
  const { formatPrice } = useCurrency();
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-3 mb-1">
      <Card className="mt-6 col-span-2">
        <CardBody>
          <div className="flex items-center my-auto mb-2">
            <IconButton variant="outlined" className="border-none" onClick={handlePrev}>
              <ArrowBackIcon color="black" />
            </IconButton>
            <Typography variant="h5" color="blue-gray" className="">
              {t("checkout.payment_gateway")}
            </Typography>
          </div>
          <img
            className="h-96 w-1/2 object-cover object-center mx-auto mt-1"
            src="/public/1719545334144.6924.png"
            alt="QR code"
          />
          <Typography variant="body" color="blue-gray" className="mt-1 text-center">
            {t("checkout.or_bank_transfer")}
          </Typography>
          <Typography variant="body" color="blue-gray" className="mt-1 text-center">
            {t("checkout.account_number")}: 123456789
          </Typography>
          <Typography variant="body" color="blue-gray" className="mt-1 text-center">
            {t("checkout.account_holder")}: {t("checkout.sample_account_holder")}
          </Typography>
          <Typography variant="body" color="blue-gray" className="mt-1 text-center">
            {t("checkout.transfer_note")}: {t("checkout.transfer_content")}
          </Typography>
        </CardBody>
      </Card>
      <Card className="mt-6">
        <CardBody>
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {t("checkout.order_details")} #MX2001
            </Typography>
            <Typography as="a" href="/cart" color="cyan">
              {t("checkout.edit")}
            </Typography>
          </div>
          <Divider />
          <div className="flex items-center justify-between mt-4">
            <Typography className="" variant="body" color="blue-gray">
              1 x{" "}
              <span className="text-cyan-300 w-[100px] text-wrap">
                {t("checkout.sample_product_name")}
              </span>
            </Typography>
            <div className="flex flex-col">
              <Typography variant="body" color="blue-gray">
                {formatPrice(58000)}
              </Typography>
              <Typography className="line-through text-gray-400" variant="body">
                {formatPrice(58000)}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="body" color="blue-gray">
              {t("checkout.subtotal")}
            </Typography>
            <Typography variant="body" color="blue-gray">
              {formatPrice(2000000)}
            </Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              {t("checkout.discount")}
            </Typography>
            <Typography variant="body" color="blue-gray">
              {formatPrice(0)}
            </Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              {t("checkout.shipping_fee")}
            </Typography>
            <Typography variant="body" color="blue-gray">
              {formatPrice(27000)}
            </Typography>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              {t("checkout.gift_fee")}
            </Typography>
            <Typography variant="body" color="blue-gray">
              {formatPrice(10000)}
            </Typography>
          </div>
          <div className="mt-5 mb-5">
            <Divider />
          </div>
          <div className="flex justify-between items-center mt-2">
            <Typography variant="body" color="blue-gray">
              {t("common.total")}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              {formatPrice(2000000)}
            </Typography>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Typography variant="h5" color="blue-gray">
              {t("checkout.deliver_to")}
            </Typography>
            <Typography color="cyan" onClick={handlePrev}>
              {t("checkout.change")}
            </Typography>
          </div>
          <div className="flex justify-around items-center mt-5">
            <Typography variant="body" color="blue-gray">
              {t("checkout.sample_recipient")}
            </Typography>
            <Divider variant="body" />
            <Typography variant="body" color="blue-gray">
              0912345678
            </Typography>
          </div>
          <div className="mt-5">
            <Typography variant="body" color="blue-gray">
              {t("checkout.sample_address")}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button color="red" fullWidth onClick={handleNext}>
            {t("checkout.confirm")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Step2Checkout;
