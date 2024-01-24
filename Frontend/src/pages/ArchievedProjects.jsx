import React from "react";
import { Row, Col, Select, Input } from "antd";
const { Option } = Select;
import NavBar from "../components/Navbar";
import ProjectsScreen from "../components/ProjectsComponent";

const ProjectScreen = () => {
  return (
    <Row>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <ProjectsScreen />
      </Row>
    </Row>
  );
};

export default ProjectScreen;
