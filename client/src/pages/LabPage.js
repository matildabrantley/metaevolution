import React, { Suspense } from 'react'
import { useHistory } from "react-router-dom";
import {  Button } from 'react-bootstrap';
import Popout from '../components/Popout';
import SideNav from '../components/Controls';
import Glide from '../components/Glide';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavIcon from '@material-ui/icons/Favorite';

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

    const saveNet = () => {
        
    }

    const classes = useStyles();

    return (
        <div>
            
            <Glide>
            <Button variant="danger" className="clickable" onClick={previous} style={{padding: '20px'}}>Back</Button>
            <div className="clickable">
            <Fab color="primary" aria-label="add" onClick={saveNet} style={{margin: '10px'}}>
                <AddIcon /> 
            </Fab>Create Net
            <Fab color="secondary" aria-label="edit" style={{margin: '10px'}}>
                <EditIcon />
            </Fab> Edit Net
            <Fab color="secondary" aria-label="edit" style={{margin: '10px'}}>
                <FavIcon />
            </Fab> Save Net
            </div>
            <div className="clickable">
            <Fab color="primary" aria-label="add" onClick={saveNet} style={{margin: '10px'}}>
                <AddIcon /> 
            </Fab>New World
            <Fab color="secondary" aria-label="edit" style={{margin: '10px'}}>
                <EditIcon />
            </Fab> Edit World
            </div>
            </Glide>




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
            </Suspense>
        </div>
    )
};

export default LabPage;






