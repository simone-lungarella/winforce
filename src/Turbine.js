import {
    Box, Button, Fade, Grid, LinearProgress, Modal, Typography
} from "@mui/material";
import React from 'react';
import TurbineDetail from './TurbineDetail.js';

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

    const handleEventDeletion = () => {
        props.onDeletedWindfarm(props.turbine.id);
    }

    const handleEventUpdate = (turbine) => {
        props.onUpdatedWindfarm(turbine);
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
            <Button variant="contained" color={percentage === 100 ? "success" : "primary"} onClick={() => setOpen(true)}
                sx={{
                    width:280,
                    height: 100
                }}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="button"><b>{props.turbine.turbineName} - {props.turbine.turbineNumber}</b></Typography>
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
                            onDeletedWindfarm={handleEventDeletion}
                            onUpdatedWindfarm={handleEventUpdate}
                        />
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}

export default Turbine;