import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Checkbox, FormControlLabel, Grid, LinearProgress, Stack, Typography
} from "@mui/material";
import { default as React } from 'react';
import eventService from './services/eventService';

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

    return (
        <Box sx={formStyle} >
            <Stack direction="column" alignItems="center" justifyContent="top"
                style={{ overflowY: "scroll", height: 170, width: "100%" }}>

                <Typography variant="h5" > <b>{props.turbineMaster.turbineName} - {props.turbineMaster.operation}</b></Typography>
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
            <LinearProgress color="success" variant="determinate" value={props.stepList.length > 0 ? Math.floor(props.reachedStep * 100 / props.stepList.length) : 0} />
            <Box pt={2} />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>VISUALIZZA STEP</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column" spacing={0} alignItems="center" justifyContent="top"
                        style={{ overflowY: "scroll", height: 200, width: "100%" }}>

                        <Grid container direction="row" alignItems="center" spacing={0} >
                            {props.stepList.map((step) => {
                                return (
                                    <Grid item xs={12} key={step.id}>
                                        <FormControlLabel
                                            value={step.id}
                                            control={<Checkbox size="large" color="success"
                                                checked={(props.stepList[props.reachedStep]) == null || (step.id < (props.stepList[props.reachedStep]).id)}
                                                disabled={(props.stepList[props.reachedStep]) != null && (step.id > (props.stepList[props.reachedStep]).id)}
                                                onChange={handleCheckboxChange}
                                            />}
                                            label={<Typography variant="h5" >{step.name}</Typography>}
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
