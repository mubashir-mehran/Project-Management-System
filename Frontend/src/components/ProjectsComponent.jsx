import React, { useState, useEffect } from "react";
import { Card, Row, Col, Tag, Select, Input, Space, Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "../styles/ProjectsComponent.css";
import { axiosInstance } from "../redux/axiosInstance";
const { confirm } = Modal;

const ProjectsComponent = ({ activeTab, setActiveTab }) => {
  const [projectsList, setProjectList] = useState([]);

  const [archivedProjects, setArchivedProject] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(archivedProjects);
  const [sortOrder, setSortOrder] = useState("AZ");

  const [search, setSearch] = useState("");
  const [sortByName, setSortByName] = useState("az");
  const [sortByDate, setSortByDate] = useState("newest");

  const handleSortChange = (value) => {
    // setSortOrder(value);
    if (value == "az") {
      setSortByName("az");
    } else if (value == "za") {
      setSortByName("za");
    } else if (value == "newest") {
      setSortByDate("newest");
    } else if (value == "oldest") {
      setSortByDate("oldest");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleTagFilter = (tag) => {};

  const handleArchive = async (projectId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to archive this project?"
      );
      if (isConfirmed) {
        const { data } = await axiosInstance.patch(
          `/projects?id=${projectId}`,
          {
            type: "archived",
          }
        );
        fetchProjects();
      } else {
        console.log("Archiving canceled by user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (projectId) => {
    try {
      const { data } = await axiosInstance.patch(`/projects?id=${projectId}`, {
        type: "completed",
      });
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const showConfirm = () => {
    confirm({
      title: "Do you want to Archive this project?",
      content: "",
      async onOk() {
        try {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch (e) {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axiosInstance.get("/projects", {
        params: {
          type: activeTab,
          sortByName,
          sortByDate,
          search,
        },
      });
      setProjectList(data.response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, [search, sortByDate, sortByName, activeTab]);

  return (
    <Row>
      <Row style={{ marginTop: "90px" }}>
        <Row gutter={[16, 16]}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Select defaultValue="Newest" onChange={handleSortChange}>
                <Option value="az">A-Z</Option>
                <Option value="za">Z-A</Option>
                <Option value="newest">Newest</Option>
                <Option value="oldest">Oldest</Option>
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
              {projectsList.map((project) => {
                const projectId = project?._id;
                return (
                  <Col key={project._id} span={12} lg={12}>
                    <Card
                      className="project_card"
                      extra={
                        <Space>
                          {project.type === "current" && (
                            <Button
                              // onClick={showConfirm}
                              onClick={() => handleArchive(projectId)}
                            >
                              Archive
                            </Button>
                          )}
                          {project.type === "current" && (
                            <Button onClick={() => handleComplete(projectId)}>
                              Complete
                            </Button>
                          )}
                          {project.type === "current" && (
                            <Button>
                              Edit <EditOutlined />
                            </Button>
                          )}
                        </Space>
                      }
                    >
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
                );
              })}
            </Row>
          </Col>
        </Row>
      </Row>
    </Row>
  );
};

export default ProjectsComponent;
