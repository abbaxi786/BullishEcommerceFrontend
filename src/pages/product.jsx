import { useParams } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../function/context";
import axios from "axios";
import { NotificationContext } from "../function/notification";

function ViewProduct() {
  const { id, discount } = useParams();

  const { setCart, user } = useContext(CartContext);
  const { showToast } = useContext(NotificationContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComments, setRatingComments] = useState("");

  const finalDiscount =
    discount !== undefined ? Number(discount) : 0;

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: "#f5c518", fontSize: "18px" }}>
          {i <= count ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    async function GetProduct(ID) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/productname/${ID}`
        );
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    GetProduct(id);
    setQuantity(1);
  }, [id]);

  // ---------------- FEEDBACK ----------------
  const fetchFeedback = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/feedback/${id}`
      );
      setFeedbacks(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  const submitFeedback = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/feedback`,
        {
          ratingStars,
          ratingEmail: user?.email,
          ratingComments,
          productId: id
        }
      );

      if (res.data.success) {
        showToast("Review added", "success");
        setRatingComments("");
        fetchFeedback();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h3>Loading product...</h3>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * finalDiscount) / 100;

  const addToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity,
          discount: finalDiscount,
          finalPrice: discountedPrice,
        },
      ];
    });

    showToast("Added to cart", "success");
  };

  return (
    <div className="container py-5">

      <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly gap-4">

        <div>
          <img
            className="rounded-4 img-fluid"
            src={product.image?.[0]}
            alt={product.name}
            style={{ maxWidth: "300px", objectFit: "contain" }}
          />
        </div>

        <div className="p-3">
          <h1 className="fw-light">{product.name}</h1>
          <p className="text-muted">{product.description}</p>

          <div className="mb-3">
            {finalDiscount > 0 ? (
              <>
                <p style={{ textDecoration: "line-through" }}>
                  ${product.price}
                </p>

                <p className="text-danger fs-4">
                  ${discountedPrice.toFixed(2)}
                </p>

                <span className="badge bg-dark">
                  {finalDiscount}% OFF
                </span>
              </>
            ) : (
              <p className="text-danger fs-4">
                ${product.price}
              </p>
            )}
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <button
              className="btn btn-outline-dark"
              onClick={() =>
                setQuantity((prev) => Math.max(1, prev - 1))
              }
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              className="btn btn-outline-dark"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <button
            onClick={addToCart}
            className="btn btn-warning d-flex align-items-center gap-2"
          >
            <FaOpencart />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 border rounded bg-white shadow-sm">

        <h5 className="text-warning">Add Review</h5>

        <select
          className="form-select mb-2"
          value={ratingStars}
          onChange={(e) => setRatingStars(Number(e.target.value))}
          disabled={!user}
        >
          {[5, 4, 3, 2, 1].map((s) => (
            <option key={s} value={s}>
              {renderStars(s)} ({s})
            </option>
          ))}
        </select>

        <textarea
          className="form-control mb-2"
          placeholder={
            user ? "Write your review..." : "Login required to comment"
          }
          value={ratingComments}
          onChange={(e) => setRatingComments(e.target.value)}
          disabled={!user}
        />

        <button
          className="btn btn-warning w-100"
          onClick={submitFeedback}
          disabled={!user}
        >
          Submit Review
        </button>

        {!user && (
          <p className="text-danger mt-2">
            Please login to write a review
          </p>
        )}
      </div>

      {/* ---------------- REVIEWS ---------------- */}
      <div className="mt-5">

        <h3 className="text-warning">Customer Reviews</h3>

        {feedbacks.length === 0 && (
          <p className="text-muted">No reviews yet</p>
        )}

        {feedbacks.map((fb) => (
          <div
            key={fb._id}
            className="border rounded p-3 mb-3 bg-white shadow-sm"
          >
            <div className="d-flex justify-content-between">
              <strong>{fb.ratingEmail}</strong>
              <div>{renderStars(fb.ratingStars)}</div>
            </div>

            <p className="mt-2 mb-0">{fb.ratingComments}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ViewProduct;