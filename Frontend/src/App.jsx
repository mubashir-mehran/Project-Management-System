import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Login";
import AddProject from "./Dashboard";
import AllProjectsPage from "./Projects";
import AchievedProjectsPage from "./ArchievedProjects";
import CompeletedProjectsPage from "./CompletedProjects";
import React, { useState, useEffect } from "react";
import SignupPage from "./SignupScreen";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ProjectsPage from "./pages/ProjectsPage";

const firebaseConfig = {
  apiKey: "AIzaSyArQvT9y-z_D7_Xc7azefrSzh3SGWXaXWw",
  authDomain: "test-tezeract.firebaseapp.com",
  projectId: "test-tezeract",
  storageBucket: "test-tezeract.appspot.com",
  messagingSenderId: "341103227495",
  appId: "1:341103227495:web:f475c8407ef36fbe9fdac2",
  measurementId: "G-MLEEDTW5WK",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

function App() {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/dashboard" element={<AddProject />}></Route>
        <Route
          path="/dashboard/projects/all"
          element={<ProjectsPage />}
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
