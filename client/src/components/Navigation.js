import React from "react";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './RegisterForm';



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
                <>
                <Button variant="primary" onClick={handleShow}>
                    Register
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterForm handleModalClose={() => setShowModal(false)} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Filler Button
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
            </Container>
            </Navbar>
    )
}

export default Navigation;