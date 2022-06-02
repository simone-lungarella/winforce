import {
    Box, Button,
    Grid, LinearProgress, Modal, Typography
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
    const stepsNames = props.steps.map(filtered => filtered.name);
    let reachedStep = stepsNames.length > 0 ? stepsNames[props.turbine.completedSteps] : "No step found";
    if (props.turbine.completedSteps === stepsNames.length) {
        reachedStep = "COMPLETATO";
    }
    const percentage = stepsNames.length > 0 && (props.turbine.completedSteps / stepsNames.length) * 100;

    return (
        <React.Fragment>
            <Button style={{ width: 400, height: 100 }} variant="contained" color={percentage === 100 ? "success" : "primary"} onClick={() => setOpen(true)}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h5"><b>{props.turbine.turbinName} - {props.turbine.operation}</b></Typography>
                        <Typography variant="body2"> {reachedStep}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <TurbineDetail
                        stepList={props.steps}
                        reachedStep={props.turbine.completedSteps}
                        stepComplete={handleStepComplete}
                        stepIncomplete={handleStepIncomplete}
                        turbineMaster={props.turbine} />
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Turbine;