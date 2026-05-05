import { useContext, useState } from "react";
import { CartContext } from "../function/context";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Logout from "../components/logout";

function Profile() {
  const { user, setUser } = useContext(CartContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // 🔥 loader state

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpload = async () => {
    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", user._id);

    try {
      setLoading(true); // 🔥 start loader

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData
      );

      setUser({ ...user, imageLink: res.data.url });
      setShow(false);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false); // 🔥 stop loader
    }
  };

  if (!user) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
        <h3>No user found. Please login.</h3>
        <Button variant="dark" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">

      <Card
        className="shadow border-0"
        style={{ width: "400px", borderRadius: "15px" }}
      >

        <div className="text-center mt-4">
          <img
            src={
              user.imageLink
                ? user.imageLink
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
            }
            alt="profile"
            className="rounded-circle shadow-sm"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              border: "3px solid #ddd",
              cursor: "pointer"
            }}
            onClick={handleShow}
          />
        </div>

        <div className="text-center mt-2">
          <Button variant="outline-primary" size="sm" onClick={handleShow}>
            Update Image
          </Button>
        </div>

        <div className="text-center mt-3">
          <h4 className="fw-bold">{user.username}</h4>
        </div>

        <Card.Body>
          <div className="mb-2">
            <strong>Email:</strong>
            <div className="text-muted">{user.email}</div>
          </div>

          <div className="mb-2">
            <strong>User ID:</strong>
            <div className="text-muted small">{user._id}</div>
          </div>

          <div className="mb-3">
            <strong>Joined:</strong>
            <div className="text-muted">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-dark"
              className="w-50"
              onClick={() => navigate("/")}
            >
              Home
            </Button>

            <div className="w-50">
              <Logout />
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;