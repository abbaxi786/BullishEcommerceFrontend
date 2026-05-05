import { Link } from "react-router-dom";
import CartCard from "./cartcard";
import { useContext } from "react";
import { CartContext } from "../function/context";

function CartCardCollection() {
  const { cart } = useContext(CartContext);

  return cart.length === 0 ? (
    <div className="text-center mt-5 my-5">
      <h3>Your cart is empty</h3>
      <Link to="/" className="btn btn-primary mt-3">
        Start Shopping
      </Link>
    </div>
  ) : (
    <div className="mb-5 my-5">
      <h2 className="mb-4 text-center">Cart Items</h2>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {cart.map((card) => (
          <CartCard key={card._id} {...card} />
        ))}
      </div>
    </div>
  );
}

export default CartCardCollection;