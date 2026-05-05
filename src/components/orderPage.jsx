import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../function/context";
import { NotificationContext } from "../function/notification";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {showToast} = useContext(NotificationContext);

  const { user } = useContext(CartContext);

  useEffect(() => {
    if (!user?._id) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/order/user/${user._id}`
        );

        setOrders(response.data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  function DateConverter(date) {
    return new Date(date).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const handleCancel = async (orderId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
        status: "cancelled",
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "cancelled" } : o
        )
      );

      showToast("Order Cancelled Successfully","warning")
    } catch (error) {
      console.log(error);
      showToast("Error cancelling order","danger")
    }
  };

  if (!user) {
    return <p className="text-center mt-5">Please login first</p>;
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4 py-3" style={{backgroundColor:"#f8f8f8"}}>
      <h3 className="mb-4 text-warning">My Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 shadow-sm p-3">

            <h5>Personal Info</h5>

            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phoneNo}</p>
            <p><strong>Address:</strong> {order.address}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  order.status === "pending"
                    ? "bg-warning text-dark"
                    : order.status === "processing"
                    ? "bg-info text-dark"
                    : order.status === "shipped"
                    ? "bg-primary"
                    : order.status === "delivered"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {order.status}
              </span>
            </p>

            <p>
              <strong>Date:</strong> {DateConverter(order.createdAt)}
            </p>

            {(order.status === "pending" ||
              order.status === "processing") && (
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleCancel(order._id)}
              >
                Cancel Order
              </button>
            )}

            <hr />

            <h5>Ordered Products</h5>

            <div className="row">
              {order.products.map((item) => (
                <div key={item._id} className="col-md-6 mb-3">
                  <div className="d-flex border p-2 rounded">

                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />

                    <div>
                      <p className="mb-1">
                        <strong>{item.product.name}</strong>
                      </p>

                      <p className="mb-1">
                        Price: ${item.product.price}
                      </p>

                      <p className="mb-0">
                        Qty: {item.quantity}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <h5 className="text-end">
              Total: ${order.totalAmount}
            </h5>

          </div>
        ))
      )}
    </div>
  );
}

export default OrderPage;