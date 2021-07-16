import React, { useEffect } from "react";
import axios from "../axios";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(false);

  useEffect(() => {
    (async function checkToken() {
      const resp = await axios.get("/admin/user/check");

      if (resp.data === true) {
        makeAuthenticated(true);
      }
    })();
  }, []);

  async function authenticate({ username, password }, cb) {
    const data = {
      email: username,
      password,
    };

    const resp = await axios.post("/admin/login", data);
    if (resp.status === 200 || resp.status === 201) {
      const { acess_token } = resp.data;
      makeAuthenticated(true);
      localStorage.setItem("token", `${acess_token}`);
    } else {
      makeAuthenticated(false);
    }
  }

  function signout(cb) {
    makeAuthenticated(false);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
