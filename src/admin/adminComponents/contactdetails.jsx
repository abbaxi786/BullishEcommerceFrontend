import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTrash,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchContacts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/contact`
      );

      if (response.data.success) {
        setContacts(response.data.data);
      }

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  /* ================= DELETE CONTACT ================= */

  const deleteContact = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this message?"
      );

      if (!confirmDelete) return;

      const response = await axios.delete(
        `http://localhost:5000/contact/${id}`
      );

      if (response.data.success) {
        alert("Contact deleted successfully");

        setContacts((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }

    } catch (error) {
      console.log(error);
      alert("Failed to delete contact");
    }
  };

  /* ================= USE EFFECT ================= */

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-warning">
          Contact Messages
        </h2>

        <span className="badge bg-warning text-dark fs-6">
          Total: {contacts.length}
        </span>
      </div>

      {/* Table */}

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle">

          <thead className="table-warning">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No contact messages found
                </td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact._id}>

                  {/* Index */}
                  <td>{index + 1}</td>

                  {/* Name */}
                  <td>
                    <FaUser className="text-warning me-2" />
                    {contact.name}
                  </td>

                  {/* Email */}
                  <td>
                    <FaEnvelope className="text-warning me-2" />
                    {contact.email}
                  </td>

                  {/* Phone */}
                  <td>
                    <FaPhoneAlt className="text-warning me-2" />
                    {contact.phoneNumber}
                  </td>

                  {/* Subject */}
                  <td>{contact.subject || "General"}</td>

                  {/* Message Tooltip */}
                  <td style={{ maxWidth: "180px" }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${contact._id}`}>
                          {contact.message}
                        </Tooltip>
                      }
                    >
                      <span
                        style={{
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "block",
                        }}
                      >
                        {contact.message}
                      </span>
                    </OverlayTrigger>
                  </td>

                  {/* Date */}
                  <td>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>

                  {/* Delete */}
                  <td>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}