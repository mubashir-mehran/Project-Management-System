import React from "react";
import { Row, Col, Select, Input } from "antd";
const { Option } = Select;
import NavBar from "../components/Navbar";
import CurrentProject from "../components/AllProjects";
import "../styles/Project.css";

const ProjectScreen = () => {
  return (
    <Row>
      <Row>
        <NavBar />
      </Row>
      <Row style={{ marginTop: "60px" }}>
        <CurrentProject />
      </Row>
    </Row>
  );
};

export default ProjectScreen;
