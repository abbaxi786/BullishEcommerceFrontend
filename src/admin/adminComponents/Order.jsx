import React from "react";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Tooltip } from "bootstrap";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);

  
  React.useEffect(() => {
    async function GetOrders() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order`);

        setOrders(response.data.data || []);
      } catch (error) {
        console.log(error);
        setOrders([]);
      }
    }

    GetOrders();
  }, []);

 
  function OrderData(orderItem) {
    navigate("/vieworder", { state: { order: orderItem } });
  }

  
  React.useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach(
      (el) => new Tooltip(el)
    );
  }, [orders]);

 
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Karachi",
    }).format(new Date(date));
  }

  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (diff < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hrs ago`;
    if (days < 30) return `${days} days ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(days / 365);
    return `${years} years ago`;
  }

 
  function getStatusClass(status) {
    switch (status) {
      case "pending":
        return "bg-warning text-dark";
      case "processing":
        return "bg-info text-dark";
      case "shipped":
        return "bg-primary";
      case "delivered":
        return "bg-success";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-3 text-warning fw-bolder">
        Orders
      </h2>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >

        <table className="table table-bordered align-middle mb-0">

          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr className="text-warning">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Order Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>

                  <td>{index + 1}</td>

                  <td>
                    {order.name}

                    {order.user && (
                      <span
                        className="badge bg-success ms-2"
                        data-bs-toggle="tooltip"
                        title="Registered user"
                      >
                        User
                      </span>
                    )}
                  </td>

                  <td>{order.email}</td>
                  <td>{order.phoneNo}</td>

                  <td>
                    <span
                      className={`badge fs-6 ${getStatusClass(order.status)}`}
                      data-bs-toggle="tooltip"
                      title={`Current status: ${order.status}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* TIME */}
                  <td
                    style={{ cursor: "pointer", maxWidth: "180px" }}
                    className="text-truncate"
                    data-bs-toggle="tooltip"
                    title={formatDate(order.createdAt)}
                  >
                    {timeAgo(order.createdAt)}
                  </td>

                  <td>
                    <button
                      className="btn btn-primary rounded-3"
                      onClick={() => OrderData(order)}
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Order;