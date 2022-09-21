import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {

  const user = useSelector((state) => state.userProfile);

  if (user.isAdmin === true) {
    return <Outlet />
  }
  if (user.isAdmin === false) {
    return <Navigate to="/"/>
  }
};

export default PrivateRoutes;
