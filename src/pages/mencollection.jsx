import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingBag } from "react-icons/fa";
import Cards from "../components/card";

export default function RandomProductsPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


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

      setLoading(false);
      console.log(error);

    }
  };

  /* ================= USE EFFECT ================= */

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  return (
    <div className="container-fluid py-5 bg-light">

      {/* ================= HERO SECTION ================= */}

      <div
        className="position-relative rounded-4 overflow-hidden mb-5"
        style={{
          height: "350px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Overlay */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Content */}

        <div
          className="position-relative h-100 d-flex flex-column justify-content-center align-items-center text-center text-white px-3"
          style={{ zIndex: 2 }}
        >

          <FaShoppingBag
            size={45}
            className="text-warning mb-3"
          />

          <h1 className="fw-bold display-5">
            Featured Men's Collection
          </h1>

          <p
            className="text-light"
            style={{ maxWidth: "700px" }}
          >
            Discover premium men's fashion,
            trending outfits, luxury streetwear,
            jackets, shoes, watches, and more.
          </p>

        </div>
      </div>

      {/* ================= HEADER ================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            Featured Products
          </h2>

          <p className="text-muted mb-0">
            Random products from every category
          </p>
        </div>

        <span className="badge bg-warning text-dark px-3 py-2 fs-6">
          {products.length} Products
        </span>

      </div>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-warning"
            role="status"
          />

          <h5 className="mt-3">
            Loading Products...
          </h5>

        </div>

      ) : products.length === 0 ? (

        <div className="text-center py-5">

          <h4 className="text-muted">
            No Products Found
          </h4>

        </div>

      ) : (


        <div className="row g-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >

              {/* YOUR CARD COMPONENT */}

              <Cards
                _id={product._id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
                category={product.category}
                isFavourite={product.isFavourite}
              />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}