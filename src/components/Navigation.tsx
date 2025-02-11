import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AILogo from "../images/AIColabGen.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../services/AuthContext";

function Navigation() {
  const { logout: auth0Logout, isAuthenticated } = useAuth0();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    auth0Logout({ returnTo: window.location.origin } as any); // This will log out and redirect to the homepage
    // After logout, isAuthenticated will be automatically set to false.
  };
  return (
    <Navbar expand="lg" className="" id="navbar-top">
      <Navbar.Brand id="logo-text" href="/">
        <img src={AILogo} width="150" height="150" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="basic-navbar-nav-collapse"
      >
        <Nav className="me-auto" id="navy">
          {isAuthenticated ? (
            <>
              <Nav.Link id="navlink" as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link id="navlink" onClick={handleLogout} as={Link} to="/">
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link id="navlink" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link id="navlink" as={Link} to="/chat_interface">
                Chat
              </Nav.Link>
              <Nav.Link id="navlink" as={Link} to="/sign_in">
                Sign In
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
