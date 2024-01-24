import React from "react";
import { Row, Col, Select, Input } from "antd";

const { Option } = Select;
import NavBar from "./components/Navbar.jsx";
import ProjectsScreen from "./components/ProjectsComponent";

const ProjectScreen = () => {
  const handleSortChange = (value) => {
    // Implement sorting logic based on the selected value (AZ, ZA, Newest, Oldest)
    // Update the filteredProjects state accordingly
    setSortOrder(value);
  };

  const handleSearch = (value) => {
    // Implement search logic based on the project name
    // Update the filteredProjects state accordingly
  };

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
