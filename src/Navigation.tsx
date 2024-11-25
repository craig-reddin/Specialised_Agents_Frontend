import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AILogo from "./AIColabGen.png";

function Navigation() {
  return (
    // Reference: https://react-bootstrap.netlify.app/docs/components/navbar/
    <Navbar expand="lg" className="" id="navbar-top">
      {/* Displays the logo and links to the homepage */}
      <Navbar.Brand id="logo-text" href="/">
        {/* Image added to Navbar */}
        <img src={AILogo} width="75" height="75" alt="Logo" />
      </Navbar.Brand>

      {/* Adds a toggle button for smaller screens */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Wraps the nav links and makes nav collapse on small screens */}
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="basic-navbar-nav-collapse"
      >
        {/* Nav component contains the navigation links */}
        <Nav className="me-auto" id="navy">
          {/* Makes a link to the homepage using react routers */}
          <Nav.Link id="navlink" as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link id="navlink" as={Link} to="/chat_interface">
            Chat
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
