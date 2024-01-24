import React, { useState, useEffect } from "react";
import { Card, Row, Col, Tag, Select, Input } from "antd";
import "../styles/ProjectsComponent.css";
import { axiosInstance } from "../redux/axiosInstance";

const ProjectsComponent = () => {
  const [archivedProjects, setArchivedProject] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(archivedProjects);
  const [sortOrder, setSortOrder] = useState("AZ");

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handleSearch = (value) => {};

  const handleTagFilter = (tag) => {};

  const handleArchive = (projectId) => {};

  const handleComplete = (projectId) => {};
  const projectsList = [
    {
      id: 1,
      name: "Project 1",
      description: "This is the description for Project 1.",
      image: "project1.jpg",
      tags: ["React", "Ant Design", "JavaScript"],
      urls: ["https://example.com/project1"],
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is the description for Project 2.",
      image: "project2.jpg",
      tags: ["Vue.js", "Tailwind CSS", "Firebase"],
      urls: ["https://example.com/project2"],
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is the description for Project 2.",
      image: "project2.jpg",
      tags: ["Vue.js", "Tailwind CSS", "Firebase"],
      urls: ["https://example.com/project2"],
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is the description for Project 2.",
      image: "project2.jpg",
      tags: ["Vue.js", "Tailwind CSS", "Firebase"],
      urls: ["https://example.com/project2"],
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is the description for Project 2.",
      image: "project2.jpg",
      tags: ["Vue.js", "Tailwind CSS", "Firebase"],
      urls: ["https://example.com/project2"],
    },
  ];

  const fetchProjects = async () => {
    try {
      const { data } = await axiosInstance.get("/projects", null, {
        params: {
          type: "archived",
        },
      });
      console.log("Data", data);
      setArchivedProject(data.response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Row>
      <Row style={{ marginTop: "40px" }}>
        <Row gutter={[16, 16]}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Select defaultValue="Newest" onChange={handleSortChange}>
                <Option value="AZ">A-Z</Option>
                <Option value="ZA">Z-A</Option>
                <Option value="Newest">Newest</Option>
                <Option value="Oldest">Oldest</Option>
              </Select>
            </Col>
            <Col span={16}>
              <Input.Search
                placeholder="Search by Name"
                onSearch={handleSearch}
              />
            </Col>
          </Row>
          <Col lg={24}>
            <Row gutter={[16, 16]}>
              {archivedProjects.map((project) => (
                <Col key={project._id} span={12} lg={12}>
                  <Card className="project_card">
                    <img
                      src="../../public/Logo.png"
                      alt="project Logo"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                    <h2>{project.projectName}</h2>
                    <p>{project.description}</p>
                    <div className="project_tags">
                      Tags:
                      {project.techStacks.map((tag) => (
                        <Tag
                        //   key={tag} onClick={() => handleTagFilter(tag)}
                        >
                          <p>{tag}</p>
                        </Tag>
                      ))}
                    </div>
                    <div className="project_url">
                      Project URL:
                      <a
                        href={archivedProjects.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.liveUrl}
                      </a>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Row>
    </Row>
  );
};

export default ProjectsComponent;
