import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar,
  Box,
  Button,
  Container, GlobalStyles, Grid, IconButton, Modal, Typography
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToolBar from "@mui/material/Toolbar";
import React, { useState } from "react";
import ErgLogo from "./ErgLogo.js";
import WindfarmForm from "./WindfarmForm.js";

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#4a7ec0',
      dark: '#3c6baa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    }
  },
});

const App = () => {

  const TURBINE_DUMMY_DATA = [
    {
      id: "1",
      turbinName: "MLG01",
      operation: "Sost. Gearbox",
      description: "Cantiere I.XXXX",
      creationDate: "29-05-2022 19:31",
      completedSteps: 0,
      complete: false,
    },
    {
      id: "2",
      turbinName: "RT03",
      operation: "Sost. Gearbox",
      description: "Cantiere I.XXXX",
      creationDate: "29-05-2022 17:12",
      completedSteps: 3,
      complete: false
    },
    {
      id: "3",
      turbinName: "RO08",
      operation: "Sost. Generatore",
      description: "Cantiere 1926",
      creationDate: "29-05-2022 19:31",
      completedSteps: 5,
      complete: false
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

  // Modal status
  const [open, setOpen] = React.useState(false);

  // Existing windfarms
  const [turbines, setTurbines] = useState(TURBINE_DUMMY_DATA);

  // All steps
  const [steps, setSteps] = useState(STEP_DUMMY_DATA);

  const handleTurbineAdd = (turbineData) => {
    console.log(turbineData);
    setTurbines([...turbines, turbineData]);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundImage: 'url(' + require('./winforce_bg.png') + ')'
          },
          '*::-webkit-scrollbar': {
            width: '0em'
          }
        }}
      />
      <Container maxWidth="sm">
        <AppBar position="static">
          <ToolBar>
            <ErgLogo />
          </ToolBar>
        </AppBar>
        <Box pt={6} />

        <Stack direction="column" spacing={2} alignItems="center" justifyContent="top"
          style={{ overflowY: "scroll", height: 450, width: "100%" }}>
          {turbines.map((turbine) => {
            const ownSteps = steps.filter(step => step.eventId === turbine.id).map(filtered => filtered.name);
            const reachedStep = ownSteps.length > 0 ? ownSteps[turbine.completedSteps] : "No step found";
            const percentage = ownSteps.length > 0 && (turbine.completedSteps / ownSteps.length) * 100;
            return (
              <Grid item xs={8} key={turbine.id}>
                <Button style={{ width: 400, height: 100 }} variant="contained">
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="h5"><b>{turbine.turbinName} - {turbine.operation}</b></Typography>
                      <Typography variant="body2">{Math.floor(percentage)}% - {reachedStep}</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>)
          })}
        </Stack>

        <Box pt={3} />

        <Grid container direction="column" alignItems="center" >
          <Grid item xs={12}>
            <IconButton onClick={() => setOpen(true)}>
              <AddCircleOutlineIcon color="primary" fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <WindfarmForm onAddedWindfarm={handleTurbineAdd} />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default App;
