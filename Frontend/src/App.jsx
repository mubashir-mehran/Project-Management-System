import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllProjectsPage from "./pages/Projects";
import AchievedProjectsPage from "./pages/ArchievedProjects";
import CompeletedProjectsPage from "./pages/CompletedProjects";
import React, { useState, useEffect } from "react";
import SignupPage from "./pages/SignupScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
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
