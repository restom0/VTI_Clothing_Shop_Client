import {
  Avatar,
  Button,
  Card,
  CardContent,
  Radio,
  Typography,
  Chip,
  Switch,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon } from "developer-icons";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  useGetUserProfileQuery,
  useUpdatePasswordMutation,
  useUpdateUserProfileMutation,
} from "../../apis/user.api";
import Loading from "../shared/loading.component";
import ImageUpload from "../upload_image.component";
import { handleDelete } from "../../utils/delete_image.util";
import { Toast } from "../../configs/sweetalert2.config";
import { useI18n } from "../../i18n";

/** Handles user info. */
const UserInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("");
  const [confirmChange, setConfirmChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [publicId, setPublicId] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const isGoogleLinked = false;
  const { t } = useI18n();
  const { data: user, isLoading, isError } = useGetUserProfileQuery();
  /** Handles close. */
  const handleClose = () => {
    setOpen(false);
  };

  /** Handles open click. */
  const handleOpenClick = () => {
    setOpen(true);
  };
  const [openAdd, setOpenAdd] = useState(false);
  /** Handles close add. */
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  /** Handles add click. */
  const handleAddClick = () => {
    setOpenAdd(true);
  };
  const [updatePassword, { isLoading: isUpdatePassword }] = useUpdatePasswordMutation();

  const [updateProfile] = useUpdateUserProfileMutation();

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
  else if (isError) return <div>{t("profile.load_failed")}</div>;
  /** Handles confirm change. */
  const handleConfirmChange = () => {
    setEmail(user.object.email);
    setPhone(user.object.phone_number);
    setAddress(user.object.address);
    setConfirmChange(!confirmChange);
  };
  /** Handles change password. */
  const handleChangePassword = async () => {
    if (newPassword !== reTypePassword) {
      Toast.fire({
        icon: "error",
        title: t("profile.password_mismatch"),
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
          title: response.message || t("profile.password_update_success"),
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
        title: error?.data?.message || t("profile.generic_error"),
      });
    }
  };
  /** Handles change profile. */
  const handleChangeProfile = async () => {
    try {
      const response = await updateProfile({
        name,
        email,
        gender,
        phone_number: phone,
        address,
        birthday: dayjs(birthday).format("YYYY-MM-DD"),
        avatar_url: avatar || user?.object.avatar_url,
        public_id_avatar_url: publicId || user?.object.public_id_avatar_url,
      }).unwrap();
      if (response.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: response.message || t("profile.update_success"),
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error?.data?.message || t("profile.generic_error"),
      });
    }
  };
  return (
    <>
      <Card className="h-full w-full border-t-2 p-2">
        <CardContent>
          <div className="grid grid-cols-12 gap-8">
            <Typography variant="h5" color="blue-gray" className="mb-2 col-span-7">
              {t("profile.personal_info")}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2 col-span-5">
              {t("profile.connections")}
            </Typography>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7 grid grid-cols-3 mt-5 gap-4">
              <Avatar
                src={avatar || user?.object.avatar_url}
                alt={t("profile.avatar")}
                className="mx-auto my-auto"
                sx={{ width: 100, height: 100 }}
                onClick={handleAddClick}
              />
              <div className="col-span-2 grid grid-cols-6 my-auto gap-4">
                <Typography variant="small" color="gray" className="col-span-2 !my-auto">
                  {t("profile.full_name")}
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
                    {t("profile.birthday")}
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
                    {t("profile.gender")}
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
                        label={t("auth.gender_female")}
                      />
                      <FormControlLabel
                        value="MALE"
                        control={<Radio />}
                        label={t("auth.gender_male")}
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
                <Typography variant="h5" color="blue-gray" className="col-span-8">
                  {t("profile.contact_address")}
                </Typography>
                <div className="col-span-4 my-auto">
                  <Button
                    size="sm"
                    variant="outlined"
                    className="w-full"
                    color={confirmChange ? "error" : "primary"}
                    onClick={handleConfirmChange}
                  >
                    {confirmChange === false ? t("profile.change") : t("profile.cancel")}
                  </Button>
                </div>
                <Typography variant="small" className="col-span-4 !my-auto !mx-auto">
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
                <Typography variant="small" className="col-span-4 !my-auto !mx-auto">
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
                <Typography variant="small" className="col-span-4 !my-auto !mx-auto">
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
                  <Button className="mx-auto" size="large" onClick={handleChangeProfile}>
                    {t("profile.save_changes")}
                  </Button>
                  <Button className="mx-auto" color="error" size="large">
                    {t("profile.cancel")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-2 gap-8 my-auto mt-5">
                <Typography variant="large" className="my-auto flex items-center gap-2">
                  <GoogleIcon size={20} />
                  Google
                </Typography>
                <div>
                  {isGoogleLinked ? (
                    <Chip color="green" value={t("profile.linked")} />
                  ) : (
                    <Button className="w-full" variant="outlined">
                      {t("profile.link")}
                    </Button>
                  )}
                </div>
                <Typography variant="large" className="my-auto flex items-center gap-2">
                  <FacebookIcon size={20} />
                  Facebook
                </Typography>
                <div>
                  {isGoogleLinked ? (
                    <Chip color="green" value={t("profile.linked")} />
                  ) : (
                    <Button className="w-full" variant="outlined">
                      {t("profile.link")}
                    </Button>
                  )}
                </div>
                <div className="col-span-2">
                  <Typography variant="h5" color="blue-gray" className="mb-2 col-span-5">
                    {t("profile.security")}
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
                          {t("profile.two_factor")}
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
                          {t("profile.change_password")}
                        </Typography>
                      </div>
                    </div>
                    <div className="col-span-4 my-auto">
                      <Button
                        color="error"
                        size="sm"
                        variant="outlined"
                        className="w-full"
                        onClick={handleOpenClick}
                      >
                        {t("profile.change")}
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
                          {t("profile.delete_account")}
                        </Typography>
                      </div>
                    </div>
                    <div className="col-span-4 my-auto">
                      <Button color="error" size="sm" variant="outlined" className="w-full">
                        {t("profile.delete")}
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
        <DialogTitle>{t("profile.edit_image")}</DialogTitle>
        <DialogContent>
          {avatar ? (
            <>
              <Avatar
                src={avatar}
                alt={t("profile.avatar")}
                className="mx-auto my-auto"
                sx={{ width: 200, height: 200 }}
                onClick={handleAddClick}
              />
              <Button
                variant="contained"
                className="w-full !mt-4"
                color="error"
                onClick={() => {
                  handleDelete({ publicId });
                  setAvatar(null);
                }}
              >
                {t("profile.delete_image")}
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
                      <span className="font-semibold">{t("auth.click_to_upload")}</span>{" "}
                      {t("auth.drag_drop")}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("auth.upload_formats")}
                    </p>
                    <Typography
                      as="caption"
                      variant="small"
                      className="mt-2 text-center font-normal"
                    >
                      {t("profile.avatar")}
                    </Typography>
                  </div>
                  <ImageUpload setPublicId={setPublicId} setAvatar={setAvatar} />
                </label>
              </div>
            </figure>
          )}
        </DialogContent>
      </Dialog>
      <Dialog maxWidth="xl" onClose={handleClose} open={open}>
        <DialogTitle>{t("profile.change_password")}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <TextField
              type="password"
              id="standard-basic1"
              label={t("auth.password")}
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="password"
              id="standard-basic2"
              label={t("profile.new_password")}
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              type="password"
              id="standard-basic3"
              label={t("profile.retype_new_password")}
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
              password === "" || newPassword === "" || reTypePassword === "" || isUpdatePassword
            }
            loading={isUpdatePassword}
            color="primary"
          >
            {t("profile.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserInfo;
