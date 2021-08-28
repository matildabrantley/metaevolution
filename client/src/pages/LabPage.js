
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PhaserWorld from '../components/PhaserWorld';

const LabPage = () => {

    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }

    return (
        <div>
            <button class="clickable" onClick={goBack}>
                Go back
            </button>
            <h1>Lab</h1>
            < PhaserWorld width={200} height={150} worldType="Colorfun"/>
            < PhaserWorld width={300} height={200} worldType="Colorfun"/>
            < PhaserWorld width={400} height={275} worldType="Shaderfun"/>
        </div>
    )
};

export default LabPage;