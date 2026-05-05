import { useContext, useMemo } from "react";
import { CartContext } from "../function/context";

function CartSummary() {
  const { cart, setCart } = useContext(CartContext);

  // 🔥 CALCULATIONS
  const { totalItems, totalPrice } = useMemo(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      const qty = item.quantity || 1;
      const final = item.finalPrice || item.price;

      items += qty;
      price += final * qty;
    });

    return { totalItems: items, totalPrice: price };
  }, [cart]);

  const handleDelete = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  if (cart.length === 0) {
    return (
      <div className="border rounded p-3 bg-white shadow-sm">
        <h5>Your cart is empty</h5>
      </div>
    );
  }

  return (
    <div
      className="border rounded p-3 bg-white shadow-sm"
      style={{ position: "sticky", top: "20px" }}
    >
      <h5 className="mb-3">Order Summary</h5>

      {/* ITEMS */}
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {cart.map((item) => {
          const price = item.finalPrice || item.price;

          return (
            <div
              key={item._id}
              className="d-flex align-items-center mb-2 border-bottom pb-2"
            >
              <img
                src={item.image?.[0]}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain",
                }}
              />

              <div className="ms-2 flex-grow-1">
                <div className="small fw-bold">{item.name}</div>

                <div className="small text-muted">
                  ${price.toFixed(2)} × {item.quantity || 1}
                </div>

                {item.discount > 0 && (
                  <small className="text-success">
                    {item.discount}% OFF
                  </small>
                )}
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="btn btn-sm btn-outline-danger"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <span>Total Items</span>
        <strong>{totalItems}</strong>
      </div>

      <div className="d-flex justify-content-between mt-2">
        <span>Total Price</span>
        <strong>${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default CartSummary;