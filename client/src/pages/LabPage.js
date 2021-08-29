
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PhaserWorld from '../components/PhaserWorld';
import { Figure, Image, Caption, Jumbotron } from 'react-bootstrap';
import image from '../assets/star-dna-banner.jpg';


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
            <Jumbotron>
				<h2>Lab</h2>
			</Jumbotron>
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
            < PhaserWorld width={600} height={600} worldType="Camerafun"/>
            < PhaserWorld width={200} height={150} worldType="Colorfun"/>
            < PhaserWorld width={400} height={275} worldType="Shaderfun"/>
        </div>
    )
};

export default LabPage;