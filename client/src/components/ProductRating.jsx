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
import Pagination from "../layouts/Pagination";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Tablist from "../layouts/Tablist";
import { rating } from "../constants/tab";
const ProductRating = () => {
  const [tab, setTab] = useState("unrate");
  const data = [
    {
      label: "Chờ đánh giá",
      value: "unrate",
      desc: `It really matters and then like it really doesn't matter.
        What matters is the people who are sparked by it. And the people 
        who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Đã đánh giá",
      value: "rated",
      desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  return (
    <>
      <Card className="rounded-b-none">
        <CardBody className="pb-0">
          <Typography variant="h4" color="blue-gray" className="my-5">
            Đánh giá của bạn
          </Typography>
        </CardBody>
        <Tablist TABS={rating} tab={tab} setTab={setTab} />
      </Card>

      {tab === "unrate" ? (
        <>
          <Card className="p-2 my-3">
            <div className="grid grid-cols-12 gap-8 p-5">
              <div className="col-span-3">
                <img
                  className="h-32 w-32 object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
              </div>
              <div className="col-span-9">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Nature Image
                </Typography>
                <Rating className="my-3" />
                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    label="Comment"
                    placeholder="Hãy viết cảm nhận của bạn"
                    // value={email}
                    // onChange={onChange}
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                    //   containerProps={{ className: "min-w-[100px]" }}
                  />
                  <Button size="sm" color="blue">
                    <SubdirectoryArrowRightIcon className="w-full" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-2 my-3">
            <div className="grid grid-cols-12 gap-8 p-5">
              <div className="col-span-3">
                <img
                  className="h-32 w-32 object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
              </div>
              <div className="col-span-9">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Nature Image
                </Typography>
                <Rating className="my-3" />
                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    label="Comment"
                    placeholder="Hãy viết cảm nhận của bạn"
                    // value={email}
                    // onChange={onChange}
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                    //   containerProps={{ className: "min-w-[100px]" }}
                  />
                  <Button size="sm" color="blue">
                    <SubdirectoryArrowRightIcon className="w-full" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-2 my-3">
            <div className="grid grid-cols-12 gap-8 p-5">
              <div className="col-span-3">
                <img
                  className="h-32 w-32 object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
              </div>
              <div className="col-span-9">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Nature Image
                </Typography>
                <Rating className="my-3" />
                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    label="Comment"
                    placeholder="Hãy viết cảm nhận của bạn"
                    // value={email}
                    // onChange={onChange}
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                    //   containerProps={{ className: "min-w-[100px]" }}
                  />
                  <Button size="sm" color="blue">
                    <SubdirectoryArrowRightIcon className="w-full" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Pagination />
        </>
      ) : (
        <>
          <Card className="p-2 my-3">
            <div className="grid grid-cols-12 gap-8 p-5">
              <div className="col-span-3">
                <img
                  className="h-32 w-32 object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
              </div>
              <div className="col-span-9">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Nature Image
                </Typography>
                <Rating value={4} readOnly />
                <Typography variant="small" color="gray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  nec purus feugiat, molestie ipsum et, consequat nibh. Etiam
                  non est vel est suscipit posuere.
                </Typography>
              </div>
            </div>
          </Card>
          <Card className="p-2 my-3">
            <div className="grid grid-cols-12 gap-8 p-5">
              <div className="col-span-3">
                <img
                  className="h-32 w-32 object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
              </div>
              <div className="col-span-9">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Nature Image
                </Typography>
                <Rating value={4} readOnly />
                <Typography variant="small" color="gray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  nec purus feugiat, molestie ipsum et, consequat nibh. Etiam
                  non est vel est suscipit posuere.
                </Typography>
              </div>
            </div>
          </Card>
          <Card className="p-2 my-3">
            <div className="grid grid-cols-12 gap-8 p-5">
              <div className="col-span-3">
                <img
                  className="h-32 w-32 object-cover object-center"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
              </div>
              <div className="col-span-9">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Nature Image
                </Typography>
                <Rating value={4} readOnly />
                <Typography variant="small" color="gray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  nec purus feugiat, molestie ipsum et, consequat nibh. Etiam
                  non est vel est suscipit posuere.
                </Typography>
              </div>
            </div>
          </Card>
          <Pagination />
        </>
      )}
    </>
  );
};
export default ProductRating;
