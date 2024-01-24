import React from "react";
import { Row, Col, Select, Input } from "antd";
const { Option } = Select;
import NavBar from "./components/Navbar";
import CurrentProject from "./components/AllProjects";
import "./styles/Project.css";

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
      <Row style={{ marginTop: "60px" }}>
        {/* <Row gutter={[16, 16]}>
          <Col span={12}>
            <Select defaultValue="Newest" onChange={handleSortChange}>
              <Option value="AZ">A-Z</Option>
              <Option value="ZA">Z-A</Option>
              <Option value="Newest">Newest</Option>
              <Option value="Oldest">Oldest</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Input.Search
              placeholder="Search by Name"
              onSearch={handleSearch}
            />
          </Col>
        </Row> */}
        <CurrentProject />
      </Row>
    </Row>
  );
};

export default ProjectScreen;
