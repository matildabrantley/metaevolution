
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PhaserWorld from '../components/PhaserWorld';

const EcosystemPage = () => {

    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }

    return (
        <div>
            <button type="button" onClick={goBack}>
                Go back
            </button>
            <h1>Ecosystem</h1>
            < PhaserWorld width={800} height={600} worldType="Ecosystem"/>
        </div>
    )
};

export default EcosystemPage;