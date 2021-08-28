import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Modal, Tab, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './RegisterForms';
import { Link } from 'react-router-dom';



const Navigation = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
    return(
            <Navbar bg="light" expand="lg" className="navig">
            <Container>
                <Navbar.Brand href="#home">Meta-Evolution Lab</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link as={Link} to='/lab'>Lab</Nav.Link>
                <Nav.Link as={Link} to='/ecosystem'>Ecosystem</Nav.Link>
                <Nav className="me-auto">
                    <NavDropdown title="Links" id="basic-nav-dropdown">
                    <NavDropdown.Item href="https://matildabrantley.github.io/learning-rooms/">Learing Rooms</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="https://github.com/matildabrantley">My GitHub</NavDropdown.Item>
                    <NavDropdown.Item href="https://matildabrantley.github.io/portfolio/">Portfolio</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
                <>
                <div className="clickable" onClick={handleShowLogin}>
                    Login
                </div>
                <div className="clickable" onClick={handleShowRegister}>
                    Register
                </div>

                <Modal show={showLogin} onHide={handleCloseLogin}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterForm handleModalClose={() => setShowLogin(false)} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showRegister} onHide={handleCloseRegister}>
                    <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterForm handleModalClose={() => setShowRegister(false)} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRegister}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
            </Container>
            </Navbar>
    )
}

export default Navigation;