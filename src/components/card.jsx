import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaEye, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../function/context';
import { NotificationContext } from '../function/notification';

function Cards({ image, name, description, price, _id, isFavourite }) {

  const { user } = useContext(CartContext);
  const { showToast } = useContext(NotificationContext);

  const [fav, setFav] = useState(isFavourite);

  // Truncate title function
  const truncateTitle = (title) => {
    if (!title) return "Card Title";

    const words = title.split(" ");

    // Truncate if more than 4 words
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }

    // Truncate if any word length is greater than 12
    if (words.some(word => word.length > 12)) {
      return title.substring(0, 20) + "...";
    }

    return title;
  };

  const handleFavourite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      showToast('Login Required', "danger");
      return;
    }

    try {
      setFav(prev => !prev);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/favourite/toggle`,
        {
          productId: _id,
          userId: user._id
        }
      );

    } catch (error) {
      console.log(error);

      // rollback UI if request fails
      setFav(prev => !prev);
    }
  };

  return (
    <Card
      style={{ width: '18rem' }}
      className="h-100 shadow-sm sizeUp position-relative"
    >

      {/* Favourite Icon */}
      <div
        onClick={handleFavourite}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          fontSize: "20px",
          color: fav ? "red" : "gray",
          zIndex: 10
        }}
      >
        <FaHeart />
      </div>

      {/* Product Image */}
      <Link to={`/product/${_id}`}>
        <Card.Img
          variant="top"
          src={
            image?.[0] ||
            "https://via.placeholder.com/300x300?text=No+Image"
          }
          alt={name || "Product Image"}
          style={{
            height: '250px',
            width: '100%',
            objectFit: 'contain',
            padding: '10px',
            backgroundColor: '#f8f9fa'
          }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">

        {/* Product Title */}
        <Link
          className='text-decoration-none text-black'
          to={`/product/${_id}`}
        >
          <Card.Title
            className="fs-5 piece"
            style={{
              minHeight: "50px",
              overflow: "hidden"
            }}
          >
            {truncateTitle(name)}
          </Card.Title>
        </Link>

        {/* Product Description */}
        <Card.Text
          className="text-muted"
          style={{ minHeight: "60px" }}
        >
          <span
            className="d-inline-block text-truncate"
            style={{
              maxWidth: "150px",
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {description || "Product description"}
          </span>
        </Card.Text>

        {/* Price + Button */}
        <div className="d-flex justify-content-between align-items-center mt-auto">

          <span className="h5 mb-0">
            ${price ? price.toFixed(2) : "0.00"}
          </span>

          <Link
            to={`/product/${_id}`}
            className="btn btn-warning d-flex align-items-center gap-2"
          >
            <FaEye />
            View
          </Link>

        </div>

      </Card.Body>
    </Card>
  );
}

export default Cards;