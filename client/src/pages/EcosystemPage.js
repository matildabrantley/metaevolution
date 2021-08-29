import React, { Suspense } from 'react'
import { useHistory } from "react-router-dom";
import Popout from '../components/Popout';
const PhaserWorld = React.lazy(() => import('../components/PhaserWorld'));


const EcosystemPage = () => {

    const history = useHistory()
    const previous = () => { history.goBack() }

    return (
        <div>
            <Popout>
            <button class="clickable" onClick={previous}>Back</button>
            </Popout>
            <h1>Ecosystem</h1>
                <Suspense fallback={<div>Loading...</div>}>
            < PhaserWorld width={800} height={600} worldType="Ecosystem"/>
            </Suspense>
        </div>
    )
};

export default EcosystemPage;