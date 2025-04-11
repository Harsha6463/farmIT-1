import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

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
      <span className="badge bg-success fw-bold" style={{ fontSize: "1.25rem", padding: "13px" }}>
        🟢 Verified
      </span>
    ) : (
      <span className="badge bg-warning text-dark fw-bold" style={{ fontSize: "1.25rem", padding: "13px" }}>
        🟡 Waiting for Verification
      </span>
    );
  };

  return (
    <>
      <ToastContainer />
      <Navbar UserType="admin" />

      <div style={{ marginTop: "120px", width: "90%", marginLeft: "90px" }}>
        <h2 className="mb-4 fw-bold fs-2">👥 Users Dashboard</h2>

        {loading ? (
          <p className="text-center fw-bold fs-4">Loading users...</p>
        ) : users.length > 0 ? (
          <div className="row">
            {users.map((user) => (
              <div className="col-md-4 mb-4" key={user._id}>
                <div className="card shadow">
                  <div className="card-header p-0">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaS0mqDew3w893mhILm6ss-aQkIPnQA52XEg&s"
                      alt="cover"
                      className="img-fluid w-100"
                      style={{ height: "120px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body text-center" style={{ fontSize: "1.25rem" }}>
                    <div className="profile mb-3">
                      <img
                        src={
                          user.profilePic
                            ? `http://localhost:3600/${user.profilePic}`
                            : "https://i.imgur.com/8RKXAIV.jpg"
                        }
                        alt="profile"
                        className="rounded-circle border border-3"
                        width="80"
                        height="80"
                        style={{
                          marginTop: "-50px",
                          backgroundColor: "white",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://i.imgur.com/8RKXAIV.jpg";
                        }}
                      />
                    </div>
                    <h5
                      className="card-title mb-1 fw-bold"
                      style={{ color: "#6f42c1" }} // Custom name color
                    >
                      {user.username || `${user.firstName} ${user.lastName}`}
                    </h5>
                    <p className="text-muted mb-2 fw-bold">{user.email}</p>
                    <p className="text-muted fw-bold">
                      Added: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mb-3">{formatStatus(user.isVerified)}</div>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      {!user.isVerified && (
                        <button
                          className="btn btn-outline-success btn-sm fw-bold"
                          style={{ fontSize: "1.25rem" }}
                          onClick={() => verifyUser(user._id)}
                        >
                          ✅ Verify
                        </button>
                      )}
                      <button
                        className="btn btn-outline-danger btn-sm fw-bold"
                        style={{ fontSize: "1.25rem" }}
                        onClick={() => deleteUser(user._id)}
                      >
                        ❌ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted fs-4">No users found.</p>
        )}
      </div>
    </>
  );
};

export default AdminUsersDashboard;
