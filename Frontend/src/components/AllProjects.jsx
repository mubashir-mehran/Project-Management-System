import React, { useEffect, useState } from "react";
import { Card, Row, Col, Select, Input, Button, Tag, Space, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;
const { confirm } = Modal;
import "../styles/Project.css";
import { axiosInstance } from "../redux/axiosInstance";

const CurrentProject = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [sortOrder, setSortOrder] = useState("AZ");

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handleSearch = (value) => {};

  const handleTagFilter = (tag) => {};

  const handleArchive = (projectId) => {};
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

  const handleComplete = (projectId) => {};

  const fetchProjects = async () => {
    try {
      const { data } = await axiosInstance.get("/projects", null, {
        params: {
          type: "completed",
        },
      });
      setProjects(data.response);
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
              {projects?.map((project) => (
                <Col key={project._id} span={12} lg={12}>
                  <Card
                    className="project_card"
                    extra={
                      <Space>
                        <Button
                          onClick={showConfirm}
                          //  onClick={() => handleArchive(project.id)}
                        >
                          Archive
                        </Button>
                        <Button
                        // onClick={() => handleComplete(project.id)}
                        >
                          Complete
                        </Button>
                        <Button>
                          Edit <EditOutlined />
                        </Button>
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
                    <div className="tags">
                      Tags:
                      {project?.techStacks?.map((tag) => {
                        return (
                          <Tag className="project_tags">
                            <p>{tag}</p>
                          </Tag>
                        );
                      })}
                    </div>
                    <div className="project_url">
                      Project URL:
                      <a
                        href={projects.liveUrl}
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

export default CurrentProject;
