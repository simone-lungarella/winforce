import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Checkbox, FormControlLabel, Grid, IconButton, LinearProgress, Popover, Stack, Typography
} from "@mui/material";
import { default as React } from 'react';
import eventService from './services/appService';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import AutoModeIcon from '@mui/icons-material/AutoMode';

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

const states = {
    ok: "OK",
    warning: "WARNING",
    error: "ERROR"
}

const TurbineDetail = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopup = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            props.stepComplete(event.target.value);
            eventService.setStepComplete(event.target.value, true);
        } else {
            props.stepIncomplete(event.target.value);
            eventService.setStepComplete(event.target.value, false);
        }
    }

    let turbineStatus = states.ok;
    if (props.turbineMaster.turbineState === "Limitata") {
        turbineStatus = states.warning;
    } else if (props.turbineMaster.turbineState === "Ferma") {
        turbineStatus = states.error;
    }

    return (
        <Box sx={formStyle} >
            <Stack direction="column" alignItems="center" justifyContent="top"
                style={{ overflowY: "scroll", height: 170, width: "100%" }}>
                <Grid container direction="row" alignItems="center" columnGap={2}>
                    {turbineStatus === states.ok &&
                        <IconButton onClick={handlePopup} >
                            <AutoModeIcon color="success" />
                        </IconButton>
                    }
                    {turbineStatus === states.warning &&
                        <IconButton onClick={handlePopup} >
                            <WarningIcon color="warning" />
                        </IconButton>
                    }
                    {turbineStatus === states.error &&
                        <IconButton onClick={handlePopup} >
                            <ErrorIcon color="error" />
                        </IconButton>
                    }
                    <Popover
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Typography variant="overline" p={1}>
                            Turbina: {props.turbineMaster.turbineState}
                        </Typography>
                    </Popover>
                    <Typography variant="h5" > <b>{props.turbineMaster.turbineName} - {props.turbineMaster.operation}</b></Typography>
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
            <LinearProgress color="success" variant="determinate" value={props.stepList.length > 0 ? Math.floor(props.reachedStep * 100 / props.stepList.length) : 0} />
            <Box pt={2} />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
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
