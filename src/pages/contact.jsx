import React, { useState,useContext } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { NotificationContext } from "../function/notification";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const {showToast}= useContext(NotificationContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        formData
      );

      if (response.data.success) {
        showToast("Message sent successfully");

        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
              showToast(error.response?.data?.message || "Something went wrong","error");
    }
  };

  return (
    <div className="container py-5">
      <div className="row shadow-lg overflow-hidden rounded-4">


        <div
          className="col-lg-5 text-white position-relative p-5 d-flex flex-column justify-content-center"
          style={{
            minHeight: "650px",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0,0,0,0.65)",
              zIndex: 1,
            }}
          />

          <div style={{ zIndex: 2 }}>
            <h1 className="fw-bold text-warning mb-4">
              Contact Our Store
            </h1>

            <p className="mb-5 text-light">
              Have questions about products, orders, or delivery?
              Contact our support team anytime and we’ll help you.
            </p>

            <div className="mb-4 d-flex align-items-center">
              <FaEnvelope className="text-warning me-3" size={20} />
              <div>
                <h6 className="mb-1">Email</h6>
                <p className="mb-0 text-light">
                  support@mensfashion.com
                </p>
              </div>
            </div>

            <div className="mb-4 d-flex align-items-center">
              <FaPhoneAlt className="text-warning me-3" size={20} />
              <div>
                <h6 className="mb-1">Phone</h6>
                <p className="mb-0 text-light">
                  +92 300 1234567
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaMapMarkerAlt className="text-warning me-3" size={20} />
              <div>
                <h6 className="mb-1">Store Location</h6>
                <p className="mb-0 text-light">
                  Lahore, Punjab, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="col-lg-7 bg-white p-5">
          <h2 className="fw-bold mb-4 text-warning">
            Send Us a Message
          </h2>

          <form onSubmit={submitHandler}>
            <div className="row">

              {/* Name */}
              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">
                  Phone Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Subject */}
              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">
                  Subject
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div className="col-12 mb-4">
                <label className="form-label fw-semibold">
                  Message
                </label>

                <textarea
                  rows="6"
                  className="form-control"
                  placeholder="Write your message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {/* Button */}
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-warning px-4 py-2"
                >
                  <FaPaperPlane className="me-2" />
                  Send Message
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}