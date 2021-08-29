
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PhaserWorld from '../components/PhaserWorld';
import Popout from '../components/Popout';


const GamePage = () => {

    const history = useHistory();
    const previous = () => { history.goBack() }

    return (
        <div>
            <Popout>
            <button class="clickable" onClick={previous}>Back</button>
            </Popout>
            <h1>Game</h1>
            < PhaserWorld width={800} height={600} worldType="Game"/>
        </div>
    )
};

export default GamePage;