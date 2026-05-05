import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../function/context";
import { useNavigate } from "react-router-dom";

function FavouritePage() {
  const { user } = useContext(CartContext);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;
    fetchFavourites();
  }, [user]);

  const fetchFavourites = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/favourite/${user._id}`
      );
      setFavourites(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (productId, e) => {
    e.stopPropagation(); // prevent card click

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/favourite/toggle`,
        {
          productId,
          userId: user._id,
        }
      );

      if (res.data.removed) {
        setFavourites((prev) =>
          prev.filter((item) => item.productId._id !== productId)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!favourites.length) {
    return <h5 className="text-center mt-4">No favourite items</h5>;
  }

  return (
    <div className="container mt-3 rounded min-vh-100 py-3" style={{backgroundColor:"#f8f8f8"}}>
      <div className="row">
        {favourites.map((item) => {
          const product = item.productId;

          return (
            <div key={item._id} className="col-6 col-md-4 col-lg-3 mb-3">
              <div
                className="card h-100 position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${product._id}`)} // 🔥 redirect
              >

                {/* 🔥 Delete Button */}
                <button
                  onClick={(e) => handleDelete(product._id, e)}
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                >
                  Delete
                </button>

                <img
                  src={product?.image}
                  className="card-img-top"
                  alt={product?.name}
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h6 className="card-title">{product?.name}</h6>
                  <p className="card-text">Rs {product?.price}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavouritePage;