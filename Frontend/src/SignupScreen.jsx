import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "./redux/slices/authSlice";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAction(formData));
    console.log(formData);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    if (formData.password !== formData.confirmPassword) {
      alert("Password mismatch");
      // dispatch(registerUserAction(data));
    }
    formData.email = formData.email.toLowerCase();
  };

  useEffect(() => {
    if (success) navigate("/");
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
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
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
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
