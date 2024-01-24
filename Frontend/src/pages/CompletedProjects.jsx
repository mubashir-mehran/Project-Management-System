import React from "react";
import { Row } from "antd";
import NavBar from "../components/Navbar.jsx";
import ProjectsScreen from "../components/ProjectsComponent.jsx";

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
