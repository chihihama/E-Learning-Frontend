import React, { useState, useEffect } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Redirect non-superadmins
    if (user && user.mainrole !== "superadmin") {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers([...data.users]);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  // Handle user role update
  const updateRole = async (id) => {
    if (confirm("Are you sure you want to update this user's role?")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    }
  };

  return (
    <Layout>
      <div className="users-page">
        <div className="users-overlay">
          <h1 className="users-title">User Management</h1>
          <button className="go-back-btn" onClick={() => navigate(-1)}>
  ← Go Back
</button>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((e, i) => (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td data-role={e.role}>{e.role}</td>
                    <td>
                      <button
                        onClick={() => updateRole(e._id)}
                        className="action-btn"
                      >
                        Update Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;