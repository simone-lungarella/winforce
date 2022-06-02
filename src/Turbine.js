import {
    Button,
    Grid,
    Typography
} from "@mui/material";
import React, { useState } from 'react';

const STEP_DUMMY_DATA = [
    {
        id: "1",
        eventId: "1",
        name: "Sopralluogo",
        description: "Sopralluogo zona cantiere",
        completionDate: "29-05-2022 19:31",
        complete: true
    },
    {
        id: "2",
        eventId: "1",
        name: "Redazione report",
        description: "Redazione report precedente ad inizio cantiere",
        completionDate: "29-05-2022 19:31",
        complete: true
    },
    {
        id: "3",
        eventId: "1",
        name: "Richiesta apertura cantiere",
        description: "Invio report a permitting",
        completionDate: "29-05-2022 19:31",
        complete: true
    },
    {
        id: "4",
        eventId: "1",
        name: "Permitting",
        description: "Permitting",
        completionDate: null,
        complete: false
    },
    {
        id: "5",
        eventId: "1",
        name: "Documentazione sicurezza",
        description: "Documentazione sicurezza successiva all'avvio del cantiere",
        completionDate: null,
        complete: false
    },
    {
        id: "6",
        eventId: "1",
        name: "Completamento attività OOCC",
        description: "Completamento attività OOCC",
        completionDate: null,
        complete: false
    },
    {
        id: "7",
        eventId: "1",
        name: "Completamento attività EEMM",
        description: "Completamento attività EEMM",
        completionDate: null,
        complete: false
    },
    {
        id: "8",
        eventId: "1",
        name: "Smontaggio piazzola",
        description: "Smontaggio piazzola prima del completamento del cantiere",
        completionDate: null,
        complete: false
    },
    {
        id: "9",
        eventId: "1",
        name: "Chiusura cantiere",
        description: "Chiusura cantiere completo",
        completionDate: null,
        complete: false
    }, {
        id: "10",
        eventId: "2",
        name: "Sopralluogo",
        description: "Sopralluogo zona cantiere",
        completionDate: "29-05-2022 19:31",
        complete: true
    },
    {
        id: "11",
        eventId: "2",
        name: "Redazione report",
        description: "Redazione report precedente ad inizio cantiere",
        completionDate: "29-05-2022 19:31",
        complete: true
    },
    {
        id: "12",
        eventId: "2",
        name: "Richiesta apertura cantiere",
        description: "Invio report a permitting",
        completionDate: "29-05-2022 19:31",
        complete: true
    },
    {
        id: "13",
        eventId: "2",
        name: "Permitting",
        description: "Permitting",
        completionDate: null,
        complete: false
    },
    {
        id: "14",
        eventId: "2",
        name: "Documentazione sicurezza",
        description: "Documentazione sicurezza successiva all'avvio del cantiere",
        completionDate: null,
        complete: false
    },
    {
        id: "15",
        eventId: "2",
        name: "Completamento attività OOCC",
        description: "Completamento attività OOCC",
        completionDate: null,
        complete: false
    },
    {
        id: "16",
        eventId: "2",
        name: "Completamento attività EEMM",
        description: "Completamento attività EEMM",
        completionDate: null,
        complete: false
    },
    {
        id: "17",
        eventId: "2",
        name: "Smontaggio piazzola",
        description: "Smontaggio piazzola prima del completamento del cantiere",
        completionDate: null,
        complete: false
    },
    {
        id: "18",
        eventId: "2",
        name: "Chiusura cantiere",
        description: "Chiusura cantiere completo",
        completionDate: null,
        complete: false
    }
];

const Turbine = (props) => {

    // All steps
    const [steps, setSteps] = useState(STEP_DUMMY_DATA);
    
    const ownSteps = steps.filter(step => step.eventId === props.turbine.id).map(filtered => filtered.name);
    const reachedStep = ownSteps.length > 0 ? ownSteps[props.turbine.completedSteps] : "No step found";
    const percentage = ownSteps.length > 0 && (props.turbine.completedSteps / ownSteps.length) * 100;

    return (<Button style={{ width: 400, height: 100 }} variant="contained">
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h5"><b>{props.turbine.turbinName} - {props.turbine.operation}</b></Typography>
                <Typography variant="body2">{Math.floor(percentage)}% - {reachedStep}</Typography>
            </Grid>
        </Grid>
    </Button>);
}

export default Turbine;