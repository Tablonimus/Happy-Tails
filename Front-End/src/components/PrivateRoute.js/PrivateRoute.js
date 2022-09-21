import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {

  const tokenn = localStorage.getItem("token");

  const id = localStorage.getItem("id")

  let auth = { token: tokenn ? true : false };

  let idd = { id: id ? true : false };

  
  const patternId = /^[0-9a-fA-F]{24}$/.test(id)

  const pattern = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gi.test(tokenn)

  return auth.token && pattern && idd.id && patternId ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
