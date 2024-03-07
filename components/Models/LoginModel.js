import Model from "./Model";
import Link from "next/link";
import { createRef, useEffect, useState } from "react";
import catchAsync from "../../utils/client/catchAsync";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Buttons/Button";
import axios from "axios";
import { FaEye } from "react-icons/fa";

const LoginModel = ({
  closeModel,
  backdropClass,
  quickLogin,
  children,
  email,
}) => {
  const [state, setState] = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const passWordRef = createRef();

  useEffect(() => {
    passWordRef?.current?.focus();
    const closeOnEscape = (e) => e.key === "Escape" && closeModel();
    document.addEventListener("keyup", closeOnEscape);
    return () => document.removeEventListener("keyup", closeOnEscape);
  }, []);

  const [loginData, setLoginData] = useState({
    email: email || "",
    password: "",
    rememberPassword: false,
  });

  const inputChange = (e) =>
    setLoginData({
      ...loginData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const login = (e) =>
    catchAsync(
      async () => {
        e.preventDefault();
        setLoading(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API || "api"}/users/auth/login`,
          loginData,
          { withCredentials: true }
        );
        setState({
          ...state,
          user: res.data.data?.user,
          quickLogins: res.data.data?.quickLogins,
          alert: { show: true, text: res.data.message, type: "success" },
        });
      },
      setState,
      () => setLoading(false)
    );

  return (
    <Model
      className="rounded-sm dark:bg-white dark:text-black sm:min-w-[350px] max-w-[400px]"
      closeBtnClass="dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 "
      showHeader={!quickLogin}
      closeModel={closeModel}
      title={"Log in to Facebook"}
      backdropClass={backdropClass}
    >
      {children}
      <form className="p-3" onSubmit={login}>
        {!quickLogin && (
          <input
            type="text"
            className={`w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition`}
            name="email"
            placeholder="Email address or phone number"
            value={loginData.email}
            onChange={inputChange}
            required
          />
        )}
        <div className="relative">
          <input
            ref={passWordRef}
            type="password"
            name="password"
            className="w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition pr-7"
            placeholder="Password"
            autoComplete="current password"
            onChange={inputChange}
            required
          />
          <FaEye
            className="absolute top-5 right-2 cursor-pointer"
            onClick={() => {
              const type = passWordRef.current.type;
              if (type === "password") {
                passWordRef.current.type = "text";
              } else {
                passWordRef.current.type = "password";
              }
            }}
          />
        </div>

        <div className="flex items-center gap-x-2 my-2">
          <input
            type="checkbox"
            name="rememberPassword"
            id="remember_password"
            className="h-5 w-5 "
            onChange={inputChange}
          />
          <label htmlFor="remember_password">Remember password</label>
        </div>
        <Button
          type="submit"
          className="p-2 w-full text-white rounded bg-blue-500 text-center font-semibold my-2 focus:outline-none transition focus:ring"
          loading={loading}
        >
          Log In
        </Button>
      </form>
      <div className="text-center pb-5">
        <Link legacyBehavior href="/forgot-password">
          <a href="/forgot-password" className="text-blue-500">
            Forgotten password
          </a>
        </Link>
      </div>
    </Model>
  );
};

export default LoginModel;
