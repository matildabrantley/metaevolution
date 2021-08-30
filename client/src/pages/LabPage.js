import React, { Suspense } from 'react'
import { useHistory } from "react-router-dom";
import {  Button } from 'react-bootstrap';
import Popout from '../components/Popout';
import SideNav from '../components/Controls';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const PhaserWorld = React.lazy(() => import('../components/PhaserWorld'));

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const LabPage = () => {

    const history = useHistory()
    const previous = () => { history.goBack() }

    const controls = () => {
        
    }

    const classes = useStyles();

    return (
        <div>
            <Button variant="danger" className="clickable" onClick={previous}>Back</Button>
            

            <div className={classes.root}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Fab color="secondary" aria-label="edit">
                <EditIcon />
            </Fab>
            <Fab variant="extended">
                <NavigationIcon className={classes.extendedIcon} />
                Navigate
            </Fab>
            <Fab disabled aria-label="like">
                <FavoriteIcon />
            </Fab>
            </div>




{/* 
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))} */}
                
            <Suspense fallback={<div>Loading...</div>}>
                < PhaserWorld width={800} height={600} worldType="Lab"/>
                < PhaserWorld width={200} height={150} worldType="Colorfun"/>
                < PhaserWorld width={400} height={275} worldType="Shaderfun"/>
            </Suspense>
        </div>
    )
};

export default LabPage;






