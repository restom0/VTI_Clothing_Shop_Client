import React from "react";
import { Button, Input } from "@material-tailwind/react";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Icon from "../assets/Icon";
import { Container } from "@mui/material";

function Loginpage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async (email, password) => {
    // try {
    //   const data = {
    //     phoneNumber: email,
    //     password: password,
    //   };
    //   const result = await axios.post("http://localhost:8099/auth/login", data);
    //   if (result.status === 200) {
    //     Toast.fire({
    //       icon: "success",
    //       title: "Login successfully",
    //     }).then(() => {
    //       localStorage.setItem("user", email);
    //       localStorage.setItem("id", result.data.user_id);
    //       localStorage.setItem("token", result.data.token);
    //       window.location.href = "/Dashboard";
    //     });
    //   }
    // } catch (error) {
    //   if (error.response.data.phoneNumber) {
    //     Toast.fire({
    //       icon: "error",
    //       title: error.response.data.phoneNumber,
    //     });
    //   } else if (error.response.data.password) {
    //     Toast.fire({
    //       icon: "error",
    //       title: error.response.data.password,
    //     });
    //   }
    // }
  };
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
              <div className="mb-5 mt-20">
                <Input
                  size="lg"
                  variant="outlined"
                  label="Email hoặc số điện thoại"
                  placeholder="nguyenvana@gmail.com"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-5">
                <Input
                  size="lg"
                  variant="outlined"
                  label="Mật khẩu"
                  placeholder="Mật khẩu"
                  type="password"
                  onChange={handlePasswordChange}
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
                className="w-full mb-5"
                onClick={() => login(email, password)}
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
                onClick={() => {
                  window.location.href = "/register";
                }}
                color="indigo"
                className="w-full mb-5"
              >
                Đăng ký
              </Button>
              <Button
                size="sm"
                variant="outlined"
                color="blue-gray"
                className="flex items-center justify-center gap-3 w-full"
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
