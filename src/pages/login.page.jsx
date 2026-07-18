import { ROUTES } from "../constants/routes.constant";
import React from "react";
import { Button } from "@material-tailwind/react/components/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Icon from "../assets/login_icon.asset";
import { Container, TextField } from "@mui/material";
import { useLoginMutation } from "../apis/account.api";
import { Toast } from "../configs/sweetalert2.config";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { STORAGE_KEYS } from "../constants/storage.constant";

/** Builds login credentials from an email, phone number, or username input. */
export const buildLoginCredentials = (input, password) => {
  const emailRegExp = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
  const phoneNumberRegExp = new RegExp(/^[0-9]{10,11}$/);
  if (emailRegExp.test(input)) {
    return {
      email: input,
      password: password,
    };
  }
  if (phoneNumberRegExp.test(input)) {
    return {
      phoneNumber: input,
      password: password,
    };
  }
  return {
    username: input,
    password: password,
  };
};

/** Handles loginpage. */
function Loginpage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [input, setInput] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState({});
  /** Handles input change. */
  const handleInputChange = (e) => {
    const nextInput = e.target.value;
    setInput(nextInput);
    setData(buildLoginCredentials(nextInput, password));
  };
  /** Handles password change. */
  const handlePasswordChange = (e) => {
    const nextPassword = e.target.value;
    setPassword(nextPassword);
    setData(buildLoginCredentials(input, nextPassword));
  };
  /** Handles login. */
  const handleLogin = async () => {
    try {
      const message = await login(data).unwrap();
      Toast.fire({
        icon: "success",
        title: t("auth.login_success"),
      }).then(() => {
        localStorage.setItem(STORAGE_KEYS.AVATAR, message.object.avatar_url);
        localStorage.setItem(STORAGE_KEYS.NAME, message.object.name);
        localStorage.setItem(STORAGE_KEYS.TOKEN, message.object.token);
        navigate(message.object.url);
      });
    } catch {
      Toast.fire({
        icon: "error",
        title: t("auth.login_failed"),
      });
    }
  };
  const [login, { isLoading }] = useLoginMutation();
  return (
    <>
      <div className="auth-page grid lg:grid-cols-3 sm:grid-cols-1 lg:border-r-4">
        <Container>
          <div className="mt-10">
            <h1 className="auth-title">
              <span className="text-[#006edc]">VTI</span> Shop
            </h1>
            <Divider>
              <h3 className="text-center text-xl">{t("auth.login_title")}</h3>
            </Divider>
            <form className="max-w-sm mx-auto">
              <div className="mb-5 mt-10">
                <TextField
                  className="w-full"
                  size="lg"
                  variant="outlined"
                  label={t("auth.username_email_phone")}
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
                  label={t("auth.password")}
                  placeholder={t("auth.password")}
                  type="password"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                />
              </div>
              <div className="mb-5 text-right">
                <div className="h-5">
                  <a href="#" className="text-right">
                    {t("auth.forgot_password")}
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
                {t("common.login")}
              </Button>
            </form>
            <div className="max-w-sm mx-auto">
              <Divider className="mt-5 ">
                <Chip label={t("auth.or")} size="small" />
              </Divider>
            </div>
            <div className="max-w-sm mx-auto mt-5">
              <Button
                onClick={() => navigate(ROUTES.REGISTER)}
                color="indigo"
                className="w-full mb-5"
                loading={isLoading}
              >
                {t("common.register")}
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
                {t("auth.continue_with_google")}
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
