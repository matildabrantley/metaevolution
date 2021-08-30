import React, { useState, useEffect } from 'react'
import Popout from './Popout';
// import { Button } from 'react-bootstrap';
import { Button } from '@material-ui/core';


const Controls = () => {
    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);
    
    return (
        <div>
            <Button onClick={handleShow}>
                Controls
            </Button>
        </div>
    )
};

export default Controls;