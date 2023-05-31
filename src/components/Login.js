import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CheckAccessToken, CheckRefreshToken } from "../api/apis";
const LOGIN_URL = "/api/login/";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef(null);
  const errRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  // handle login function
  const handleSubmit = async (e) => {
    // prevent reload of the page
    e.preventDefault();
    // console.log(email, password);
    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      // console.log(response?.data);
      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;
      // save data of login in the localStorage to be able to get it later
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setAuth({
        email,
        password,
        accessToken: jwt_decode(accessToken),
        refreshToken: jwt_decode(refreshToken),
      });
      // console.log(accessToken, refreshToken);
      setEmail("");
      setPassword("");
      // if login success navigate to contact page
      navigate("/contact");
      setSuccess(true);
    } catch (err) {
      // if login failed navigate to contact page
      // hanle error of login with message
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
        </section>
      ) : (
        <section
          style={{
            backgroundColor: "transparent",
            borderRadius: "0.5rem",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              type="primary"
              style={{ height: "44px", borderRadius: "0.5rem" }}
              className="py-0"
            >
              Sign In
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
