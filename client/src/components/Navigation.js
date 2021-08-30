import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Modal, Tab, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import Settings from './Settings';
import { Link } from 'react-router-dom';
import Popout from '../components/Popout';
import J from '../components/Jumpout';




const Navigation = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
    const handleCloseSettings = () => setShowSettings(false);
    const handleShowSettings = () => setShowSettings(true);
    return(
            <Navbar variant="dark" bg="dark" expand="lg" className="navig" back>
            <Container>
                <J><Navbar.Brand href="#home"><h1 className="coolTitle"><J>E</J><J>v</J><J>o</J><J>L</J><J>a</J><J>b</J></h1></Navbar.Brand>
                </J>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Popout><Nav.Link as={Link} to='/ecosystem'><h4 className="ecoLink">Ecosystem</h4></Nav.Link></Popout>
                <Popout><Nav.Link as={Link} to='/lab'><h4 className="labLink">Lab</h4></Nav.Link></Popout>
                <Popout><Nav.Link as={Link} to='/game'><h4 className="gameLink">Game</h4></Nav.Link></Popout>
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
                <Popout>
                    <Button variant="danger" className="clickable" onClick={handleShowLogin}>
                        Login
                    </Button>
                </Popout>
                <Popout>
                <Button variant="danger" className="clickable" onClick={handleShowRegister}>
                    Register
                </Button>
                </Popout>
                <Popout>
                <Button variant="danger" className="clickable" onClick={handleShowSettings}>
                    Setting
                </Button>
                </Popout>

                <Modal show={showSettings} onHide={handleCloseSettings}>
                    <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Settings handleModalClose={() => setShowSettings(false)} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSettings}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showLogin} onHide={handleCloseLogin}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Login handleModalClose={() => setShowLogin(false)} />
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
                        <Register handleModalClose={() => setShowRegister(false)} />
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