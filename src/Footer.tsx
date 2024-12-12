import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
function Footer() {
  return (
    // Reference: https://react-bootstrap.netlify.app/docs/components/navbar/
    <Navbar expand="lg" className="" id="navbar-bottom">
      {/* Adds a toggle button for smaller screens */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Wraps the nav links and makes nav collapse on small screens */}

      {/* Nav component contains the navigation links */}
      <Nav className="me-auto" id="navy">
        {/* Makes a link to the homepage using react routers */}
        <Nav.Link id="navlink" as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link id="navlink" as={Link} to="/chat_interface">
          Chat
        </Nav.Link>
        <Nav.Link id="navlink" as={Link} to="/sign_in">
          Sign In
        </Nav.Link>
        <Nav.Link id="navlink" as={Link} to="/previous_chat">
          Previous Chat
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;
