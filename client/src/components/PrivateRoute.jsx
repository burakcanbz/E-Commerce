import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); 
  
  const userInfoFromStorage = !!localStorage.getItem("userInfo");
  if(!userInfoFromStorage){
    dispatch(logout());
  }
  const isAuthenticated = !!userInfo && !!userInfoFromStorage;

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
};

export default PrivateRoute;
