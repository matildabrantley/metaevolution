import React, { Suspense } from 'react'
import { useHistory } from "react-router-dom";
// import Flipout from '../components/Flipout';
import { Button } from 'react-bootstrap';
const PhaserWorld = React.lazy(() => import('../components/PhaserWorld'));


const GamePage = () => {

    const history = useHistory();
    const previous = () => { history.goBack() }

    return (
        <div>
            <Button variant="danger" className="clickable" onClick={previous}>Back</Button>
            <h1 className="clickable">Game</h1>
            <Suspense fallback={<div>Loading...</div>}>
                {/* < PhaserWorld width={800} height={600} worldType="Game"/> */}
                < PhaserWorld width={800} height={500} worldType="Shaderfun"/>
                < PhaserWorld width={800} height={600} worldType="Helix"/>
                < PhaserWorld width={200} height={150} worldType="Colorfun"/>
            </Suspense>
        </div>
    )
};

export default GamePage;