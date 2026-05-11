import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RandomProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchRandomProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/randomproducts`
      );

      if (response.data.success) {
        setProducts(response.data.data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  return (
    <div className="container-fluid py-5 bg-light">

      <div
        className="position-relative rounded-4 overflow-hidden mb-5"
        style={{
          height: "380px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        />

        <div
          className="position-relative h-100 d-flex flex-column justify-content-center align-items-center text-center text-white"
          style={{ zIndex: 2 }}
        >
          <FaShoppingBag size={50} className="text-warning mb-3" />

          <h1 className="fw-bold display-4">
            Featured Men's Collection
          </h1>

          <p className="text-light fs-5" style={{ maxWidth: "700px" }}>
            Discover premium fashion, streetwear, shoes, watches & more
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <div>
          <h2 className="fw-bold">Featured Products</h2>
          <p className="text-muted">Latest trending items</p>
        </div>

        <span
          className="bg-warning text-dark px-3 py-2"
          style={{
            whiteSpace: "nowrap",
            flexShrink: 0,
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: 600,
            height:"40px"
          }}
        >
          {products.length} Products
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" />
          <h5 className="mt-3">Loading...</h5>
        </div>
      ) : (
        <div className="row g-4">

          {products.map((product) => (
            <div
              key={product._id}
              className="col-sm-6 col-md-4 col-lg-3"
            >

              <div
                className="product-card"
                onClick={() => navigate(`/product/${product._id}`)}
              >

                {/* IMAGE */}
                <img
                  src={product.image?.[0]}
                  alt={product.name}
                  className="product-img"
                />

                {/* OVERLAY */}
                <div className="overlay" />

                {/* CONTENT */}
                <div className="content">

                  <span className="category">
                    {product.category?.[0]?.name}
                  </span>

                  <h5 className="title">
                    {product.name}
                  </h5>

                  <p className="desc">
                    {product.description}
                  </p>

                  <h4 className="price">
                    ${product.price}
                  </h4>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* STYLES */}
      <style>
        {`
          .product-card {
            position: relative;
            height: 420px;
            border-radius: 18px;
            overflow: hidden;
            cursor: pointer;
            transition: 0.4s ease;
          }

          .product-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.5s ease;
          }

          .overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.25);
            transition: 0.4s ease;
          }

          .content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            color: white;
            transform: translateY(70%);
            transition: 0.4s ease;
          }

          .category {
            background: #ffc107;
            color: black;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
          }

          .title {
            margin-top: 10px;
            font-weight: bold;
          }

          .desc {
            font-size: 13px;
            opacity: 0.8;
          }

          .price {
            color: #ffc107;
            margin-top: 8px;
          }

          /* HOVER EFFECT */
          .product-card:hover .product-img {
            transform: scale(1.1);
            filter: blur(2px) brightness(0.6);
          }

          .product-card:hover .overlay {
            background: rgba(0,0,0,0.55);
          }

          .product-card:hover .content {
            transform: translateY(0);
          }
        `}
      </style>

    </div>
  );
}