import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function OrderView() {
  const location = useLocation();

  let order = location.state?.order;
  if (order) {
    sessionStorage.setItem("orderItem", JSON.stringify(order));
  } else {
    const stored = sessionStorage.getItem("orderItem");
    order = stored ? JSON.parse(stored) : null;
  }

  if (!order) {
    return (
      <h3 className="text-center mt-5 text-danger">
        No Order Data Found
      </h3>
    );
  }

  const [status, setStatus] = useState(order.status);

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/order/${order._id}`,
        { status }
      );

      alert("Status Updated!");
    } catch (error) {
      console.log(error);
      alert("Error updating status");
    }
  };

  const localDate = new Date(order.createdAt).toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
  });

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-warning">Order Details</h2>

        <Link className="btn btn-warning text-white" to="/adminpanel">
          Back to Panel
        </Link>
      </div>

      <div className="alert alert-warning shadow-sm">
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Phone:</strong> {order.phoneNo}</p>
        <p><strong>Time:</strong> {localDate}</p>
        <p><strong>Address:</strong> {order.address}</p>
      </div>

      <div className="mb-3">
        <span className={`badge fs-6 ${
          status === "pending"
            ? "bg-warning text-dark"
            : status === "processing"
            ? "bg-info text-dark"
            : status === "shipped"
            ? "bg-primary"
            : status === "delivered"
            ? "bg-success"
            : "bg-danger"
        }`}>
          {status}
        </span>
      </div>

      <div className="mb-4 d-flex gap-2">
        <select
          className="form-select w-auto"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {["pending", "processing", "shipped", "delivered", "cancelled"].map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
        </select>

        <button className="btn btn-primary" onClick={handleUpdate}>
          Update Status
        </button>
      </div>

      <h4 className="mt-4">Products</h4>

      {order.products?.map((p) => {
        const total = (p.priceAtPurchase || 0) * (p.quantity || 1);

        return (
          <div key={p._id} className="card mb-3 shadow-sm">
            <div className="card-body">

              <h5 className="card-title text-warning">
                {p.product?.name}
              </h5>

              {/* ORIGINAL PRICE */}
              <p className="mb-1">
                Original Price: <strong>${p.product?.price}</strong>
              </p>

              {/* DISCOUNT */}
              <p className="mb-1 text-success">
                Discount: <strong>{p.discount || 0}%</strong>
              </p>

              {/* FINAL PRICE PER UNIT */}
              <p className="mb-1">
                Price After Discount:{" "}
                <strong>${p.priceAtPurchase}</strong>
              </p>

              {/* QUANTITY */}
              <p className="mb-1">
                Quantity: <strong>{p.quantity}</strong>
              </p>

              {/* TOTAL */}
              <div className="alert alert-warning py-2 mb-0">
                Total: <strong>${total}</strong>
              </div>

            </div>
          </div>
        );
      })}

      {/* ORDER TOTAL */}
      <div className="alert alert-warning mt-4 d-flex justify-content-between">
        <strong>Total Amount:</strong>
        <strong>${order.totalAmount}</strong>
      </div>

    </div>
  );
}

export default OrderView;