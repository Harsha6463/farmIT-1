import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../API";
import Navbar from "../Navbar/Navbar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("🚪 Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        } else {
          const response = await API.get("http://localhost:3600/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);

          const documentsResponse = await API.get("/documents/my-documents", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDocuments(documentsResponse.data);
        }
      } catch (err) {
        toast.error("Error fetching profile data");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="profile-page">
      <Navbar UserType={"farmer"} />
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="card shadow-lg w-100"
          style={{ maxWidth: "960px", backgroundColor: "#000", color: "#fff" }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmmNou5MA5eWo7rOGkIOA5QT7KZetYvFRApYUzi04LafxJEY4tpc-jrqfls4fv7Bu4q0w&usqp=CAU"
            alt="Banner"
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body text-center">
            <div className="position-relative" style={{ marginTop: "-80px" }}>
              <img
                src={
                  user.profilePic
                    ? `http://localhost:3600/${user.profilePic}`
                    : "https://i.imgur.com/8RKXAIV.jpg"
                }
                alt="user"
                className="rounded-circle border border-white"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <h3 className="mt-3 mb-4" style={{ color: "#00bfff" }}>
              👤 {user.firstName} {user.lastName}
            </h3>

            <div className="row justify-content-center text-start mb-4">
              <div className="col-md-10">
                {[
                  ["📛 Full Name", `${user.firstName} ${user.lastName}`],
                  ["📧 Email", user.email],
                  ["📱 Mobile", user.mobileNumber],
                  ["🧑‍💼 Role", user.role],
                  [
                    "✅ Status",
                    <span style={{ color: user.isVerified ? "#90ee90" : "red" }}>
                      {user.isVerified ? " ✅ Verified" : "Not Verified"}
                    </span>,
                  ],
                  ["📅 Joined", new Date(user.createdAt).toLocaleDateString()],
                ].map(([label, value], idx) => (
                  <div className="mb-3 row" key={idx}>
                    <div className="col-sm-4 fw-bold text-primary">{label}</div>
                    <div className="col-sm-1 text-center">:</div>
                    <div className="col-sm-7">{value}</div>
                  </div>
                ))}

                {/* Documents Section */}
                <div className="mb-4 row">
                  <div className="col-sm-4 fw-bold text-primary">🗂️ Documents</div>
                  <div className="col-sm-1 text-center">:</div>
                  <div className="col-sm-7">
                    {documents.length === 0 ? (
                      <div>No documents uploaded yet.</div>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {documents.map((doc) => (
                          <li
                            key={doc._id}
                            className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center"
                          >
                            📄 <span className="fw-bold">{doc.title}</span>
                            <span
                              style={{
                                color: doc.isVerified ? "#90ee90" : "#ffc107",
                                fontWeight: "bold",
                              }}
                            >
                              {doc.isVerified ? "✅ Verified" : "⏳ Pending"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between px-4 mb-2">
              <NavLink
                to="/documents"
                className="btn btn-primary"
                style={{ height: "48px", minWidth: "180px" }}
              >
                📤 Upload Documents
              </NavLink>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                style={{ height: "48px", minWidth: "180px" }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
