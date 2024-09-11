import React from "react";
import { Button, Input } from "@material-tailwind/react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Icon from "../assets/login_icon.asset";
import { Container, TextField } from "@mui/material";
import { accountApi, useLoginMutation } from "../apis/account.api";
import { Toast } from "../configs/sweetalert2.config";
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const navigate = useNavigate();
  const [input, setInput] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState({});
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (password !== "") {
      handleSetData(e.target.value, password);
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (input !== "") {
      handleSetData(input, e.target.value);
    }
  };
  const handleSetData = (input, password) => {
    const emailRegExp = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    const phoneNumberRegExp = new RegExp(/^[0-9]{10,11}$/);
    if (emailRegExp.test(input)) {
      setData({
        email: input,
        password: password,
      });
    } else if (phoneNumberRegExp.test(input)) {
      setData({
        phoneNumber: input,
        password: password,
      });
    } else {
      setData({
        username: input,
        password: password,
      });
    }
  };
  const handleLogin = async () => {
    try {
      const message = await login(data).unwrap();
      Toast.fire({
        icon: "success",
        title: "Đăng nhập thành công",
      }).then(() => {
        localStorage.setItem("avatar", message.object.avatar_url);
        localStorage.setItem("name", message.object.name);
        localStorage.setItem("token", message.object.token);
        navigate(message.object.url);
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
      });
    }
  };
  const [login, { isLoading, error }] = useLoginMutation();
  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:border-r-4">
        <Container>
          <div className="mt-10">
            <h1 className="text-center text-6xl mb-5">
              <span className="text-[#006edc]">VTI</span> Shop
            </h1>
            <Divider>
              <h3 className="text-center text-xl">Đăng nhập</h3>
            </Divider>
            <form className="max-w-sm mx-auto">
              <div className="mb-5 mt-10">
                <TextField
                  className="w-full"
                  size="lg"
                  variant="outlined"
                  label="Tên đăng nhập, email hoặc số điện thoại"
                  placeholder="nguyenvana@gmail.com"
                  autoComplete="off"
                  required
                  onChange={handleInputChange}
                  value={input}
                />
              </div>
              <div className="mb-5">
                <TextField
                  size="lg"
                  className="w-full"
                  variant="outlined"
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  type="password"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                />
              </div>
              <div className="mb-5 text-right">
                <div className="h-5">
                  <a href="#" className="text-right">
                    Quên mật khẩu
                  </a>
                </div>
              </div>
              <Button
                color="indigo"
                className="w-full mb-5 mx-auto"
                disabled={input === "" || password === ""}
                loading={isLoading}
                onClick={() => {
                  handleLogin();
                }}
              >
                Đăng nhập
              </Button>
            </form>
            <div className="max-w-sm mx-auto">
              <Divider className="mt-5 ">
                <Chip label="OR" size="small" />
              </Divider>
            </div>
            <div className="max-w-sm mx-auto mt-5">
              <Button
                onClick={() => navigate("/register")}
                color="indigo"
                className="w-full mb-5"
                loading={isLoading}
              >
                Đăng ký
              </Button>
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
        <div className="bg-gray-100 col-span-2 lg:block hidden">
          <div className="mx-auto" style={{ height: "700px", width: "700px" }}>
            <Icon />
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
