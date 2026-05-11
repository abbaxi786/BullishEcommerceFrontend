import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTrash,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaRegCalendarAlt,
  FaCommentDots,
} from "react-icons/fa";

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
        setContacts((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container-fluid py-4 bg-light">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold text-warning">
          Contact Messages
        </h2>

        <span className="badge bg-warning text-dark fs-6 px-3 py-2">
          Total: {contacts.length}
        </span>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" />
          <h5 className="mt-3">Loading...</h5>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-5 text-muted">
          No contact messages found
        </div>
      ) : (

        <div className="table-responsive shadow-sm rounded">

          <table className="table table-hover align-middle bg-white">

            {/* HEADER */}
            <thead className="table-warning">

              <tr>
                <th>#</th>

                <th>
                  <FaUser className="me-1" />
                  Name
                </th>

                <th>
                  <FaEnvelope className="me-1" />
                  Email
                </th>

                <th>
                  <FaPhoneAlt className="me-1" />
                  Phone
                </th>

                <th>
                  Subject
                </th>

                <th>
                  <FaCommentDots className="me-1" />
                  Message
                </th>

                <th>
                  <FaRegCalendarAlt className="me-1" />
                  Date
                </th>

                <th>
                  Action
                </th>
              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {contacts.map((contact, index) => (

                <tr key={contact._id}>

                  <td>{index + 1}</td>

                  <td>{contact.name}</td>

                  <td>{contact.email}</td>

                  <td>{contact.phoneNumber}</td>

                  <td>{contact.subject || "General"}</td>

                  <td style={{ maxWidth: "220px" }}>
                    {contact.message.length > 80
                      ? contact.message.substring(0, 80) + "..."
                      : contact.message}
                  </td>

                  <td>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}