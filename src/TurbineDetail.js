import {
    Box, Checkbox, FormControlLabel, LinearProgress, Grid, Stack, Typography
} from "@mui/material";
import { default as React } from 'react';

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #284871',
    boxShadow: 24,
    p: 4,
};

const TurbineDetail = (props) => {

    const handleCheckboxChange = (event) => {
        event.target.checked ?
            props.stepComplete(event.target.value) :
            props.stepIncomplete(event.target.value);
    }

    return (
        <Box sx={formStyle} >
            <Stack direction="column" alignItems="center" justifyContent="top"
                style={{ overflowY: "scroll", height: 170, width: "100%" }}>

                <Typography variant="h5" > <b>{props.turbineMaster.turbinName} - {props.turbineMaster.operation}</b></Typography>
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
                        <Typography variant="overline" > Inizio attività EEMM </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {props.turbineMaster.startEEMM &&
                            <Typography variant="h6" > {props.turbineMaster.startEEMM} </Typography>
                        }
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" columnGap={2}>
                    <Grid item xs={5}>
                        <Typography variant="overline" > Inizio attività OOCC </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {props.turbineMaster.startOOCC &&
                            <Typography variant="h6" > {props.turbineMaster.startOOCC} </Typography>
                        }
                    </Grid>
                </Grid>
            </Stack>
            <LinearProgress color="success" variant="determinate" value={Math.floor(props.reachedStep * 100 / props.stepList.length)} />
            <Box pt={2} />
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
        </Box >
    );
}

export default TurbineDetail;
