import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../function/notification';
function SignIn() {

  const { showToast } = useContext(NotificationContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageLink: '',   
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
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        showToast("All fields are required", 'danger')

        return;
      }

      if (formData.password !== formData.confirmPassword) {
        showToast("Passwords do not match", 'danger')
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signIn`,
        formData
      );
      if (response.data.success) {
        showToast("Account created successfully", "success");
        navigate('/login');
      }


      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        remember: false,
      });

    } catch (error) {
      console.error("Backend error:", error);
    }
  };

  return (
    <div className="container d-flex m-5 justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "380px" }}>

        <h3 className="text-center text-warning mb-4">Sign Up</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label text-warning">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-warning">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-warning">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-warning">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>
          <div className="mb-3">
            <label className="form-label text-warning">Profile Image URL</label>
            <input
              type="text"
              name="imageLink"
              className="form-control"
              placeholder="Paste image URL"
              value={formData.imageLink}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default SignIn;