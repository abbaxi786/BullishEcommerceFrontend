import { CartContext } from "../function/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

  const { setUser } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;