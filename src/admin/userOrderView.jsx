import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/order/user/${userId}`
        );
        setOrders(response.data.data || []);
      } catch (error) {
        console.log(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  function DateConverter(date) {
    return new Date(date).toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-warning">Client Orders</h3>

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
              <span className="badge bg-warning text-dark">
                {order.status}
              </span>
            </p>

            <p>
              <strong>Date:</strong> {DateConverter(order.createdAt)}
            </p>

            <hr />

            <h5>Ordered Products</h5>

            <div className="row">
              {order.products.map((item) => (
                <div key={item._id} className="col-md-6 mb-3">
                  <div className="d-flex border p-2 rounded">

                    <img
                      src={
                        item.product?.image?.[0] ||
                        "https://via.placeholder.com/80"
                      }
                      alt={item.product?.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />

                    <div>
                      <p className="mb-1">
                        <strong>{item.product?.name}</strong>
                      </p>

                      {/* ORIGINAL PRICE */}
                      <p className="mb-1 text-muted">
                        Original: ${item.product?.price}
                      </p>

                      <p className="mb-1 text-success">
                        Discount: {item.discount || 0}%
                      </p>

                      <p className="mb-1">
                        Price After Discount: ${item.priceAtPurchase}
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

export default UserOrderPage;