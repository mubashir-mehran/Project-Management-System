import React, { useState } from "react";
import ProjectsComponent from "../components/ProjectsComponent";
import NavBar from "../components/Navbar";

function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProjectsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default ProjectsPage;
