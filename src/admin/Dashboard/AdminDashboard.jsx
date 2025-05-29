import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";
import { Link } from "react-router-dom";
  

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") {
    navigate("/");
    return null; // avoid rendering
  }

  const [stats, setStats] = useState({});

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Admin Dashboard Overview</h1>
        <p className="dashboard-description">
          Welcome back, admin! Here’s a visual overview of your platform’s current
          status and how your content and users connect.
        </p>

        <div className="diagram">
          {user && user.mainrole === "superadmin" && (
  <Link to="/admin/users" className="node users" style={{ textDecoration: "none", color: "inherit" }}>
    <h2>{stats.totalUsers ?? "—"}</h2>
    <p>Total Users</p>
    <small>All registered users on the platform</small>
  </Link>
)}


          <Link to="/admin/course" className="node courses" style={{ textDecoration: "none", color: "inherit" }}>
  <h2>{stats.totalCourses ?? "—"}</h2>
  <p>Total Courses</p>
  <small>Courses created by instructors</small>
</Link>


          <div className="node lectures">
            <h2>{stats.totalLectures ?? "—"}</h2>
            <p>Total Lectures</p>
            <small>Lecture videos and materials inside courses</small>
          </div>

          <div className="node docs">
            <h2>{stats.totalDocumentations ?? "—"}</h2>
            <p>Total Documentations</p>
            <small>Supplementary PDFs and resources</small>
          </div>

         
          
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;
