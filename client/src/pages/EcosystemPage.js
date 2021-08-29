
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PhaserWorld from '../components/PhaserWorld';
import Popout from '../components/Popout';


const EcosystemPage = () => {

    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }

    return (
        <div>
            <Popout>
            <button class="clickable" onClick={goBack}>
                Go back
            </button>
            </Popout>
            <h1>Ecosystem</h1>
            < PhaserWorld width={800} height={600} worldType="Ecosystem"/>
        </div>
    )
};

export default EcosystemPage;