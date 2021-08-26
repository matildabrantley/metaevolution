import React from "react";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
    return(
            <Navbar bg="light" expand="lg" className="navig">
            <Container>
                <Navbar.Brand href="#home">Meta-Evolution Lab</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link eventKey='register'>Register</Nav.Link>
                    <NavDropdown title="Other Links" id="basic-nav-dropdown">
                    <NavDropdown.Item href="https://matildabrantley.github.io/learning-rooms/">Learing Rooms</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="https://github.com/matildabrantley">My GitHub</NavDropdown.Item>
                    <NavDropdown.Item href="https://matildabrantley.github.io/portfolio/">Portfolio</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    )
}

export default Navigation;