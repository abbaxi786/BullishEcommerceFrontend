import React, { useContext, useEffect, useState } from 'react';
import Cards from './card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../function/context';

function CardCollection({ id }) {

  const { user } = useContext(CartContext);

  const [cards, setCards] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    async function getData() {
      try {
        setLoading(true);

        const productRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/${id}`,
          {
            params: {
              userId: user?._id
            }
          }
        );

        setCards(productRes?.data?.data || []);

        const categoryRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/category`
        );

        const category = categoryRes?.data?.data?.find(
          (cat) => cat._id === id
        );

        setCategoryName(category?.name || "Category");

      } catch (error) {
        console.log("Error:", error.message);
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getData();
    }

  }, [id, user]);

  return (
    <div className="mb-5">

      <h2 className="mb-4 text-center fw-light">
        {categoryName}
      </h2>

      {loading && (
        <div className="text-center">
          <p>Loading products...</p>
        </div>
      )}

      {!loading && (
        <div className="d-flex flex-wrap justify-content-center gap-3">

          {cards.length > 0 ? (
            cards.slice(0, 3).map((card) => (
              <Cards
                key={card._id}
                {...card} // includes isFavourite
              />
            ))
          ) : (
            <p className="text-muted">No products found</p>
          )}

        </div>
      )}

      {/* 🔥 MORE BUTTON */}
      {!loading && cards.length > 0 && (
        <div className="text-center mt-4">
          <Link
            to={`/category/${id}`}
            className="btn btn-outline-warning px-4"
            style={{ borderRadius: "100px" }}
          >
            View More
          </Link>
        </div>
      )}

    </div>
  );
}

export default CardCollection;