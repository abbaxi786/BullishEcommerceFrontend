import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import SideCart from "../pages/cart";
import { CiSearch } from "react-icons/ci";
import { CartContext } from "../function/context";
import { useContext } from "react";

function NavBar() {
  const { user } = useContext(CartContext);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm sticky-top">

      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src="https://t3.ftcdn.net/jpg/04/09/86/42/240_F_409864255_VNDyyeVTzSygDSi74jaRG0deCgUoVh4r.jpg"
            alt="Logo"
            width="45"
            height="45"
          />
          <span className="fw-bold text-warning">Bullish</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          <Nav className="ms-auto align-items-lg-center gap-2 py-2 py-lg-0">

            <Nav.Link as={Link} to="/" className="fw-semibold py-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold py-2">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className="fw-semibold py-2">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-semibold py-2">
              Contact Us
            </Nav.Link>

            

            <NavDropdown
              title="Account"
              id="account-dropdown"
              align="end"
              className="py-2"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/signup">
                Sign Up
              </NavDropdown.Item>

              {user && (
                <NavDropdown.Item as={Link} to="/setting">
                  Setting
                </NavDropdown.Item>
              )}
            </NavDropdown>

            <Link
              to="/search"
              className="btn btn-warning d-flex align-items-center justify-content-center py-2 px-3"
            >
              <CiSearch className="text-white fs-5" />
            </Link>

            <div className="d-flex align-items-center py-2">
              <SideCart placement="end" name="end" />
            </div>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}

export default NavBar;