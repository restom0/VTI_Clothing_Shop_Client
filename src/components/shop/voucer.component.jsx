import { useState } from "react";

import { Card, CardBody } from "@material-tailwind/react/components/Card";
import { Typography } from "@material-tailwind/react/components/Typography";
import Pagination from "../shared/pagination.component";
import Tablist from "../shared/list_tab.component";
import { voucher } from "../../constants/tab.constant";
import { useGetAvailableVouchersQuery, useGetVouchersQuery } from "../../apis/voucher.api";
import Loading from "../shared/loading.component";
import { useI18n } from "../../i18n";

const VOUCHER_CARD_KEYS = ["voucher-1", "voucher-2", "voucher-3", "voucher-4"];
const VOUCHER_IMAGE_URL =
  "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80";

/** Handles voucher. */
const Voucher = () => {
  const [tab, setTab] = useState("ALL");
  const { t } = useI18n();
  const { isLoading: loadingVouchers, isError: errorVouchers } = useGetVouchersQuery();
  const { isLoading: loadingAvailableVoucher, isError: errorAvailableVoucher } =
    useGetAvailableVouchersQuery();
  if (loadingVouchers || loadingAvailableVoucher) return <Loading />;
  if (errorVouchers || errorAvailableVoucher) return <div>{t("profile.generic_error")}</div>;

  return (
    <>
      <Card className="rounded-b-none">
        <CardBody className="pb-0">
          <Typography variant="h4" color="blue-gray" className="my-5">
            {t("profile.menu_vouchers")}
          </Typography>
        </CardBody>
        <Tablist TABS={voucher} tab={tab} setTab={setTab} />
      </Card>

      <div className="grid grid-cols-2 gap-8">
        {VOUCHER_CARD_KEYS.map((cardKey) => (
          <Card className="p-2 my-3" key={cardKey}>
            <div className="grid grid-cols-12 gap-8 p-5">
              <div className="col-span-6">
                <img
                  className="h-32 w-32 object-cover object-center"
                  src={VOUCHER_IMAGE_URL}
                  alt="Nature"
                />
              </div>
              <div className="col-span-6 grid grid-rows-2">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {t("voucher.discount_100k")}
                  </Typography>
                  <Typography variant="small" color="gray" className="mb-2 font-extralight">
                    {t("voucher.any_product")}
                  </Typography>
                </div>
                <div></div>
                <div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mb-2 font-extralight text-right"
                  >
                    {t("voucher.expiry")}: 12/12/2022
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Pagination />
    </>
  );
};
export default Voucher;
