import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import ToolBar from "@mui/material/Toolbar";
import React, { useState } from "react";
import ErgLogo from "./logo.svg";

const App = () => {

  const TURBINE_DUMMY_DATA = [
    {
      id: "1",
      name: "Cantiere 1926",
      turbinName: "RO08 - Asta pitch",
      operation: "Sost. generatore",
      descripition: "Cantiere 1926",
      creationDate: "29-05-2022 19:31",
      completedSteps: 3,
      complete: false
    },
    {
      id: "2",
      name: "Cantiere 1927",
      turbinName: "RO08 - Sost. generatore",
      operation: "Sost. generatore",
      descripition: "Cantiere 1927",
      creationDate: "29-05-2022 19:31",
      completedSteps: 0,
      complete: false,
    }
  ];

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

  const [turbines, setTurbines] = useState(TURBINE_DUMMY_DATA);
  const [steps, setSteps] = useState(STEP_DUMMY_DATA);

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <ToolBar>
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            padding={2}
            alt="ERG logo"
            src={ErgLogo}
          />
        </ToolBar>
      </AppBar>
      <Box pt={3} />
      <Grid container direction="column" rowSpacing={2} justifyContent="center" alignItems="center">
        {turbines.map(function (turbine) {
          const reachedStep = steps.filter(step => step.eventId === turbine.id).map(filtered => filtered.name)[turbine.completedSteps];
          return (
            <Grid item xs={12} key={turbine.id}>
              <Button style={{ width: 300, height: 100 }} variant="contained">
                  {turbine.turbinName} - 
                  {reachedStep}
              </Button>
            </Grid>)
        })}
        <Box pt={3} />

        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Container>
  );
};

export default App;
