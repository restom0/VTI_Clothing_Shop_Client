import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import Pagination from "../shared/Pagination";
const ProductSeen = () => {
  return (
    <>
      <Typography variant="h4" color="blue-gray" className="my-3">
        Sản phẩm đã xem
      </Typography>
      <div className="grid grid-cols-3 gap-4">
        <Card className="mt-6">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="card-image"
            />
          </CardHeader>
          <CardBody className="mx-auto">
            <Typography>Abisko Trail Stretch Trousers M</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="h5" color="blue-gray" className=" text-center">
              $155.00
            </Typography>
          </CardFooter>
        </Card>
        <Card className="mt-6">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="card-image"
            />
          </CardHeader>
          <CardBody className="mx-auto">
            <Typography>Abisko Trail Stretch Trousers M</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography
              variant="h5"
              color="blue-gray"
              className=" text-center mb-2"
            >
              $155.00
            </Typography>
          </CardFooter>
        </Card>
        <Card className="mt-6">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="card-image"
            />
          </CardHeader>
          <CardBody className="mx-auto">
            <Typography>Abisko Trail Stretch Trousers M</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography
              variant="h5"
              color="blue-gray"
              className=" text-center mb-2"
            >
              $155.00
            </Typography>
          </CardFooter>
        </Card>
        <Card className="mt-6">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="card-image"
            />
          </CardHeader>
          <CardBody className="mx-auto">
            <Typography>Abisko Trail Stretch Trousers M</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography
              variant="h5"
              color="blue-gray"
              className=" text-center mb-2"
            >
              $155.00
            </Typography>
          </CardFooter>
        </Card>
        <Card className="mt-6">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="card-image"
            />
          </CardHeader>
          <CardBody className="mx-auto">
            <Typography>Abisko Trail Stretch Trousers M</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography
              variant="h5"
              color="blue-gray"
              className=" text-center mb-2"
            >
              $155.00
            </Typography>
          </CardFooter>
        </Card>
        <Card className="mt-6">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="card-image"
            />
          </CardHeader>
          <CardBody className="mx-auto">
            <Typography>Abisko Trail Stretch Trousers M</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography
              variant="h5"
              color="blue-gray"
              className=" text-center mb-2"
            >
              $155.00
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <Pagination />
    </>
  );
};

export default ProductSeen;
