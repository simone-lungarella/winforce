import {
    Box, Button, Fade, Grid, LinearProgress, Modal, Typography
} from "@mui/material";
import React from 'react';
import TurbineDetail from './TurbineDetail.js';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const states = {
    ok: "OK",
    warning: "WARNING",
    error: "ERROR"
}

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

    let status = states.ok;
    if (props.turbine.turbineState === "Limitata") {
        status = states.warning;
    } else if (props.turbine.turbineState === "Ferma") {
        status = states.error;
    }

    return (
        <React.Fragment>
            <Button variant="contained" color={percentage === 100 ? "success" : "primary"} onClick={() => setOpen(true)}
                sx={{
                    width:280,
                    height: 100
                }}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid container direction="row" >
                        <Grid item xs={2}>
                            {status === states.ok &&
                                <AutoModeIcon color="success" fontSize='large'/>
                            }
                            {status === states.warning &&
                                <WarningIcon color="warning" fontSize='large'/>
                            }
                            {status === states.error &&
                                <ErrorIcon color="error" fontSize='large'/>
                            }
                        </Grid>
                        <Box p={2} />
                        <Grid item>
                            <Typography variant="button"><b>{props.turbine.turbineName} - {props.turbine.turbineNumber}</b></Typography>
                            <Typography variant="body2"> {reachedStep}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
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