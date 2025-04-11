import React, { useEffect, useState } from 'react';
import API from '../../../API';
import Navbar from '../../Navbar/Navbar';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please log in first.');
          return;
        }

        const response = await API.get('http://localhost:3600/api/admin/documents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(response.data);
      } catch (err) {
        setError('Failed to fetch documents');
        console.error(err);
        toast.error('Failed to fetch documents');
      }
    };

    fetchDocuments();
  }, []);

  const handleVerify = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in first.');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await API.put(
        `http://localhost:3600/api/admin/documents/${id}/verify`,
        {},
        config
      );

      const updatedDocument = response.data;
      setDocuments(documents.map(doc => doc._id === updatedDocument._id ? updatedDocument : doc));
      toast.success('Document verified successfully!');
    } catch (error) {
      console.error('Error verifying document:', error);
      toast.error(error.response?.data?.message || 'Failed to verify document');
    }
  };

  return (
    <div className="mt-5" style={{ width: "90%", marginLeft: "90px" }}>
      <Navbar UserType="admin" />
      <h2 className="title" style={{ marginTop: "120px" }}>📄 Documents List</h2>
      {error && <p className="text-danger">{error}</p>}
      {documents.length === 0 ? (
        <p className="text-muted text-center">No documents available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle" style={{ fontSize: "1.25rem" }}>
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Uploaded</th>
                <th>Uploaded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.title}</td>
                  <td>{doc.type}</td>
                  <td>{new Date(doc.uploadedAt).toLocaleString()}</td>
                  <td>
                    {doc.owner ? (
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            doc.owner.profilePic
                              ? `http://localhost:3600/${doc.owner.profilePic}`
                              : "https://i.imgur.com/8RKXAIV.jpg"
                          }
                          alt="user"
                          className="rounded-circle me-2"
                          width="50"
                          height="50"
                        />
                        <span>{`${doc.owner.firstName} ${doc.owner.lastName}`}</span>
                      </div>
                    ) : (
                      'Unknown'
                    )}
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <a
                        href={`http://localhost:3600/${doc.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                        style={{ fontSize: '1.25rem' }}
                      >
                        👁️ View
                      </a>
                      <a
                        href={`http://localhost:3600/${doc.filePath}`}
                        download
                        className="btn btn-sm btn-secondary"
                        style={{ fontSize: '1.25rem' }}
                      >
                        ⬇️ Download
                      </a>
                      {!doc.isVerified && (
                        <button
                          className="btn btn-sm btn-success"
                          style={{ fontSize: '1.25rem' }}
                          onClick={() => handleVerify(doc._id)}
                        >
                          ✅ Verify
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetDocuments;
