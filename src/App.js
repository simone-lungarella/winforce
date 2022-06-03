import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar,
  Box, Container, createTheme, GlobalStyles, Grid, IconButton, Modal, Stack, ThemeProvider, Typography
} from "@mui/material";
import ToolBar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import ErgLogo from "./ErgLogo.js";
import eventService from "./services/eventService";
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

  // Modal status
  const [open, setOpen] = React.useState(false);

  // Existing windfarms
  const [turbines, setTurbines] = useState([]);
  useEffect(() => {

    eventService.getTurbines().then(response => {
      setTurbines(response.data);
    })
  }, []);

  // All steps
  const [steps, setSteps] = useState([]);
  useEffect(() => {

    eventService.getSteps()
      .then(response => {
        setSteps(response.data);
      })
  }, []);

  const handleTurbineAdd = (turbineData) => {

    console.log(turbineData);
    eventService
      .addTurbine(turbineData)
      .then(response => {
        if (response.status === 200) {
          setTurbines([...turbines, turbineData]);
          setOpen(false);
        }
    });
  };

  const handleModalClose = () => {
    setOpen(false);
  }

  const handleStepComplete = (stepId) => {
    const updatedStep = steps.find(s => s.id === stepId);
    updatedStep.complete = true;
    setSteps(steps.map(s => s.id === stepId ? updatedStep : s));
    setTurbines(turbines.map(t => t.id === updatedStep.eventId ? { ...t, completedSteps: t.completedSteps + 1 } : t));
  }

  const handleStepIncomplete = (stepId) => {
    const updatedStep = steps.find(s => s.id === stepId);
    updatedStep.complete = false;
    setSteps(steps.map(s => s.id === stepId ? updatedStep : s));
    setTurbines(turbines.map(t => t.id === updatedStep.eventId ? { ...t, completedSteps: t.completedSteps - 1 } : t));
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
            <Box flexGrow={1} />
            <Typography variant="h4" style={{ flexGrow: 1 }}> ERG TASK MANAGER </Typography>
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
