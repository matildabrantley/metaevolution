import React, { Suspense } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Card, Figure, Image, Caption } from 'react-bootstrap';
import Popout from '../components/Popout';
import { Button } from 'react-bootstrap';
import SideNav from '../components/Controls';
import labImage from '../assets/labpage.png';
import ecoImage from '../assets/ecopage.png';
import image from '../assets/ecopage.png';
import Glide from '../components/Glide';
import { Grid } from '@material-ui/core';






const HomePage = () => {
    const controls = () => {
        
    }

    return (
            // <div>
            // </div>
            
            <div>
            <h1 className="homeTitle welcome" style={{paddingRight:'40px', margin:'10px', textEmphasis: 'bold'}}>
                <Glide>
                <Glide>
                    <>Welcome</><> to</><> EvoLab. </>
                </Glide>
                <Glide>
                    <>Build</><> neural</><> networks. </>
                    </Glide>
                    <Glide>
                    <>Watch</><> intelligent</><> beings</><> evolve. </>
                    </Glide>
                    <Glide>
                    <>Or</><> just</><> have</><> fun!</>
                </Glide>
                </Glide>
            </h1>
            
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
            
             <Card
                bg="dark"
                text="light"
                style={{ width: '15rem' }}
                className="mb-2 pageCard"
            >
                <Card.Header>Lab</Card.Header>
                <Card.Body>
                <Popout>
                        <Link as={Link} to='/lab'>
                            <Figure.Image
                                className="pageImage"
                                width={171}
                                height={380}
                                alt="Lab"
                                src={labImage}
                                roundedCircle
                                />
                        </Link>
                    </Popout>
                <Card.Text style={{fontFamily:'Architects Daughter'}}>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>


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
                                className="pageImage"
                                width={171}
                                height={380}
                                alt="Ecosystem"
                                src={ecoImage}
                                roundedCircle
                                />
                        </Link>
                    </Popout>
                <Card.Text style={{fontFamily:'Architects Daughter'}} >
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>


             <Card
                bg="dark"
                text="light"
                style={{ width: '15rem' }}
                className="mb-2 pageCard"
            >
                <Card.Header>Game</Card.Header>
                <Card.Body>
                <Popout>
                        <Link as={Link} to='/game'>
                            <Figure.Image
                                className="pageImage"
                                width={171}
                                height={380}
                                alt="Ecosystem"
                                src={image}
                                roundedCircle
                                />
                        </Link>
                    </Popout>
                <Card.Text style={{fontFamily:'Architects Daughter'}}>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>
        </Grid>
        </div>

    )
};

export default HomePage;