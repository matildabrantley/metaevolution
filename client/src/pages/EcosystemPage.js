import React, { Suspense } from 'react'
import { useHistory } from "react-router-dom";
import Popout from '../components/Popout';
import { Button } from 'react-bootstrap';
import Glide from '../components/Glide';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

const EcosystemPage = () => {

    const history = useHistory()
    const previous = () => { history.goBack() }
    const action = () => {  } 

    return (
        <div>
            <h1>Ecosystem</h1>
            <Glide>
            <Button variant="danger" className="clickable" onClick={previous} style={{padding: '20px'}}>Back</Button>
            <div className="clickable">
            <Fab color="primary" aria-label="add" onClick={action} style={{margin: '10px'}}>
                <AddIcon /> 
            </Fab>New Species
            <Fab color="secondary" aria-label="edit" style={{margin: '10px'}}>
                <DeleteIcon />
            </Fab>Delete Species
            </div>
            <div className="clickable">
            <Fab color="primary" aria-label="add" onClick={action} style={{margin: '10px'}}>
                <AddIcon /> 
            </Fab>New Group
            <Fab color="secondary" aria-label="edit" style={{margin: '10px'}}>
                <DeleteIcon />
            </Fab>Delete Group
            </div>
            </Glide>
                <Suspense fallback={<div>Loading...</div>}>
            < PhaserWorld width={800} height={600} worldType="Ecosystem"/>
            </Suspense>
        </div>
    )
};

export default EcosystemPage;