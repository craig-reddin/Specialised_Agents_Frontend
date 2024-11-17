import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigation() {
  return (
    //Use bootsraps Navbar, Container, Nav components
    // https://react-bootstrap.netlify.app/docs/components/navbar/
    <Navbar expand="lg" className="bg-body-tertiary">
      
        <Navbar.Brand href="/home_page">AIColabGen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home_page">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/chat_interface">
              Chat
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default Navigation;
