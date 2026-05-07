import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">
      <Container>
        <Row className="mb-4">
          <Col className="d-flex flex-col gap-3" md={4}>
            <img
              src="https://t3.ftcdn.net/jpg/04/09/86/42/240_F_409864255_VNDyyeVTzSygDSi74jaRG0deCgUoVh4r.jpg"
              alt="Logo"
              width="50"
              height="50"
            />
            <h5 className="fw-bold mt-3">Bullish</h5>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold mt-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light text-decoration-none" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h6 className="fw-bold">Contact</h6>
            <p className="text-white mb-1">Email: example@gmail.com</p>
            <p className="text-white">Phone: +92 300 0000000</p>
          </Col>
        </Row>

        <hr className="border-secondary" />

        {/* Bottom section */}
        <div className="text-center text-muted">
          © {new Date().getFullYear()} My Website. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;