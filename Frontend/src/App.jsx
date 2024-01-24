import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Login";
import AddProject from "./Dashboard";
import AllProjectsPage from "./Projects";
import AchievedProjectsPage from "./ArchievedProjects";
import CompeletedProjectsPage from "./CompletedProjects";
import React, { useState, useEffect } from "react";
import SignupPage from "./SignupScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/dashboard" element={<AddProject />}></Route>
        <Route
          path="/dashboard/projects/all"
          element={<AllProjectsPage />}
        ></Route>
        <Route
          path="/dashboard/projects/archived"
          element={<AchievedProjectsPage />}
        ></Route>
        <Route
          path="/dashboard/projects/completed"
          element={<CompeletedProjectsPage />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
