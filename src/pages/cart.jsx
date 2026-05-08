import { useState, useContext, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaCartPlus, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { CartContext } from "../function/context";
import { Link } from "react-router-dom";

function SideCart({ placement = "end", ...props }) {
  const [show, setShow] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const notify = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity || 1), 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce((total, item) => {
        const price =
          item.finalPrice !== undefined
            ? item.finalPrice
            : item.price;

        return total + price * (item.quantity || 1);
      }, 0),
    [cart]
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== id)
    );
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) - 1),
            }
          : item
      )
    );
  };

  return (
    <>
      <Button
        variant="warning"
        onClick={handleShow}
        className="position-relative text-white"
      >
        <FaCartPlus size={20} />

        {notify > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notify}
          </span>
        )}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement={placement} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Bucket</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column p-0">

          <div className="flex-grow-1 overflow-auto p-3">

            {cart.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded"
                >

                  {/* IMAGE FIX */}
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={
                        item.image?.[0] ||
                        item.product?.image?.[0] ||
                        "https://via.placeholder.com/60"
                      }
                      alt={item.name}
                      width="60"
                      height="60"
                      className="rounded"
                      style={{ objectFit: "cover" }}
                    />

                    <div>
                      <h6 className="mb-1">{item.name}</h6>

                      {item.discount > 0 ? (
                        <>
                          <small className="text-muted text-decoration-line-through d-block">
                            ${item.price}
                          </small>

                          <small className="text-danger fw-bold">
                            ${item.finalPrice?.toFixed(2)}
                          </small>
                        </>
                      ) : (
                        <small className="text-muted">
                          ${item.price.toFixed(2)}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      <FaMinus />
                    </Button>

                    <span className="fw-bold">{item.quantity}</span>

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      <FaPlus />
                    </Button>
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item._id)}
                    className="mx-2"
                  >
                    <FaTrash />
                  </Button>

                </div>
              ))
            )}

          </div>

          {cart.length > 0 && (
            <div className="border-top p-3 bg-light">

              <div className="d-flex justify-content-between mb-2">
                <strong>Total:</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>

              <Button
                as={Link}
                to="/checkout"
                variant="warning"
                onClick={()=>{handleClose()}}
                className="w-100 text-white"
              >
                Proceed to Checkout
              </Button>

            </div>
          )}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideCart;