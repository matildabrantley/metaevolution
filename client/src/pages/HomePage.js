import React, { Suspense } from 'react'
import { useHistory } from "react-router-dom";
import { Figure, Image, Caption } from 'react-bootstrap';
import Popout from '../components/Popout';
import { Button } from 'react-bootstrap';
import SideNav from '../components/Controls';




const LabPage = () => {

    const history = useHistory()
    const previous = () => { history.goBack() }

    const controls = () => {
        
    }

    return (
        <div>
            <Button variant="danger" class="clickable" onClick={previous}>Back</Button>
            <SideNav />
                <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={image}
                    roundedCircle
                />
                <Figure.Caption>
                    Lab
                </Figure.Caption>
                </Figure>
            <Suspense fallback={<div>Loading...</div>}>
                < PhaserWorld width={600} height={600} worldType="Camerafun"/>
                < PhaserWorld width={200} height={150} worldType="Colorfun"/>
                < PhaserWorld width={400} height={275} worldType="Shaderfun"/>
            </Suspense>
        </div>
    )
};

export default LabPage;