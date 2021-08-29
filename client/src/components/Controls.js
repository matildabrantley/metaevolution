import React, { useState, useEffect } from 'react'
import Popout from './Popout';
import { Button, Offcanvas } from 'react-bootstrap';


const Controls = () => {
    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);
    
    return (
        <div>
            <Button variant="dark" onClick={handleShow}>
                Controls
            </Button>
            <Offcanvas show={show} onHide={handleHide}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Hey there, I'm over here on the side!
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
};

export default Controls;