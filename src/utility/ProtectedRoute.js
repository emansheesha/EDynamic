import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckAccessToken, CheckRefreshToken } from "../api/apis";
const ProtectedRoute = (props) => {
  // check User Token to enable access to contact page
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = async () => {
    CheckAccessToken();
    const userToken = localStorage.getItem("accessToken");
    // console.log(userToken, isLoggedIn);
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
