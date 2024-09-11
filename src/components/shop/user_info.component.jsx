import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  Radio,
  Typography,
  Chip,
  Switch,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
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
import React, { useEffect, useState } from "react";
import CountrySelect from "../country_select.component";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";
import {
  useGetUserProfileQuery,
  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
} from "../../apis/user.api";
import Loading from "../shared/loading.component";
import ImageUpload from "../upload_image.component";
import { handleDelete } from "../../utils/delete_image.util";
import { Toast } from "../../configs/sweetalert2.config";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("");
  const [confirmChange, setConfirmChange] = useState(false);
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [publicId, setPublicId] = useState("");
  const { countries } = useCountries();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const [isGoogleLinked, setIsGoogleLinked] = React.useState(false);
  const { data: user, isLoading, isError } = useGetUserProfileQuery();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenClick = () => {
    setOpen(true);
  };
  const [openAdd, setOpenAdd] = useState(false);
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleAddClick = () => {
    setOpenAdd(true);
  };
  const [
    updatePassword,
    { isLoading: isUpdatePassword, isError: updatePassswordError },
  ] = useUpdatePasswordMutation();

  const [
    updateProfile,
    { isLoading: isUpdateProfile, isError: updateProfileError },
  ] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (user?.object) {
      setName(user.object.name);
      setBirthday(dayjs(user.object.birthday));

      setGender(user.object.gender);
      setEmail(user.object.email);
      setPhone(user.object.phone_number);
      setAddress(user.object.address);
    }
  }, [user]);
  if (isLoading) return <Loading />;
  else if (isError) return <div>Error</div>;
  const handleConfirmChange = () => {
    setEmail(user.object.email);
    setPhone(user.object.phone_number);
    setAddress(user.object.address);
    setConfirmChange(!confirmChange);
  };
  const handleChangePassword = async () => {
    if (newPassword !== reTypePassword) {
      Toast.fire({
        icon: "error",
        title: "Mật khẩu không khớp",
      });
      return;
    }
    try {
      const response = await updatePassword({
        password,
        newPassword,
      }).unwrap();

      if (response.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: response.message || "Đổi mật khẩu thành công",
        }).then(() => {
          setPassword("");
          setNewPassword("");
          setReTypePassword("");
          handleClose();
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error?.data?.message || "An error occurred",
      });
    }
  };
  const handleChangeProfile = async () => {
    try {
      const response = await updateProfile({
        name,
        email,
        gender,
        phone_number: phone,
        address,
        birthday: dayjs(birthday).format("YYYY-MM-DD"),
        avatar_url: avatar ? avatar : user?.object.avatar_url,
        public_id_avatar_url: publicId
          ? publicId
          : user?.object.public_id_avatar_url,
      }).unwrap();
      if (response.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: response.message || "Cập nhật thông tin thành công",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error?.data?.message || "An error occurred",
      });
    }
  };
  return (
    <>
      <Card className="h-full w-full border-t-2 p-2">
        <CardContent>
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
            <div className="col-span-7 grid grid-cols-3 mt-5 gap-4">
              <Avatar
                src={avatar ? avatar : user?.object.avatar_url}
                alt="avatar"
                className="mx-auto my-auto"
                sx={{ width: 100, height: 100 }}
                onClick={handleAddClick}
              />
              <div className="col-span-2 grid grid-cols-6 my-auto gap-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="col-span-2 !my-auto"
                >
                  Họ và tên
                </Typography>
                <div className="col-span-4">
                  <TextField
                    className="w-full"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="my-auto col-span-2">
                  <Typography variant="small" color="gray">
                    Ngày sinh
                  </Typography>
                </div>
                <div className="col-span-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        className="w-full"
                        value={birthday}
                        onChange={(e) => setBirthday(e)}
                        format="DD/MM/YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="my-auto col-span-2">
                  <Typography variant="small" color="gray">
                    Giới tính
                  </Typography>
                </div>
                <div className="col-span-4">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      row
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <FormControlLabel
                        value="FEMAlE"
                        control={<Radio />}
                        label="Nữ"
                      />
                      <FormControlLabel
                        value="MALE"
                        control={<Radio />}
                        label="Nam"
                      />
                    </RadioGroup>
                  </FormControl>
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

              <div className="col-span-3 grid grid-cols-12 gap-4">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="col-span-8"
                >
                  Địa chỉ liên lạc
                </Typography>
                <div className="col-span-4 my-auto">
                  <Button
                    size="sm"
                    variant="outlined"
                    className="w-full"
                    color={confirmChange ? "error" : "primary"}
                    onClick={handleConfirmChange}
                  >
                    {confirmChange === false ? "Thay đổi" : "Hủy"}
                  </Button>
                </div>
                <Typography
                  variant="small"
                  className="col-span-4 !my-auto !mx-auto"
                >
                  <MailOutlineIcon />
                </Typography>
                <div className="col-span-8">
                  <TextField
                    className="w-full"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={email}
                    disabled={confirmChange === false}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Typography
                  variant="small"
                  className="col-span-4 !my-auto !mx-auto"
                >
                  <LocalPhoneOutlinedIcon />
                </Typography>
                <div className="col-span-8">
                  <TextField
                    className="w-full"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={phone}
                    disabled={confirmChange === false}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Typography
                  variant="small"
                  className="col-span-4 !my-auto !mx-auto"
                >
                  <FmdGoodOutlinedIcon />
                </Typography>
                <div className="col-span-8">
                  <TextField
                    className="w-full"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={address}
                    disabled={!confirmChange}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mx-auto col-span-12">
                  <Button
                    className="mx-auto"
                    size="large"
                    onClick={handleChangeProfile}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button className="mx-auto" color="error" size="large">
                    Hủy
                  </Button>
                </div>
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
                    <Button className="w-full" variant="outlined">
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
                    <Button className="w-full" variant="outlined">
                      Liên kết
                    </Button>
                  )}
                </div>
                <div className="col-span-2">
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
                      <Switch size={"lg"} />
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
                    <div
                      className="col-span-4 my-auto"
                      onClick={handleOpenClick}
                    >
                      <Button
                        color="error"
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
                        color="error"
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog onClose={handleCloseAdd} open={openAdd}>
        <DialogTitle>Chỉnh sửa hình ảnh</DialogTitle>
        <DialogContent>
          {avatar ? (
            <>
              <Avatar
                src={avatar}
                alt="avatar"
                className="mx-auto my-auto"
                sx={{ width: 200, height: 200 }}
                onClick={handleAddClick}
              />
              <Button
                variant="contained"
                className="w-full !mt-4"
                color="error"
                onClick={() => {
                  handleDelete({ publicId }), setAvatar(null);
                }}
              >
                Xóa ảnh
              </Button>
            </>
          ) : (
            <figure className="my-auto mx-auto h-full w-full">
              <div className="flex items-center  justify-center h-full w-full my-auto">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center h-full w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                    <Typography
                      as="caption"
                      variant="small"
                      className="mt-2 text-center font-normal"
                    >
                      Hình đại diện
                    </Typography>
                  </div>
                  <ImageUpload
                    setPublicId={setPublicId}
                    setAvatar={setAvatar}
                  />
                </label>
              </div>
            </figure>
          )}
        </DialogContent>
      </Dialog>
      <Dialog maxWidth="xl" onClose={handleClose} open={open}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <TextField
              type="password"
              id="standard-basic1"
              label="Mật khẩu"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="password"
              id="standard-basic2"
              label="Mật khẩu mới"
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              type="password"
              id="standard-basic3"
              label="Nhập lại mật khẩu mới"
              variant="standard"
              value={reTypePassword}
              onChange={(e) => setReTypePassword(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleChangePassword}
            disable={
              password === "" ||
              newPassword === "" ||
              reTypePassword === "" ||
              isUpdatePassword
            }
            loading={isUpdatePassword}
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserInfo;
