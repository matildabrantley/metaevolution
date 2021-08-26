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
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="https://github.com/matildabrantley">GitHub</Nav.Link>
                    <NavDropdown title="Other Links" id="basic-nav-dropdown">
                    <NavDropdown.Item href="https://matildabrantley.github.io/learning-rooms/">Learing Rooms</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Link 2</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    )
}

export default Navigation;