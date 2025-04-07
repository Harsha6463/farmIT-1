import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import "./AdminIssuesDashboard.css";

const AdminIssuesDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await API.get("/issue/all-issues");
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar UserType={"admin"} />
      <div className="admin-issues-dashboard">
        <div className="issues-dashboard-content">
          <h1 className="title" style={{ marginTop: "90px" }}>
            Admin Issues Dashboard
          </h1>

          {loading ? (
            <p className="loading-text"><b>Loading issues...</b></p>
          ) : issues.length > 0 ? (
            <div className="issues-table-container">
              <table className="issues-table">
                <thead>
                  <tr>
                    <th>Issue Title</th>
                    <th>Description</th>
                    <th>Reported By</th>
                    <th>Reported On</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue._id}>
                      <td>{issue.issueTitle}</td>
                      <td>{issue.issueDiscription}</td>
                      <td>{issue.user?.firstName} {issue.user?.lastName}</td>
                      <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-issue-data">No issues reported.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminIssuesDashboard;
