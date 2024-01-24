import React from "react";
import { Button, Row, Col } from "antd";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const NavBar = ({ activeTab, setActiveTab }) => {
  const navigateTo = useNavigate();

  return (
    <Row>
      <Col lg={24} className="navbar">
        <Col lg={8} className="nav_logo">
          <a href="/dashboard">
            <img
              src="../../public/Logo.png"
              alt="Logo"
              style={{ height: "45px", marginRight: "20px" }}
            />
          </a>

          <p>Concept Recall</p>
        </Col>
        <Col lg={8} className="nav_option">
          <ul>
            <li>
              <a href="/dashboard/projects/all">
                <button
                  className="nav_btn"
                  onClick={() => setActiveTab("current")}
                >
                  Current Projects
                </button>
              </a>
            </li>
            <li>
              <a href="/dashboard/projects/archived">
                <button
                  className="nav_btn"
                  onClick={() => setActiveTab("archived")}
                >
                  Archived Projects
                </button>
              </a>
            </li>
            <li>
              <a href="/dashboard/projects/completed">
                <button
                  className="nav_btn"
                  onClick={() => setActiveTab("completed")}
                >
                  Completed Projects
                </button>
              </a>
            </li>
          </ul>
        </Col>
        <Col lg={8} className="logout_btn">
          <Button type="primary" danger onClick={() => navigateTo("/")}>
            Logout
          </Button>
        </Col>
      </Col>
    </Row>
  );
};
export default NavBar;
