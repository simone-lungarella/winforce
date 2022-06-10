import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Checkbox, FormControlLabel, Grid, LinearProgress, Stack, Typography
} from "@mui/material";
import { default as React } from 'react';
import eventService from './services/appService';
import TurbineStatus from './TurbineStatus';

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 330,
    bgcolor: 'background.paper',
    border: '2px solid #284871',
    boxShadow: 24,
    p: 3,
};

const TurbineDetail = (props) => {

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            props.stepComplete(event.target.value);
            eventService.setStepComplete(event.target.value, true);
        } else {
            props.stepIncomplete(event.target.value);
            eventService.setStepComplete(event.target.value, false);
        }
    }

    let turbineName = props.turbineMaster.turbineName.toUpperCase();
    if (turbineName.length > 15) {
        turbineName = turbineName.substring(0, 15) + "...";
    }

    let operation = props.turbineMaster.operation;
    if (operation.length > 20) {
        operation = operation.substring(0, 20) + "...";
    }

    // Order steps by id
    const orderedSteps = props.stepList.sort((a, b) => a.id - b.id);

    return (
        <Box sx={formStyle} >
            <Stack direction="column" alignItems="center" justifyContent="top"
                style={{ overflowY: "scroll" }}>

                <Grid container direction="row" alignItems="center" justify="center" spacing={5}>
                    <Grid item>
                        <TurbineStatus turbineState={props.turbineMaster.turbineState} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5"><b>{turbineName}</b></Typography>
                        <Typography variant="h5">{operation}</Typography>
                    </Grid>
                </Grid>
                <Box pt={3} />
                <Grid container direction="row" alignItems="center" columnGap={2}>
                    <Grid item xs={5}>
                        <Typography variant="overline" > Creazione </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" > {props.turbineMaster.creationDate}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" columnGap={2}>
                    <Grid item xs={5}>
                        <Typography variant="overline" > Inizio att. EEMM </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {props.turbineMaster.startingDateEEMM &&
                            <Typography variant="h6" > {props.turbineMaster.startingDateEEMM} </Typography>
                        }
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" columnGap={2}>
                    <Grid item xs={5}>
                        <Typography variant="overline" > Inizio att. OOCC </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {props.turbineMaster.startingDateOOCC &&
                            <Typography variant="h6" > {props.turbineMaster.startingDateOOCC} </Typography>
                        }
                    </Grid>
                </Grid>
            </Stack>
            <LinearProgress color="success" variant="determinate" value={orderedSteps.length > 0 ? Math.floor(props.reachedStep * 100 / orderedSteps.length) : 0} />
            <Box pt={2} />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography>VISUALIZZA STEP</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column" spacing={0} alignItems="center" justifyContent="top"
                        style={{ overflowY: "scroll", height: 200 }}>

                        <Grid container direction="row" alignItems="center" spacing={0} >
                            {orderedSteps.map((step) => {
                                return (
                                    <Grid item xs={12} key={step.id}>
                                        <FormControlLabel
                                            value={step.id}
                                            control={<Checkbox size="large" color="success"
                                                checked={step == null || step.complete}
                                                disabled={(step.complete && (orderedSteps[props.reachedStep-1]) != null && step.id < (orderedSteps[props.reachedStep-1]).id)
                                                    || ((orderedSteps[props.reachedStep]) != null && step.id > (orderedSteps[props.reachedStep]).id)}
                                                onChange={handleCheckboxChange}
                                            />}
                                            label={<Typography variant="overline" ><b>{step.name}</b></Typography>}
                                            labelPlacement="end"
                                        />
                                    </Grid>
                                );
                            }
                            )}
                        </Grid>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box >
    );
}

export default TurbineDetail;
