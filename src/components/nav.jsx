import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import SideCart from "../pages/cart";
import { CiSearch } from "react-icons/ci";
import { CartContext } from "../function/context";
import { useContext, useState } from "react";

function NavBar() {

  const { user } = useContext(CartContext);

  // 🔥 CONTROL NAV STATE
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar
      bg="light"
      expand="lg"
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
      className="shadow-sm sticky-top"
    >

      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
          onClick={closeNavbar}
        >
          <img
            src="https://t3.ftcdn.net/jpg/04/09/86/42/240_F_409864255_VNDyyeVTzSygDSi74jaRG0deCgUoVh4r.jpg"
            alt="Logo"
            width="45"
            height="45"
          />
          <span className="fw-bold text-warning">Bullish</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="main-navbar">

          <Nav className="ms-auto align-items-lg-center gap-2 py-2 py-lg-0">

            <Nav.Link as={Link} to="/" onClick={closeNavbar}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" onClick={closeNavbar}>
              About Us
            </Nav.Link>

            <Nav.Link as={Link} to="/blog" onClick={closeNavbar}>
              Blogs
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" onClick={closeNavbar}>
              Contact Us
            </Nav.Link>

            <NavDropdown
              title="Account"
              id="account-dropdown"
              align="end"
              className="py-2"
            >
              <NavDropdown.Item as={Link} to="/profile" onClick={closeNavbar}>
                Profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/login" onClick={closeNavbar}>
                Login
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/signup" onClick={closeNavbar}>
                Sign Up
              </NavDropdown.Item>

              {user && (
                <NavDropdown.Item as={Link} to="/setting" onClick={closeNavbar}>
                  Setting
                </NavDropdown.Item>
              )}
            </NavDropdown>

            {/* ================= SEARCH ================= */}

            <Link
              to="/search"
              className="btn btn-warning d-flex align-items-center justify-content-center py-2 px-3"
              onClick={closeNavbar}   // 🔥 CLOSE NAV ON CLICK
            >
              <CiSearch className="text-white fs-5" />
            </Link>

            {/* ================= CART ================= */}

            <div
              className="d-flex align-items-center py-2"
              onClick={closeNavbar}   // 🔥 CLOSE NAV ON CLICK
            >
              <SideCart placement="end" name="end" />
            </div>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}

export default NavBar;