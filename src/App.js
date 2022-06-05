import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar, Popover, Typography,
  Box, Container, createTheme, GlobalStyles, Grid, IconButton, Modal, Stack, ThemeProvider
} from "@mui/material";
import ToolBar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import ErgLogo from "./ErgLogo.js";
import ETMTitle from "./ETM_Title.png";
import eventService from "./services/appService";
import Turbine from "./Turbine.js";
import WindfarmForm from "./WindfarmForm.js";
import MenuIcon from '@mui/icons-material/Menu';
import LoginForm from "./LoginForm.js";

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
    },
  },
});

const App = () => {

  // User authentication
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(null);
  const [loginFormOpen, setLoginFormOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

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

    eventService
      .addTurbine(turbineData)
      .then(response => {
        if (response.status === 200) {
          eventService.getTurbines().then(turbineResponse => {
            setTurbines(turbineResponse.data);
          })
          eventService.getSteps().then(stepsResponse => {
            setSteps(stepsResponse.data);
          })
          setOpen(false);
        }
      });
  };

  const handleTurbineDeletion = (turbineId) => {

    eventService
      .deleteTurbine(turbineId)
      .then(response => {
        if (response.status === 200) {
          setTurbines(turbines.filter(turbine => turbine.id !== turbineId));
        }
      });
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

  const handleLogin = (name, pass) => {
    setUsername(name);
    setPassword(pass);

    setAuth(eventService.login(username, password));
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
            <Stack direction="row" alignItems="center" justifyContent="top" columnGap={1}>
              <ErgLogo />
              <Box >
                <img src={ETMTitle} alt="title" width={200} ></img>
              </Box>
              <IconButton onClick={() => setLoginFormOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Modal
                open={loginFormOpen}
                onClose={() => setLoginFormOpen(false)}
              >
                <Box>
                  <LoginForm onLogin={handleLogin}/>
                </Box>
              </Modal>
            </Stack>
          </ToolBar>
        </AppBar>
        <Box pt={6} />
        {(auth?.accessToken != null) &&
          <Stack direction="column" spacing={2} alignItems="center" justifyContent="top"
            style={{ overflowY: "scroll", height: 450, width: "100%" }}>

            {turbines.map((turbine) => {

              const turbineSteps = steps.filter(step => step.eventId === turbine.id);
              return (

                <Grid item key={turbine.id}>
                  <Turbine turbine={turbine} steps={turbineSteps}
                    completeStep={handleStepComplete}
                    incompleteStep={handleStepIncomplete}
                    onDeletedWindfarm={handleTurbineDeletion} />
                </Grid>
              )
            })}
          </Stack>}

        <Box pt={3} />

        <Grid container direction="column" alignItems="center" >
          <Grid item >
            <IconButton onClick={(auth?.accessToken != null) ? () => setOpen(true) : (event) => setAnchorEl(event.currentTarget)} >
              <AddCircleOutlineIcon color={(auth?.accessToken != null) ? "primary" : "error"} fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Popover
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }} >
          <Typography variant="overline" p={1}>
            UTENTE NON AUTORIZZATO
          </Typography>
        </Popover>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box>
            <WindfarmForm onAddedWindfarm={handleTurbineAdd} onClose={() => setOpen(false)} />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default App;
