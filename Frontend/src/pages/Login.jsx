import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import store from "../redux/store";
import { userLoginAction } from "../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(userLoginAction(loginData));
      toast.success("Login successful");
      setLoginData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error("Wrong credentials. Try again");
      console.error(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (success) navigate("/dashboard");
    }, 1000);
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
      <ToastContainer />
    </div>
  );
};

export default Login;
