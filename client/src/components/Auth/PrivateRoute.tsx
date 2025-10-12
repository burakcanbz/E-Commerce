import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import { logout } from "../../slices/authSlice";

import type { JSX } from "react";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../types/redux";

const PrivateRoute = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth); 
  
  const userInfoFromStorage: boolean = !!localStorage.getItem("userInfo");
  if(!userInfoFromStorage){
    dispatch(logout());
  }
  const isAuthenticated = !!userInfo && !!userInfoFromStorage;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
};

export default PrivateRoute;