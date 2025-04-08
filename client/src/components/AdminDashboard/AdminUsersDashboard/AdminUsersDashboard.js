import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import { ToastContainer, toast } from "react-toastify";
import "./AdminUsersDashboard.css";

const AdminUsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (userId) => {
    try {
      await API.put(`/admin/users/${userId}/verify`);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isVerified: true } : user
        )
      );
      toast.success("✅ User verified successfully!");
    } catch (error) {
      console.error("Error while verifying user:", error);
      toast.error("❌ Failed to verify user.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await API.delete(`/admin/deleteUser/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("🗑️ User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("❌ Failed to delete user.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar UserType={"admin"} />
      <div className="admin-dashboard">
      <h1 className="title" style={{ marginTop: "100px" }}>Users Dashboard</h1>
        <div className="dashboard-content">
          
          {loading ? (
            <p className="loading-message"><b>Loading users...</b></p>
          ) : users.length > 0 ? (
            <div className="table-responsive">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Verified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td className="role">{user.role}</td>
                      <td className={user.isVerified ? "verified-yes" : "verified-no"}>
                        {user.isVerified ? "Yes" : "No"}
                      </td>
                      <td>
                        <div className="action-buttons">
                          {!user.isVerified && (
                            <button
                              className="verify-btn"
                              onClick={() => verifyUser(user._id)}
                            >
                              ✅ Verify
                            </button>
                          )}
                          <button
                            className="delete-btn"
                            onClick={() => deleteUser(user._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-users">No users found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsersDashboard;
