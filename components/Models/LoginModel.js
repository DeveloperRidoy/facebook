import Model from './Model';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import catchAsync from '../../utils/client/functions/catchAsync';
import { useGlobalContext } from '../../context/GlobalContext';
import Button from '../Buttons/Button';

const LoginModel = ({ closeModel }) => {
  const [state, setState] = useGlobalContext();
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && closeModel();
    document.addEventListener("keyup", closeOnEscape);
    return () => document.removeEventListener("keyup", closeOnEscape);
  }, []);

  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: null,
    rememberPassword: false,
  });

  const inputChange = (e) =>
    setLoginData({
      ...loginData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const login = (e) => catchAsync(async () => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', { redirect: false, ...loginData });
    if (res.status === 200) {
      setState({
        ...state,
        user: res.data.data?.user,
        alert: { show: true, text: "Logged in", type: 'success' },
      });
      return;
    }
    setState({...state, alert: { show: true, text: 'Invalid credentials', type: 'danger'}})
  }, setState, () => setLoading(false));
 
    return (
      <Model
        className="rounded-sm dark:bg-white dark:text-black"
        showHeader
        closeModel={closeModel}
        title="Log in to Facebook"
        backdropClass="bg-black opacity-40"
      >   
        <form className="p-3" onSubmit={login}>
          <input
            type="text"
            className="w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition"
            name="emailOrPhone"
            placeholder="Email address or phone number"
            value={loginData.emailOrPhone}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition"
            placeholder="Password"
            autoComplete="current password"
            onChange={inputChange}
          />
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
          <Link href="/forgot-password">
            <a href="/forgot-password" className="text-blue-500">
              Forgotten password
            </a>
          </Link>
        </div>
      </Model>
    );
}

export default LoginModel
