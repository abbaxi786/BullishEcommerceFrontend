import React from "react";
import { FaInfoCircle, FaBullseye, FaEye, FaUsers, FaPhoneAlt } from "react-icons/fa";

function AboutUs() {
  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1726862586245-0af0479b13c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1lbidzJTIwd2FyZHJvYmV8ZW58MHx8MHx8fDA%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          minHeight: "100vh",
          padding: "50px 0",
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-5 text-white">
          <FaInfoCircle size={40} className="text-warning mb-2" />
          <h1 className="fw-bold">About Us</h1>
          <p className="text-light">
            Learn more about our mission, vision, and who we are
          </p>
        </div>

        {/* Main Content */}
        <div className="container">
          <div className="row g-4">
            {/* Who We Are */}
            <div className="col-md-6">
              <div className="card border-warning h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-warning">
                    <FaUsers className="me-2" /> Who We Are
                  </h4>
                  <p className="card-text">
                    We are a dedicated team focused on delivering high-quality
                    products and services for men's fashion. Our goal is to
                    create value through innovation, trust, and consistency.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="col-md-6">
              <div className="card border-warning h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-warning">
                    <FaBullseye className="me-2" /> Our Mission
                  </h4>
                  <p className="card-text">
                    Our mission is to provide stylish, affordable, and high
                    quality men's clothing that helps customers look confident
                    and modern.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-warning h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-warning">
                    <FaEye className="me-2" /> Our Vision
                  </h4>
                  <p className="card-text">
                    We aim to become a leading men's fashion brand known for
                    quality, trust, and modern style across Pakistan and beyond.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-warning h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title text-warning">
                    <FaPhoneAlt className="me-2" /> Get in Touch
                  </h4>
                  <p className="card-text">
                    Have questions or feedback? We are always here to help you.
                  </p>
                  <ul className="list-unstyled">
                    <li>Email: support@example.com</li>
                    <li>Phone: +92 300 0000000</li>
                    <li>Location: Pakistan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;