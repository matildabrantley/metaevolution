import React, { Suspense } from 'react'
import { useHistory } from "react-router-dom";
import {  Button } from 'react-bootstrap';
import Popout from '../components/Popout';
import SideNav from '../components/Controls';
const PhaserWorld = React.lazy(() => import('../components/PhaserWorld'));




const LabPage = () => {

    const history = useHistory()
    const previous = () => { history.goBack() }

    const controls = () => {
        
    }

    return (
        <div>
            <Button variant="danger" class="clickable" onClick={previous}>Back</Button>
            <SideNav />
                
            <Suspense fallback={<div>Loading...</div>}>
                < PhaserWorld width={600} height={600} worldType="Camerafun"/>
                < PhaserWorld width={200} height={150} worldType="Colorfun"/>
                < PhaserWorld width={400} height={275} worldType="Shaderfun"/>
                < PhaserWorld width={400} height={275} worldType="Lab"/>
            </Suspense>
        </div>
    )
};

export default LabPage;