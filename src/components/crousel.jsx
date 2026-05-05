import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

function ScrollCarousel() {
  const [banners, setBanners] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/banner`
        );
        setBanners(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBanners();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="position-relative container my-3">

      <button
        onClick={scrollLeft}
        className="d-flex align-items-center justify-content-center position-absolute top-50 start-0 translate-middle-y"
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          zIndex: 10,
        }}
      >
        <FaRegArrowAltCircleLeft size={22} />
      </button>

      <div
        ref={scrollRef}
        className="d-flex overflow-auto gap-2 px-3 py-2"
        style={{
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
        }}
      >

        {banners.map((item) => {
          const product = item.productId;

          return (
            <Link
              key={item._id}
              to={`/product/${product?._id}/${item.discount || 0}`}
              className="text-decoration-none text-dark flex-shrink-0"
            >

              <div
                className="text-center"
                style={{ width: "160px" }}
              >

                <img
                  src={
                    product?.image?.[0] ||
                    "https://via.placeholder.com/200"
                  }
                  alt={item.alt}
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />

                <p className="mt-2 mb-1 small">
                  {item.caption}
                </p>

                {item.discount > 0 && (
                  <span className="badge bg-warning text-dark">
                    {item.discount}% OFF
                  </span>
                )}

              </div>

            </Link>
          );
        })}

      </div>

      {/* RIGHT BUTTON (CIRCLE STYLE) */}
      <button
        onClick={scrollRight}
        className="d-flex align-items-center justify-content-center position-absolute top-50 end-0 translate-middle-y"
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          zIndex: 10,
        }}
      >
        <FaRegArrowAltCircleRight size={22} />
      </button>

    </div>
  );
}

export default ScrollCarousel;