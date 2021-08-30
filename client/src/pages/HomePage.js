import React, { Suspense } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Card, Figure, Image, Caption } from 'react-bootstrap';
import Popout from '../components/Popout';
import { Button } from 'react-bootstrap';
import SideNav from '../components/Controls';
import ecoImage from '../assets/ecopage.png';
import image from '../assets/ecopage.png';





const HomePage = () => {

    const history = useHistory()
    const previous = () => { history.goBack() }

    const controls = () => {
        
    }

    return (
        <div>
            <Button variant="danger" class="clickable" onClick={previous}>Back</Button>
            <h1>Welcome</h1>
            <Card
                bg="dark"
                text="light"
                style={{ width: '15rem' }}
                className="mb-2 pageCard"
            >
                <Card.Header>Ecosystem</Card.Header>
                <Card.Body>
                <Popout>
                        <Link as={Link} to='/ecosystem'>
                            <Figure.Image
                                width={171}
                                height={380}
                                alt="171x180"
                                src={ecoImage}
                                roundedCircle
                                />
                        </Link>
                    </Popout>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>

                <Figure class="pageCard">
                    <Popout>
                        <Link as={Link} to='/ecosystem'>
                            <Figure.Image
                                style={{ width: '18rem' }}
                                alt="171x180"
                                src={ecoImage}
                                roundedCircle
                                />
                        </Link>
                    </Popout>
                    <Figure.Caption>
                        Ecosystem
                    </Figure.Caption>
                </Figure>
                <Figure class="pageCard">
                    <Popout>
                        <Link as={Link} to='/lab'>
                            <Figure.Image
                                width={171}
                                height={380}
                                alt="171x180"
                                src={image}
                                roundedCircle
                                />
                        </Link>
                    </Popout>
                    <Figure.Caption variant="light">
                        Lab
                    </Figure.Caption>
                </Figure>
                <Figure class="pageCard">
                    <Popout>
                        <Link as={Link} to='/game'>
                            <Figure.Image
                                width={171}
                                height={380}
                                alt="171x180"
                                src={image}
                                roundedCircle
                                />
                        </Link>
                    </Popout>
                    <Figure.Caption>
                        Game
                    </Figure.Caption>
                </Figure>
            {/* <Suspense fallback={<div>Loading...</div>}>
                < PhaserWorld width={600} height={600} worldType="Camerafun"/>
                < PhaserWorld width={200} height={150} worldType="Colorfun"/>
                < PhaserWorld width={400} height={275} worldType="Shaderfun"/>
            </Suspense> */}
        </div>
    )
};

export default HomePage;