import { ROUTES } from "../../constants/routes.constant";
import React from "react";
import { Button } from "@material-tailwind/react/components/Button";
import { Card, CardBody, CardFooter } from "@material-tailwind/react/components/Card";
import { Checkbox } from "@material-tailwind/react/components/Checkbox";
import { Input } from "@material-tailwind/react/components/Input";
import { List, ListItem } from "@material-tailwind/react/components/List";
import { Radio } from "@material-tailwind/react/components/Radio";
import { Textarea } from "@material-tailwind/react/components/Textarea";
import { Typography } from "@material-tailwind/react/components/Typography";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../currency";
import { useI18n } from "../../i18n";
import { STORAGE_KEYS } from "../../constants/storage.constant";

const Step1Checkout = ({ handleNext }) => {
  const { t } = useI18n();
  const [check, setCheck] = React.useState(localStorage.getItem(STORAGE_KEYS.TOKEN) ? true : false);

  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  return (
    <div className="grid grid-cols-3 mb-1">
      <Card className="mt-6">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            1. {t("checkout.shipping_address")}
          </Typography>
          <List>
            {localStorage.getItem(STORAGE_KEYS.TOKEN) ? (
              <ListItem onClick={() => setCheck(true)}>
                <div className="flex items-center">
                  <Radio
                    checked={check}
                    name="type"
                    label={
                      <div className="ms-3">
                        <div className="flex justify-around items-center">
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
                      </div>
                    }
                  />
                </div>
              </ListItem>
            ) : (
              <ListItem onClick={() => navigate(ROUTES.LOGIN)}>
                <div className="flex items-center">
                  <Radio
                    name="address"
                    label={<Typography>{t("checkout.login_to_select_address")}</Typography>}
                  />
                </div>
              </ListItem>
            )}
            <ListItem onClick={() => setCheck(false)}>
              <div className="flex items-center">
                <Radio
                  checked={!check}
                  name="address"
                  label={<Typography>{t("checkout.new_address")}</Typography>}
                />
              </div>
            </ListItem>
          </List>
          {!check && (
            <form className="mb-2 w-full mx-auto">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  {t("checkout.recipient_name")}
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  {t("checkout.phone")}
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  {t("checkout.address")}
                </Typography>
                <Textarea
                  className="min-h-full border-1 focus:!border-gray-900"
                  containerProps={{
                    className: "grid h-full",
                  }}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </form>
          )}
        </CardBody>
      </Card>
      <Card className="mt-6">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            2. {t("checkout.shipping_method")}
          </Typography>
          <Typography>
            <List>
              <ListItem onClick={() => setCheck1(1)}>
                <div className="flex items-center">
                  <Radio
                    checked={check1 === 1}
                    name="type"
                    label={
                      <>
                        <Typography>{t("checkout.shipping_saver")}</Typography>
                        <Typography>
                          {t("checkout.shipping_saver_desc")} |{" "}
                          <span className="text-cyan-300">{formatPrice(20000)}</span>
                        </Typography>
                      </>
                    }
                  />
                </div>
              </ListItem>
              <ListItem onClick={() => setCheck1(2)}>
                <div className="flex items-center">
                  <Radio
                    checked={check1 === 2}
                    name="type"
                    label={
                      <>
                        <Typography>{t("checkout.shipping_standard")}</Typography>
                        <Typography>
                          {t("checkout.shipping_standard_desc")} |{" "}
                          <span className="text-cyan-300">{formatPrice(25000)}</span>
                        </Typography>
                      </>
                    }
                  />
                </div>
              </ListItem>
              <ListItem onClick={() => setCheck1(3)}>
                <div className="flex items-center">
                  <Radio
                    checked={check1 === 3}
                    name="type"
                    label={
                      <>
                        <Typography>{t("checkout.shipping_express")}</Typography>
                        <Typography>
                          {t("checkout.shipping_express_desc")} |{" "}
                          <span className="text-cyan-300">{formatPrice(30000)}</span>
                        </Typography>
                      </>
                    }
                  />
                </div>
              </ListItem>
            </List>
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mt-2">
            3. {t("checkout.payment_method")}
          </Typography>
          <Typography>
            <List>
              <ListItem onClick={() => setCheck2(1)}>
                <div className="flex items-center">
                  <Radio
                    checked={check2 === 1}
                    name="method"
                    label={<Typography>{t("checkout.payment_cod")}</Typography>}
                  />
                </div>
              </ListItem>
              <ListItem onClick={() => setCheck2(2)}>
                <div className="flex items-center">
                  <Radio
                    checked={check2 === 2}
                    name="method"
                    label={
                      <>
                        <Typography>{t("checkout.payment_card")}</Typography>
                      </>
                    }
                  />
                </div>
              </ListItem>
              <ListItem onClick={() => setCheck2(3)}>
                <div className="flex items-center">
                  <Radio
                    checked={check2 === 3}
                    name="method"
                    label={<Typography>{t("checkout.payment_momo")}</Typography>}
                  />
                </div>
              </ListItem>
            </List>
          </Typography>
        </CardBody>
      </Card>
      <Card className="mt-6">
        <CardBody>
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {t("checkout.confirm_order")}
            </Typography>
            <Typography as="a" href={ROUTES.CART} color="cyan">
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
          <Typography variant="body" color="blue-gray" className="mt-5 mb-3">
            {t("checkout.discount_code")}
          </Typography>
          <div className="flex items-center">
            <Input
              type="text"
              size="sm"
              placeholder={t("checkout.discount_code")}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <Button size="md" className="w-1/2" variant="outlined" color="lightBlue">
              {t("checkout.apply_code")}
            </Button>
          </div>
          <Typography variant="body" color="green">
            MX2000
          </Typography>
          <Checkbox label={t("checkout.gift_wrap")} />
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
        </CardBody>
        <CardFooter className="pt-0">
          <Button color="red" fullWidth onClick={handleNext}>
            {t("checkout.pay")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Step1Checkout;
