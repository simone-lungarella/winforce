import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar,
  Box, Container, createTheme, GlobalStyles, Grid, IconButton, Modal, Stack, ThemeProvider
} from "@mui/material";
import ToolBar from "@mui/material/Toolbar";
import React, { useState } from "react";
import ErgLogo from "./ErgLogo.js";
import Turbine from "./Turbine.js";
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
      main: '#39621d',
      dark: '#ba000d',
      contrastText: '#000',
    },
    success: {
      light: '#ff7961',
      main: '#5fa631',
      dark: '#508929',
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
      creationDate: "29-05-2022 19:31",
      completedSteps: 0,
      startEEMM: "01-06-2022",
      startOOCC: ""
    },
    {
      id: "2",
      turbinName: "RT03",
      operation: "Sost. Gearbox",
      creationDate: "29-05-2022 17:12",
      completedSteps: 3,
      startEEMM: "01-06-2022",
      startOOCC: "02-06-2022"
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
    setOpen(false);
  };

  const handleModalClose = () => {
    setOpen(false);
  }

  const handleStepComplete = (stepId) => {
    const updatedStep = steps.find(s => s.id === stepId);
    updatedStep.complete = true;
    setSteps(steps.map(s => s.id === stepId ? updatedStep : s));
    setTurbines(turbines.map(t => t.id === updatedStep.eventId ? {...t, completedSteps: t.completedSteps + 1} : t));
  }

  const handleStepIncomplete = (stepId) => {
    const updatedStep = steps.find(s => s.id === stepId);
    updatedStep.complete = false;
    setSteps(steps.map(s => s.id === stepId ? updatedStep : s));
    setTurbines(turbines.map(t => t.id === updatedStep.eventId ? {...t, completedSteps: t.completedSteps - 1} : t));
  }

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

            const turbineSteps = steps.filter(step => step.eventId === turbine.id);
            return (

              <Grid item xs={8} key={turbine.id}>
                <Turbine turbine={turbine} steps={turbineSteps} 
                  completeStep={handleStepComplete}
                  incompleteStep={handleStepIncomplete} />
              </Grid>
            )
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
            <WindfarmForm onAddedWindfarm={handleTurbineAdd} onClose={handleModalClose} />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default App;
