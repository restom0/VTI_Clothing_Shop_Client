import React, { useState } from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography,
  CardBody,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Rating } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Pagination from "../shared/pagination.component";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Tablist from "../shared/list_tab.component";
import { voucher } from "../../constants/tab.constant";
import {
  useGetAvailableVouchersQuery,
  useGetVouchersQuery,
} from "../../apis/voucher.api";
import Loading from "../shared/loading.component";
const Voucher = () => {
  const [tab, setTab] = useState("ALL");
  const {
    data: vouchers,
    isLoading: loadingVouchers,
    isError: errorVouchers,
  } = useGetVouchersQuery();
  const {
    data: availablevoucher,
    isLoading: loadingAvailableVoucher,
    isError: errorAvailableVoucher,
  } = useGetAvailableVouchersQuery();
  if (loadingVouchers || loadingAvailableVoucher) return <Loading />;
  if (errorVouchers || errorAvailableVoucher) return <div>Error</div>;
  return (
    <>
      <Card className="rounded-b-none">
        <CardBody className="pb-0">
          <Typography variant="h4" color="blue-gray" className="my-5">
            Mã giảm giá
          </Typography>
        </CardBody>
        <Tablist TABS={voucher} tab={tab} setTab={setTab} />
      </Card>

      {tab === "ALL" ? (
        <>
          <div className="grid grid-cols-2 gap-8">
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <Pagination />
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-8">
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-2 my-3">
              <div className="grid grid-cols-12 gap-8 p-5">
                <div className="col-span-6">
                  <img
                    className="h-32 w-32 object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                  />
                </div>
                <div className="col-span-6 grid grid-rows-2">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Giảm 100K
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight"
                    >
                      Cho sản phẩm bất kì
                    </Typography>
                  </div>
                  <div></div>
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mb-2 font-extralight text-right"
                    >
                      HSD: 12/12/2022
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <Pagination />
        </>
      )}
    </>
  );
};
export default Voucher;
