import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FeaturedDeals() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/banner`);
        setBanners(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <p className="text-center text-muted py-4">No featured deals found.</p>
    );
  }

  return (
    <section className="container my-5">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="fw-bold mb-0">Featured Deals</h3>
          <p className="text-muted mb-0">Limited time offers just for you</p>
        </div>
        <span
          className="badge bg-warning text-dark px-3 py-2"
          style={{ fontSize: 14, borderRadius: 20 }}
        >
          {banners.length} Offers
        </span>
      </div>

      {/* Grid */}
      <div className="row g-4">
        {banners.map((item) => {
          const product = item.productId;
          const discountedPrice = product?.price
            ? (product.price - (product.price * (item.discount || 0)) / 100).toFixed(2)
            : null;

          return (
            <div className="col-12 col-sm-6 col-lg-4" key={item._id}>
              <Link
                to={`/product/${product?._id}/${item.discount || 0}`}
                className="text-decoration-none text-dark"
              >
                <div
                  className="rounded-4 overflow-hidden border h-100"
                  style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >

                  {/* Image */}
                  <div style={{ position: "relative" }}>
                    <img
                      src={product?.image?.[0] || "https://via.placeholder.com/400"}
                      alt={item.alt}
                      className="w-100"
                      style={{ height: 260, objectFit: "cover", display: "block" }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)",
                      }}
                    />

                    {/* Discount badge */}
                    {item.discount > 0 && (
                      <span
                        className="badge bg-warning text-dark fw-bold"
                        style={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          fontSize: 13,
                          borderRadius: 8,
                          padding: "5px 10px",
                        }}
                      >
                        {item.discount}% OFF
                      </span>
                    )}

                    {/* Caption over image bottom */}
                    <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                      <p
                        className="text-white fw-semibold mb-0 text-truncate"
                        style={{ fontSize: 16 }}
                        title={item.caption}
                      >
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  {/* Card body — only renders if price exists */}
                  {discountedPrice && (
                    <div className="p-3 bg-white">
                      <div className="d-flex align-items-center justify-content-between">

                        <div>
                          <span className="fw-bold fs-5 text-dark">
                            ${discountedPrice}
                          </span>
                          {item.discount > 0 && (
                            <span
                              className="text-muted text-decoration-line-through ms-2"
                              style={{ fontSize: 13 }}
                            >
                              ${product.price}
                            </span>
                          )}
                        </div>

                        <span
                          className="badge bg-warning text-dark px-3 py-2"
                          style={{ fontSize: 12, borderRadius: 20 }}
                        >
                          Shop Now →
                        </span>

                      </div>

                      {item.discount > 0 && (
                        <p className="text-success small mb-0 mt-2">
                          You save ${(product.price * item.discount / 100).toFixed(2)}
                        </p>
                      )}
                    </div>
                  )}

                </div>
              </Link>
            </div>
          );
        })}
      </div>

    </section>
  );
}

export default FeaturedDeals;