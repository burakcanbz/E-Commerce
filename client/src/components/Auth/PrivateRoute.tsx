import { JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import { RootState } from "../../types/redux";
import { logout } from "../../slices/authSlice";
import { AppDispatch } from "../../store/store";

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