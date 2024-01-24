import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { loading, userInfo, error, success } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(registerUserAction(formData));

      toast.success("Account Created successfully");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (formData.password !== formData.confirmPassword) {
        toast.error("Password mismatch");
      }
    } catch (error) {
      toast.error("Error creating account. Please try again.");
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (success) navigate("/");
  // }, [navigate, success]);

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
      <form className="login-form" onSubmit={handleSubmit}>
        <label style={{ fontSize: "15px" }}>
          UserName:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label style={{ fontSize: "17px" }}>
          Email:
          <input
            className="email_input"
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label style={{ fontSize: "17px" }}>
          Confirm :
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="login_btn">
          <button type="submit">Sign Up</button>
        </div>
        <div className="tooltip">
          Already have an account? <a href="/">Signin</a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
