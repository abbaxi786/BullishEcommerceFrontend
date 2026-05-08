import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaCalendar, FaTag, FaArrowLeft } from "react-icons/fa";

export function BlogContentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h4>No blog found</h4>
        <button
          className="btn btn-warning mt-3"
          onClick={() => navigate("/blog")}
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <button
        className="btn btn-outline-warning mb-4"
        onClick={() => navigate("/blog")}
      >
        <FaArrowLeft className="me-2" />
        Back to Blog
      </button>

      <div className="text-center mb-4">
        <h1 className="fw-bold text-dark">{post.title}</h1>

        <div className="text-muted small mt-3">
          <span className="me-3">
            <FaUser className="text-warning me-1" />
            {post.author} ({post.role})
          </span>

          <span className="me-3">
            <FaCalendar className="text-warning me-1" />
            {post.date}
          </span>

          <span>
            <FaTag className="text-warning me-1" />
            {post.category}
          </span>
        </div>

        <small className="text-muted">{post.readingTime}</small>
      </div>

      <div className="text-center mb-4">
        <img
          src={post.image}
          alt={post.title}
          className="img-fluid shadow"
          style={{
            maxHeight: "450px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-white p-4 shadow-sm rounded">
            <p style={{ fontSize: "18px", lineHeight: "1.9" }}>
              {post.content}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}