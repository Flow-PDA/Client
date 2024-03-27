import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { AuthProvider } from "../lib/contexts/AuthContext";

export const ProtectedLayout = () => {
  const auth = useSelector((state) => state.user.userInfo?.accessToken);
  const location = useLocation();

  const authRequired = useCallback(() => {
    const allowList = ["/", "/signup", "/login"];
    const res = location.pathname in allowList;
    return !allowList.includes(location.pathname);
  }, [location]);

  const checkAuth = useCallback((auth) => {
    if (!auth) return false;
    return auth !== "";
  }, []);

  if (authRequired()) {
    return checkAuth(auth) ? (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ) : (
      <Navigate to="/" />
    );
  } else {
    return checkAuth(auth) ? (
      <Navigate to="/party" />
    ) : (
      <>
        <Outlet />
      </>
    );
  }
};
