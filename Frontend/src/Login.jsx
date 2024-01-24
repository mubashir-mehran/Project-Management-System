import React, { useState } from "react";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import store from "./redux/store";
import { userLoginAction } from "./redux/slices/authSlice";

const Login = () => {
  const { loading, error, userInfo, success } = useSelector(
    (store) => store.auth
  );
  console.log(JSON.stringify(store.getState()));
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(loginData));
    setLoginData({
      email: "",
      password: "",
    });
    console.log(loginData);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (success) navigate("/dashboard");
    // if (userInfo) {
    //   navigate("/dashboard");
    // }
  }, [navigate, success]);

  return (
    <div className="Login_section">
      <div className="login_logo">
        <img
          src="../../public/Logo.png"
          alt="Logo"
          style={{ height: "40px", marginRight: "20px" }}
        />

        <h3>Project Management System</h3>
      </div>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <label>
          Email:
          <input
            className="email_input"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <div className="login_btn">
          <button type="submit">Login</button>
        </div>
        <div className="tooltip">
          Don't have an account? <a href="/register">Create</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
