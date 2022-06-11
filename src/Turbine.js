import {
    Box, Button,
    Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle,
    Grid, IconButton, LinearProgress, Modal, Typography, Fade
} from "@mui/material";
import React from 'react';
import TurbineDetail from './TurbineDetail.js';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Turbine.css";

const Turbine = (props) => {

    const handleStepComplete = (step) => {
        props.completeStep(step);
    }

    const handleStepIncomplete = (step) => {
        props.incompleteStep(step);
    }

    // Modal status
    const [open, setOpen] = React.useState(false);
    const handleDetailClose = () => {
        setOpen(false);
    }

    // Dialog status
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleEventDeletion = () => {
        props.onDeletedWindfarm(props.turbine.id);
    }

    const stepsNames = props.steps.map(filtered => filtered.name);
    let reachedStep = stepsNames.length > 0 ? stepsNames[props.turbine.completedSteps] : "No step found";
    if (props.turbine.completedSteps === stepsNames.length) {
        reachedStep = "COMPLETATO";
    }
    let percentage = 0;
    if (stepsNames.length > 0) {
        percentage = Math.round((props.turbine.completedSteps / stepsNames.length) * 100);
    }

    return (
        <React.Fragment>
            <IconButton onClick={() => { setOpenAlert(true) }} >
                <DeleteIcon className="changeColor" />
            </IconButton>
            <Dialog
                open={openAlert}
                keepMounted
                onClose={() => { setOpenAlert(false) }}
                maxWidth="xs"
            >
                <DialogTitle id="alert-dialog-title">
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item>
                            <Typography variant="h5">
                                ELIMINARE  <b>{props.turbine.turbineName.toUpperCase()}</b> ?
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        L'eliminazione dell'evento e tutte le sue informazioni verranno
                        permanentemente cancellate.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenAlert(false) }}>Annulla</Button>
                    <Button onClick={handleEventDeletion} autoFocus>
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="contained" color={percentage === 100 ? "success" : "primary"} onClick={() => setOpen(true)}
                sx={{
                    width:280,
                    height: 100
                }}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="button"><b>{props.turbine.turbineName} - {props.turbine.operation}</b></Typography>
                        <Typography variant="body2"> {reachedStep}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mr: 1, width: 200 }}>
                                <LinearProgress color={percentage === 100 ? "secondary" : "success"} variant="determinate" value={percentage} />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.primary">{`${Math.round(
                                    percentage,
                                )}%`}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Fade in={open}>
                    <Box>
                        <TurbineDetail
                            stepList={props.steps}
                            reachedStep={props.turbine.completedSteps}
                            stepComplete={handleStepComplete}
                            stepIncomplete={handleStepIncomplete}
                            turbineMaster={props.turbine}
                            onClose={handleDetailClose}
                        />
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}

export default Turbine;