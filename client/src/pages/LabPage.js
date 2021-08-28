
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
            <button type="button" onClick={goBack}>
                Go back
            </button>
            <h2>Cool</h2>
            < PhaserWorld width={200} height={150} worldType="Colorfun"/>
            < PhaserWorld width={300} height={200} worldType="Colorfun"/>
        </div>
    )
};

export default LabPage;