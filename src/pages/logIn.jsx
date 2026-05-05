import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../function/context';
import { NotificationContext } from '../function/notification';




function Login() {

  const {setUser}= useContext(CartContext);
  const {showToast}= useContext(NotificationContext)



  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.identifier || !formData.password) {
        showToast("All fields are required","danger")
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          identifier: formData.identifier,
          password: formData.password
        }
      );  

      setUser(response.data.data);
      
      if (formData.remember) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      } else {
        sessionStorage.setItem("user", JSON.stringify(response.data.data));
      }

      if (response.data.success) {
        setFormData({
          identifier: '',
          password: '',
          remember: false,
        });
        navigate('/');
      }

    }catch(error) {
      console.error("Login error:", error.response?.data || error.message);

      showToast(`${error.response?.data?.message || "Login failed"}`,"danger")
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "380px" }}>

        <h3 className="text-center mb-4 text-warning fw-bolder">Login</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label text-warning">Username or Email</label>
            <input
              type="text"
              name="identifier"
              className="form-control"
              placeholder="Enter username or email"
              value={formData.identifier}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-warning">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label className="form-check-label">Remember me</label>
            </div>

            <Link to={'/forgotpassword'} className="text-warning">
              Forgot?
            </Link>
          </div>

          <button type="submit" className="btn btn-warning text-white fw-bolder w-100">
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            Don't have an account? <Link to={"/signup"} className='text-warning'>Sign up</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;