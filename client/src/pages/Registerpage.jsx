import React, { useState } from "react";
import { Button, Input, Radio, Typography } from "@material-tailwind/react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useRegisterMutation } from "../apis/AccountApi";
import ImageUpload from "../components/ImageUpload";
import CryptoJS from "crypto-js";
import axios from "axios";
import { Toast } from "../configs/SweetAlert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, resetAvatar } from "../features/slices/avatar_urlSlice";

const Registerpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const avatar_url = useSelector((state) => state.avatar_url.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleRegister = async () => {
    const message = await register({
      name: firstname + " " + lastname,
      username,
      password,
      phone_number,
      email,
      birthday,
      avatar_url,
      public_id_avatar_url: avatar_url.publicId,
      address,
      gender,
    });
    if (message.data.statusCode === 201) {
      Toast.fire({
        icon: "success",
        title: "Đăng ký thành công",
      }).then(() => {
        navigate("/login");
      });
    } else {
      Toast.fire({
        icon: "error",
        title: message.data.message,
      });
    }
  };
  return (
    <div
      className="py-10 h-full"
      style={{
        backgroundImage:
          "url('https://giaiphapzalo.com/wp-content/uploads/2021/09/pagebg-1-1920x705.jpg')",
      }}
    >
      <Container
        maxWidth="md"
        className=" bg-white rounded-xl border p-5 border-gray-300 shadow-lg"
      >
        <h1 className="text-center text-6xl mb-5">
          <span className="text-[#006edc]">VTI</span> Shop
        </h1>
        <Divider>
          <h3 className="text-center text-xl">Đăng ký</h3>
        </Divider>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 mt-5">
          <div className="w-100 mx-5 my-5">
            <div className="grid grid-cols-2">
              <Input
                size="md"
                variant="standard"
                label="Họ"
                placeholder="Nguyễn"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />

              <Input
                variant="standard"
                label="Tên"
                placeholder="A"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              />
            </div>
          </div>
          <div className="w-100 mx-5 my-5">
            <Input
              variant="standard"
              label="Tên đăng nhập"
              placeholder="nguyenvana"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="w-100 mx-5 my-5">
            <Input
              variant="standard"
              label="Email"
              placeholder="nguyenvana@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-100 my-5 mx-5">
            <Input
              variant="standard"
              label="Số điện thoại"
              placeholder="0912345678"
              onChange={(e) => setPhone_Number(e.target.value)}
              value={phone_number}
            />
          </div>
          <div className="flex flex-col">
            <div className="w-100 my-5 mx-5">
              <Input
                variant="standard"
                label="Ngày sinh"
                placeholder="01-01-1990"
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
              />
            </div>
            <div className="w-100 flex justify-start gap-4 mx-5 my-5">
              <Typography variant="small" color="blue-gray" className="my-auto">
                Giới tính:
              </Typography>
              <Radio
                size="small"
                name="gender"
                label="Nam"
                value="MALE"
                onClick={(e) => setGender(e.target.defaultValue)}
              />
              <Radio
                name="gender"
                label="Nữ"
                value="FEMALE"
                onClick={(e) => setGender(e.target.defaultValue)}
              />
            </div>
          </div>
          <div className="w-100 my-5 mx-5">
            {avatar_url === "" ? (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="avatar_url"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
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
                  </div>
                  <ImageUpload image="avatar_url" />
                </label>
              </div>
            ) : (
              <div className="flex justify-around">
                <img
                  src={avatar_url}
                  alt="avatar"
                  className="h-[150px] w-[150px] rounded-full"
                />
                <Button
                  onClick={() => dispatch(deleteAvatar())}
                  color="red"
                  className="w-1/3"
                >
                  Xóa ảnh
                </Button>
              </div>
            )}
          </div>

          <div className="w-100 my-5 mx-5">
            <Input
              variant="standard"
              label="Mật khẩu"
              placeholder=".............."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="w-100 my-5 mx-5">
            <Input
              variant="standard"
              label="Nhắc lại mật khẩu"
              placeholder=".............."
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

          <div className="w-100 my-5 mx-5">
            <Button
              disabled={
                username === "" &&
                password === "" &&
                phone_number === "" &&
                confirmPassword === "" &&
                firstname === "" &&
                lastname === "" &&
                email === "" &&
                birthday === ""
                  ? true
                  : false
              }
              onClick={() => {
                setPassword("");
                setUsername("");
                setPhone_Number("");
                setConfirmPassword("");
                setPassword("");
                dispatch(resetAvatar());
                setFirstname("");
                setLastname("");
                setEmail("");
                setBirthday("");
              }}
              color="red"
              className="w-full"
              loading={isLoading}
            >
              Hủy
            </Button>
          </div>
          <div className="w-100 my-5 mx-5">
            <Button
              disabled={
                isLoading ||
                username === "" ||
                password === "" ||
                phone_number === "" ||
                password !== confirmPassword ||
                confirmPassword === "" ||
                firstname === "" ||
                lastname === "" ||
                email === "" ||
                birthday === ""
                  ? true
                  : false
              }
              onClick={handleRegister}
              color="indigo"
              className="w-full"
              loading={isLoading}
            >
              Đăng ký
            </Button>
          </div>
        </div>
        <Divider className="mt-5 ">
          <Chip label="OR" size="small" />
        </Divider>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          <div className="w-100 my-5 mx-5">
            <Button
              onClick={() => navigate("/login")}
              color="indigo"
              className="w-full"
              loading={isLoading}
            >
              Đã có tài khoản
            </Button>
          </div>
          <div className="w-100 my-5 mx-5">
            <Button
              size="sm"
              variant="outlined"
              color="blue-gray"
              className="flex items-center justify-center gap-3 w-full"
              loading={isLoading}
            >
              <img
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
              Continue with Google
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registerpage;
