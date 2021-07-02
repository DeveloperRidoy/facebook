
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import authenticate from "../utils/functions/authenticate";


const Context = createContext();
export const useAuthContext = () => useContext(Context);


const AuthContext = ({ children }) => {
  const Router = useRouter();
  const [state, setState] = useState({ user: null, loading: true });

  useEffect(async () => {
    // authenticate user
    authenticate(setState);
  }, []);

  // redirect to login-or-signup page if not logged in
  useEffect(() => {
    if (!state.loading && !state.user && Router.route !== "/login-or-signup") {
      Router.replace("/login-or-signup");
    }
    if (!state.loading && state.user && Router.route === "/login-or-signup")
      Router.replace("/");
  }, [state, Router.route]);

  return (
    <Context.Provider value={[state, setState]}>
      {children}
    </Context.Provider>
  );
}

export default AuthContext


