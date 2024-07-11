import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Radio,
  Select,
  Typography,
  Option,
  Chip,
  Switch,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useCountries } from "use-react-countries";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import React from "react";

const UserInfo = () => {
  const [date, setDate] = React.useState(new Date());
  const { countries } = useCountries();
  const [isGoogleLinked, setIsGoogleLinked] = React.useState(false);
  return (
    <>
      <Card className="mt-7 h-full w-full border-t-2">
        <CardBody>
          <div className="grid grid-cols-12 gap-8">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 col-span-7"
            >
              Thông tin cá nhân
            </Typography>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 col-span-5"
            >
              Liên kết
            </Typography>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7 grid grid-cols-3 mt-5">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="xxl"
              />
              <div className="col-span-2 grid grid-cols-6 my-auto gap-4">
                <Typography variant="h6" className="col-span-2 my-auto">
                  Họ và tên
                </Typography>
                <div className="col-span-4 ">
                  <Input
                    value={"Rạng Thái"}
                    type="text"
                    placeholder="Name"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                    // containerProps={{ className: "min-w-[100px]" }}
                  />
                </div>
                <Typography variant="h6" className="col-span-2 my-auto">
                  Tài khoản
                </Typography>
                <div className="col-span-4">
                  <Input
                    value={"restom0"}
                    type="text"
                    placeholder="Name"
                    className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                    // containerProps={{ className: "min-w-[100px]" }}
                  />
                </div>
                {/* <div className="flex items-center">
                  <Typography variant="h6" className="my-auto">
                    Tài khoản
                  </Typography>
                  <Input
                    value={"restom0"}
                    type="text"
                    placeholder="Username"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                    // containerProps={{ className: "min-w-[100px]" }}
                  />
                </div> */}
              </div>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-2 gap-8 my-auto mt-5">
                <Typography variant="large" className="my-auto">
                  <GoogleIcon className="me-2" />
                  Google
                </Typography>
                <div>
                  {isGoogleLinked ? (
                    <Chip color="green" value="Đã liên kết" />
                  ) : (
                    <Button className="w-full" variant="outlined" color="blue">
                      Liên kết
                    </Button>
                  )}
                </div>
                <Typography variant="large" className="my-auto">
                  <FacebookIcon className="me-2" />
                  Facebook
                </Typography>
                <div>
                  {isGoogleLinked ? (
                    <Chip color="green" value="Đã liên kết" />
                  ) : (
                    <Button className="w-full" variant="outlined" color="blue">
                      Liên kết
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="grid grid-cols-12 gap-8">
            <div className="grid grid-cols-3 col-span-7 gap-4 mt-5">
              <div className="mt-2 mx-auto">
                <Typography variant="h6" className="my-auto">
                  Ngày sinh
                </Typography>
              </div>
              <div className="col-span-2">
                <Popover placement="bottom">
                  <PopoverHandler>
                    <Input
                      label="Select a Date"
                      onChange={() => null}
                      value={date ? format(date, "PPP") : ""}
                    />
                  </PopoverHandler>
                  <PopoverContent>
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      showOutsideDays
                      className="border-0"
                      classNames={{
                        caption:
                          "flex justify-center py-2 mb-4 relative items-center",
                        caption_label: "text-sm font-medium text-gray-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                        nav_button_previous: "absolute left-1.5",
                        nav_button_next: "absolute right-1.5",
                        table: "w-full border-collapse",
                        head_row: "flex font-medium text-gray-900",
                        head_cell: "m-0.5 w-9 font-normal text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal",
                        day_range_end: "day-range-end",
                        day_selected:
                          "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                        day_today: "rounded-md bg-gray-200 text-gray-900",
                        day_outside:
                          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                        day_disabled: "text-gray-500 opacity-50",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-2 mx-auto">
                <Typography variant="h6" className="my-auto">
                  Giới tính
                </Typography>
              </div>
              <div className="col-span-2">
                <Radio name="type" label="Nam" defaultChecked />
                <Radio name="type" label="Nữ" />
              </div>
              <div className="mt-2 mx-auto">
                <Typography variant="h6" className="my-auto">
                  Quốc tịch
                </Typography>
              </div>
              <div className="col-span-2">
                <Select
                  size="lg"
                  label="Select Country"
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      disabled: true,
                      className:
                        "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                    })
                  }
                >
                  {countries.map(({ name, flags }) => (
                    <Option
                      key={name}
                      value={name}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      {name}
                    </Option>
                  ))}
                </Select>
                <div className="mt-10 mx-auto">
                  <Button className="mx-auto" color="blue">
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-5 mt-6">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 col-span-5"
              >
                Địa chỉ liên lạc
              </Typography>
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-8 flex items-center gap-4 my-auto">
                  <MailOutlineIcon />
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal w-[160px] break-words"
                    >
                      nguyenvana@gmail.com
                    </Typography>
                  </div>
                </div>
                <div className="col-span-4 my-auto">
                  <Button
                    color="blue"
                    size="sm"
                    variant="outlined"
                    className="w-full"
                  >
                    Thay đổi
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-8 flex items-center gap-4 my-auto">
                  <LocalPhoneOutlinedIcon />
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal w-[160px] break-words"
                    >
                      0912345678
                    </Typography>
                  </div>
                </div>
                <div className="col-span-4 my-auto">
                  <Button
                    color="blue"
                    size="sm"
                    variant="outlined"
                    className="w-full"
                  >
                    Thay đổi
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-8 flex items-center gap-4 my-auto">
                  <FmdGoodOutlinedIcon />
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal w-[160px] break-words"
                    >
                      1 đường số 1, phường 1, quận 1, TP.HCM
                    </Typography>
                  </div>
                </div>
                <div className="col-span-4 my-auto">
                  <Button
                    color="blue"
                    size="sm"
                    variant="outlined"
                    className="w-full"
                  >
                    Thay đổi
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="grid grid-cols-3 col-span-7 gap-4 mt-5"></div>
            <div className="col-span-5 mt-6">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 col-span-5"
              >
                Bảo mật
              </Typography>
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-8 flex items-center gap-4 my-auto">
                  <SecurityOutlinedIcon />
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal w-[160px] break-words"
                    >
                      Bảo mật 2 lớp
                    </Typography>
                  </div>
                </div>
                <div className="col-span-4 my-auto mx-auto">
                  <Switch color="blue" size={"lg"} />
                </div>
              </div>
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-8 flex items-center gap-4 my-auto">
                  <KeyOutlinedIcon />
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal w-[160px] break-words"
                    >
                      Đổi mật khẩu
                    </Typography>
                  </div>
                </div>
                <div className="col-span-4 my-auto">
                  <Button
                    color="red"
                    size="sm"
                    variant="outlined"
                    className="w-full"
                  >
                    Thay đổi
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-8 flex items-center gap-4 my-auto">
                  <HighlightOffOutlinedIcon />
                  <div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal w-[160px] break-words"
                    >
                      Xóa tài khoản
                    </Typography>
                  </div>
                </div>
                <div className="col-span-4 my-auto">
                  <Button
                    color="red"
                    size="sm"
                    variant="outlined"
                    className="w-full"
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserInfo;
