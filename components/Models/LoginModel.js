import Model from './Model';
import Link from 'next/link';
import { useEffect } from 'react';

const LoginModel = ({ closeModel }) => {

  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && closeModel();
    document.addEventListener("keyup", closeOnEscape);
    return () => document.removeEventListener("keyup", closeOnEscape);
  }, []);

    return (
      <Model
        className="rounded-sm"
        showHeader
        closeModel={closeModel}
        title="Log in to Facebook"
        backdropClass="bg-black opacity-40"
      >
        <form className="p-3">
          <input
            type="text"
            className="w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition"
            name="email_or_phone"
            placeholder="Email address or phone number"
          />
          <input
            type="password"
            name="password"
            className="w-full p-2 my-2 bg-transparent border rounded focus:border-blue-500 focus:outline-none transition"
            placeholder="Password"
            autoComplete="current password"  
          />
          <div className="flex items-center gap-x-2 my-2">
            <input
              type="checkbox"
              name="remember_password"
              id="remember_password"
              className="h-5 w-5 "
            />
            <label htmlFor="remember_password">Remember password</label>
          </div>
          <button className="p-2 w-full text-white rounded bg-blue-500 text-center font-semibold my-2 focus:outline-none transition focus:ring">
            Log In
          </button>
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
