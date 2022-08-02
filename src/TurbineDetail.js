import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion, AccordionDetails, AccordionSummary, Modal,
    Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControlLabel, Grid, LinearProgress, Stack, Typography
} from "@mui/material";
import { default as React } from 'react';
import ModificationForm from './ModificationForm';
import eventService from './services/appService';
import Backdrop from '@mui/material/Backdrop';
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
    p: 2,
};

const TurbineDetail = (props) => {

    let orderedSteps = [];
    if (Array.isArray(props.stepList)) {
        orderedSteps = props.stepList.sort((a, b) => a.id - b.id);
    }

    const isAuthorized = (step) => {
        const index = orderedSteps.indexOf(step);
        if (index >= 0) {
            const auth = window.localStorage.getItem("authorizations");
            return auth.charAt(index) === '1';
        }
    }

    // Dialog status
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            eventService.setStepComplete(event.target.value, true).then(() => {
                props.stepComplete(event.target.value);
            }).catch(() => {
                console.log("Error setting step complete");
            });
        } else {
            eventService.setStepComplete(event.target.value, false).then(() => {
                props.stepIncomplete(event.target.value);
            }).catch(() => {
                console.log("Error setting step incomplete");
            });
        }
    }

    let turbineName = props.turbineMaster.turbineName.toUpperCase();
    if (turbineName.length > 8) {
        turbineName = turbineName.substring(0, 8) + "...";
    }

    // TODO: handle operation as list and separate with comma
    let operations = props.turbineMaster.operation[0];
    if (props.turbineMaster.operation.length > 1) {
        operations += ", " + props.turbineMaster.operation[1];
    }
    
    if (operations.length > 18) {
        operations = operations.substring(0, 18) + "...";
    }

    const handleEventDeletion = () => {
        props.onDeletedWindfarm(props.turbineMaster.id);
    }

    const handleTurbineEdit = (turbine) => {
        props.onUpdatedWindfarm(turbine);
        setOpenEdit(false);
    }

    return (

        <Box sx={formStyle} >
            <Stack direction="column" alignItems="center" justifyContent="top"
                style={{ overflowY: "scroll" }}>

                <Grid container direction="row" alignItems="center" justify="center" spacing={5}>
                    <Grid item>
                        <TurbineStatus turbineState={props.turbineMaster.turbineState} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5"><b>{turbineName} - {props.turbineMaster.turbineNumber}</b></Typography>
                        <Typography variant="h5">{operations}</Typography>
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
                                                disabled={
                                                    (step.complete && (orderedSteps[props.reachedStep - 1]) != null && step.id < (orderedSteps[props.reachedStep - 1]).id) // Step complete and behind last
                                                    || ((orderedSteps[props.reachedStep]) != null && step.id > (orderedSteps[props.reachedStep]).id) // Step complete and last of list
                                                    || (!isAuthorized(step))}
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
            <Box pt={2} />
            <Grid container direction="row" alignItems="center" justifyContent="center" columnGap={2}>
                <Grid item>
                    <Button startIcon={<DeleteIcon />} color='error' variant='contained'
                        onClick={() => { setOpenAlert(true) }}>Elimina</Button>
                </Grid>
                <Grid item>
                    <Button startIcon={<EditIcon />} variant='contained' onClick={() => { setOpenEdit(true) }}>Modifica</Button>
                </Grid>
            </Grid>
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
                                ELIMINARE  <b>{props.turbineMaster.turbineName.toUpperCase()}</b> ?
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
            <Modal
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
            >
                <Fade in={openEdit}>
                    <Box>
                        <ModificationForm event={props.turbineMaster} onUpdatedWindfarm={handleTurbineEdit} onClose={() => setOpenEdit(false)} />
                    </Box>
                </Fade>
            </Modal>
        </Box >
    );
}

export default TurbineDetail;
