import { useState, useContext, useEffect, useMemo } from 'react';
import { CartContext } from '../function/context';
import { NotificationContext } from '../function/notification';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CheckOutForm() {

  const { cart, setCart, user } = useContext(CartContext);
  const { showToast } = useContext(NotificationContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    phoneNo: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormData(prev => ({
        ...prev,
        userName: user.username || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const { totalItems, totalPrice } = useMemo(() => {
    let items = 0;
    let price = 0;

    cart.forEach(item => {
      const qty = item.quantity || 1;
      const final = item.finalPrice || item.price;

      items += qty;
      price += final * qty;
    });

    return { totalItems: items, totalPrice: price };
  }, [cart]);

  const handleDelete = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast("Cart is empty", "warning");
      return;
    }

    const finalName = user?.username || formData.userName;
    const finalEmail = user?.email || formData.email;

    if (!finalName || !finalEmail || !formData.address) {
      showToast("Please fill required fields", "warning");
      return;
    }

    const fullAddress = [
      formData.address,
      formData.address2,
      formData.city,
      formData.state,
      formData.zip
    ].filter(Boolean).join(", ");

    const products = cart.map(item => ({
      product: item._id,
      quantity: item.quantity || 1,
      discount: item.discount || 0
    }));

    const orderData = {
      email: finalEmail,
      guestName: finalName,
      address: fullAddress,
      phoneNo: formData.phoneNo,
      products,
      userId: user?._id || null
    };

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        orderData
      );

      if (response.data.success) {
        setCart([]);

        showToast("Order placed successfully!", "success");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }

    } catch (error) {
      showToast(
        error.response?.data?.message || "Order failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">

      <div className="row">

        <div className="col-lg-4 mb-3 mb-lg-0 order-1 order-lg-2">

          <div
            className="border rounded p-3 bg-white shadow-sm"
            style={{ position: "sticky", top: "20px" }}
          >
            <h5>Order Summary</h5>

            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {cart.map(item => {
                const price = item.finalPrice || item.price;

                return (
                  <div key={item._id} className="d-flex mb-2 border-bottom pb-2">

                    <img
                      src={item.image?.[0]}
                      alt=""
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain"
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
        </div>

        <div className="col-lg-8 order-2 order-lg-1">

          <h2 className="mb-4 text-warning">Checkout</h2>

          <form className="row g-3" onSubmit={handleSubmit}>

            <div className="col-12">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                id="userName"
                className="form-control"
                value={formData.userName}
                onChange={handleChange}
                disabled={user?._id}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                disabled={user?._id}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                id="phoneNo"
                className="form-control"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Address 2</label>
              <input
                type="text"
                id="address2"
                className="form-control"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">City</label>
              <input
                type="text"
                id="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">State</label>
              <select
                id="state"
                className="form-select"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option>Punjab</option>
                <option>Sindh</option>
                <option>KPK</option>
                <option>Federal</option>
                <option>Gilgit Baltistan</option>
                <option>Balochistan</option>
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label">Zip</label>
              <input
                type="text"
                id="zip"
                className="form-control"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default CheckOutForm;