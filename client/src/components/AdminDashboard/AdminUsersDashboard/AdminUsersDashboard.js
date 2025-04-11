import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

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
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (userId) => {
    try {
      await API.put(`/admin/users/${userId}/verify`);
      setUsers(users.map((user) =>
        user._id === userId ? { ...user, isVerified: true } : user
      ));
      toast.success("✅ User verified successfully!");
    } catch (error) {
      console.error("Error verifying user:", error);
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

  const formatStatus = (isVerified) => {
    return isVerified ? (
      <span className="badge bg-success" style={{ fontSize: "1.1rem", padding:"13px" }}>
        🟢 Verified
      </span>
    ) : (
      <span className="badge bg-warning text-dark" style={{ fontSize: "1.1rem", padding:"13px" }}>
        🟡 Waiting for Verification
      </span>
    );
  };
 
  

  return (
    <>
      <ToastContainer />
      <Navbar UserType="admin" />

      <div className="mt-5" style={{ width: "90%", marginLeft: "90px" }}>
        <h2 className="title" style={{ marginTop: "120px" }}>
          👥 Users Dashboard
        </h2>
        {loading ? (
          <p className="text-center fw-bold fs-4">Loading users...</p>
        ) : users.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle" style={{ fontSize: "1.25rem" }}>
              <thead className="table-dark">
                <tr>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                        src={
                          user.profilePic
                            ? `http://localhost:3600/${user.profilePic}`
                            : "https://i.imgur.com/8RKXAIV.jpg"
                        } alt=""
                          className="rounded-circle me-2"
                          width="50"
                          height="50"
                        />
                        <div>
                          <div className="fw-bold">{user.email}</div>
                          <div className="text-muted small">
                            Added: {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.username || `${user.firstName} ${user.lastName}`}</td>
                    <td>{formatStatus(user.isVerified)}</td>
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        {!user.isVerified && (
                          <button
                            className="btn btn-outline-success btn-sm"
                            style={{ fontSize: "1.25rem" }}
                            onClick={() => verifyUser(user._id)}
                          >
                            ✅ Verify
                          </button>
                        )}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          style={{ fontSize: "1.25rem" }}
                          onClick={() => deleteUser(user._id)}
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-muted fs-4">No users found.</p>
        )}
      </div>
    </>
  );
};

export default AdminUsersDashboard;
