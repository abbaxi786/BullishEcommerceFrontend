import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { NotificationContext } from "../../function/notification";

function BannerItems() {
  const [form, setForm] = useState({
    alt: "",
    caption: "",
    productId: "",
    discount: 0,
  });

  const { showToast } = useContext(NotificationContext);

  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem("bannerData"));
    if (value) {
      setForm(value);
    }
  }, []);

  function handleValue(e) {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: name === "discount" ? Number(value) : value,
    };

    setForm(updatedForm);
    sessionStorage.setItem("bannerData", JSON.stringify(updatedForm));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/banner`,
        form
      );

      showToast("The banner is created.", "primary");

      setForm({
        alt: "",
        caption: "",
        productId: "",
        discount: 0,
      });

      sessionStorage.removeItem("bannerData");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-4">

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <h3 className="text-warning mb-3">Create Banner</h3>

        {/* CAPTION */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Caption
          </label>
          <input
            type="text"
            name="caption"
            placeholder="Enter banner caption"
            value={form.caption}
            onChange={handleValue}
            required
            className="form-control"
          />
        </div>

        {/* ALT TEXT */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Alternate Text
          </label>
          <input
            type="text"
            name="alt"
            placeholder="Enter image alt text"
            value={form.alt}
            onChange={handleValue}
            required
            className="form-control"
          />
        </div>

        {/* PRODUCT ID */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Product ID (Optional)
          </label>
          <input
            type="text"
            name="productId"
            placeholder="Enter product ID"
            value={form.productId}
            onChange={handleValue}
            className="form-control"
          />
        </div>

        {/* DISCOUNT */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            placeholder="Enter discount percentage"
            value={form.discount}
            onChange={handleValue}
            className="form-control"
            min="0"
            max="100"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="btn btn-warning w-100 fw-bold"
        >
          Create Banner
        </button>

      </form>

    </div>
  );
}

export default BannerItems;