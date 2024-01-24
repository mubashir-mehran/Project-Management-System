import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  Row,
  Col,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NavBar from "./components/Navbar";
const { TextArea } = Input;
import "./styles/Dashboard.css";
import { axiosInstance } from "../src/redux/axiosInstance";
import store from "./redux/store";
const { Option } = Select;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState({});
  const [images, setImages] = useState("");
  const [stack, setStack] = useState([]);
  const [gitlink, setGitlink] = useState("");
  const [url, setUrl] = useState("");
  const [type, SetType] = useState([]);
  const [image, setImage] = useState(null);

  const uploadImage = async (id) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("id", id);

      const responce = await axiosInstance.post("/projects/image", formData, {
        headers: {
          Authorization: id,
        },
      });
      console.log(responce);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = (values) => {
    try {
      axiosInstance
        .post("/projects/add", {
          ...values,
          type: "current",
        })
        .then((res) => uploadImage(res.data.response._id));

      // uploadImage(data.responce._id);
      toast.success("Project Created successfully");
      console.log("Project Created", responce?.data);
    } catch (error) {
      console.log("Errror", error?.data);
    }
  };
  const onFinish = (values) => {
    // console.log("Received values:", values);
    createProject(values);
  };

  const customUploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <NavBar />
      <Row className="form_section">
        <Col lg={24} xs={24} sm={24}>
          <Form
            name="addProjectForm"
            onFinish={onFinish}
            {...formItemLayout}
            variant="filled"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[
                { required: true, message: "Please enter the project name!" },
              ]}
            >
              <Input onChange={(e) => setProjectName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter the project description!",
                },
              ]}
            >
              <TextArea
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Start Date" name="startDate">
              <DatePicker onChange={(e) => setDate(e.target.value)} />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <input
                type="file"
                name="file"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
              {/* <Upload
                listType="picture-card"
                showUploadList={false}
                customRequest={({ file }) => uploadImage(file)}
                beforeUpload={() => false}
                onChange={(e) => alert(JSON.stringify(e))}
              >
                {images ? (
                  <img src={images} alt="project" style={{ width: "100%" }} />
                ) : (
                  customUploadButton
                )}
              </Upload> */}
            </Form.Item>

            <Form.Item label="Tech Stacks" name="techStacks">
              <Select
                mode="multiple"
                placeholder="Select tech stacks"
                onChange={(e) => setStack(e.target.value)}
              >
                <Option value="React">React</Option>
                <Option value="Node.js">Node.js</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Github Repo Link"
              name="githubRepo"
              rules={[{ type: "url", message: "Please enter a valid URL!" }]}
            >
              <Input onChange={(e) => setGitlink(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Live URL"
              name="liveUrl"
              rules={[{ type: "url", message: "Please enter a valid URL!" }]}
            >
              <Input onChange={(e) => setUrl(e.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
              <Button type="primary" htmlType="submit">
                Add Project
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </>
  );
};

export default AddProject;
