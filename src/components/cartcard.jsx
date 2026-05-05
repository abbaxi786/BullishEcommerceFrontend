import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { CartContext } from "../function/context";

function CartCard({
  image,
  name,
  price,
  finalPrice,
  discount,
  quantity,
  _id,
}) {
  const { setCart } = useContext(CartContext);

  function handleDelete() {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== _id)
    );
  }

  return (
    <Card style={{ width: "10rem" }} className="h-100 shadow-sm sizeUp">

      {/* IMAGE */}
      <Card.Img
        variant="top"
        src={image?.[0] || "https://via.placeholder.com/300x300?text=No+Image"}
        alt={name || "Product Image"}
        style={{
          height: "100px",
          width: "100%",
          objectFit: "contain",
          padding: "10px",
          backgroundColor: "#f8f9fa",
        }}
      />

      <Card.Body className="d-flex flex-column">

        {/* NAME */}
        <Card.Title className="fs-6">
          {name}
        </Card.Title>

        {/* PRICE SECTION */}
        {discount > 0 && finalPrice ? (
          <>
            <span className="text-muted text-decoration-line-through">
              ${price.toFixed(2)}
            </span>

            <span className="h6 text-danger mb-0">
              ${finalPrice.toFixed(2)}
            </span>

            <small className="badge bg-warning text-dark mt-1">
              {discount}% OFF
            </small>
          </>
        ) : (
          <span className="h6 mb-0">
            ${price?.toFixed(2) || "0.00"}
          </span>
        )}

        {/* QUANTITY */}
        {quantity && (
          <small className="text-muted mt-1">
            Qty: {quantity}
          </small>
        )}

        {/* DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="btn btn-danger mt-2"
        >
          DELETE
        </button>

      </Card.Body>

    </Card>
  );
}

export default CartCard;