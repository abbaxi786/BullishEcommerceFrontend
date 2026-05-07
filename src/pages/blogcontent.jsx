import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBlog, FaRegCalendarAlt, FaTags, FaUser, FaArrowLeft } from "react-icons/fa";

export function BlogContentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-muted">No blog found</h4>
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

      {/* Back Button */}
      <div className="mb-4">
        <button
          className="btn btn-outline-warning"
          onClick={() => navigate("/blog")}
        >
          <FaArrowLeft className="me-2" />
          Back to Blog
        </button>
      </div>

      {/* Title Section */}
      <div className="text-center mb-4">
        <FaBlog size={40} className="text-warning mb-2" />
        <h1 className="fw-bold text-dark">{post.title}</h1>

        {/* Meta Info */}
        <div className="d-flex justify-content-center flex-wrap gap-3 text-muted mt-3">
          <span>
            <FaUser className="me-1 text-warning" /> {post.author}
          </span>

          <span>
            <FaRegCalendarAlt className="me-1 text-warning" /> {post.date}
          </span>

          <span>
            <FaTags className="me-1 text-warning" /> {post.category}
          </span>
        </div>
      </div>

      {/* Image */}
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

      {/* Content */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-white p-4 shadow-sm rounded">
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.9",
                color: "#444",
                textAlign: "justify",
              }}
            >
              {post.content}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}