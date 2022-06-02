import {
    Box, Checkbox, FormControlLabel, Grid, Stack, Typography
} from "@mui/material";
import { default as React } from 'react';

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #284871',
    boxShadow: 24,
    p: 4,
};

const StepList = (props) => {


    const handleCheckboxChange = (event) => {
        event.target.checked ?
            props.stepComplete(event.target.value) :
            props.stepIncomplete(event.target.value);
    }

    return (
        <Box sx={formStyle} >

            <Stack direction="column" spacing={0} alignItems="center" justifyContent="top"
                style={{ overflowY: "scroll", height: 200, width: "100%" }}>

                <Grid container direction="row" alignItems="center" spacing={0} >
                    {props.stepList.map((step) => {
                        console.log(props.reachedStep);
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

export default StepList;
