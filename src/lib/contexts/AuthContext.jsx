import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearUserStore } from "../../store/reducers/userReducer";

const AuthContext = createContext({
  throwAuthError: () => {},
});

const AuthProvider = () => {
  const [authenticationError, setAuthenticationError] = useState(false);
  const dispatch = useDispatch();

  const throwAuthError = () => {
    setAuthenticationError(true);
  };
  useEffect(() => {
    if (authenticationError) {
      window.alert("expired");
      dispatch(clearUserStore());
    }
  }, [authenticationError]);
  return (
    <AuthContext.Provider value={{ throwAuthError }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
