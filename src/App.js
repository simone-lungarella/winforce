import { AccountCircle } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Box, Container, createTheme, GlobalStyles, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Popover, Stack, ThemeProvider, Typography
} from "@mui/material";
import ToolBar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import ErgLogo from "./ErgLogo.js";
import ETMTitle from "./ETM_Title.png";
import LoginForm from "./LoginForm.js";
import eventService from "./services/appService";
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
    },
  },
});

const App = () => {

  // User authentication
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);

  // Retrieve token from local storage
  useEffect(() => {
    if (window.localStorage.getItem("token") != null) {
      eventService.setToken(window.localStorage.getItem("token"));
      setIsAuthenticated(true);
    }
  }, []);

  // Modal status
  const [open, setOpen] = React.useState(false);

  const handleLogin = () => {
    setLoginFormOpen(false);
    setAnchorMenuEl(null);
    setIsAuthenticated(true);
    eventService.getTurbines().then(response => {
      setTurbines(response.data);
      console.log("Turbines added", response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    eventService.setToken(null);
    setIsAuthenticated(false);
    setTurbines([]);
  }

  // Existing windfarms
  const [turbines, setTurbines] = useState([]);
  useEffect(() => {

    if (isAuthenticated) {
      eventService.getTurbines().then(response => {
        setTurbines(response.data);
      }).catch(error => {
        console.log(error);
      });
    }

  }, [isAuthenticated]);

  // All steps
  const [steps, setSteps] = useState([]);
  useEffect(() => {

    if (isAuthenticated) {
      eventService.getSteps()
        .then(response => {
          setSteps(response.data);
        }).catch(error => {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

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
    console.log("Trying to update step with id", stepId);
    console.log("All steps", steps);
    const updatedStep = steps.find(s => s.id.toString() === stepId.toString());
    console.log("Step to update", updatedStep);
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
            <Stack direction="row" alignItems="center" justifyContent="top" columnGap={1}>
              <ErgLogo />
              <Box >
                <img src={ETMTitle} alt="title" width={150} ></img>
              </Box>
              <IconButton onClick={(event) => { setAnchorMenuEl(event.currentTarget) }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorMenuEl}
                open={anchorMenuEl !== null}
                onClose={() => setAnchorMenuEl(null)}
              >
                {isAuthenticated &&
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <AccountCircle color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                }

                {!isAuthenticated &&
                  <MenuItem onClick={() => setLoginFormOpen(true)}>
                    <ListItemIcon>
                      <AccountCircle color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </MenuItem>
                }

                <MenuItem disabled><ListItemIcon>
                  <BuildCircleIcon fontSize="small" />
                </ListItemIcon>
                  <ListItemText>Console</ListItemText>
                </MenuItem>
              </Menu>
              <Modal
                open={loginFormOpen}
                onClose={() => setLoginFormOpen(false)}
              >
                <Box>
                  <LoginForm setAuthenticated={handleLogin} />
                </Box>
              </Modal>
            </Stack>
          </ToolBar>
        </AppBar>
        <Box pt={6} />
        <Stack direction="column" spacing={2} alignItems="center" justifyContent="top"
          style={{ overflowY: "scroll", height: 450, width: "100%" }}>

          {Array.isArray(turbines) && turbines.map((turbine) => {

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

          {
            (!isAuthenticated || !Array.isArray(turbines)) &&
            <Grid item>
              <Typography variant="h6" align="center"> Effettuare il login per visualizzare il contenuto </Typography>
            </Grid>
          }
        </Stack>

        <Box pt={3} />

        <Grid container direction="column" alignItems="center" >
          <Grid item >
            <IconButton onClick={isAuthenticated ? () => setOpen(true) : (event) => setAnchorEl(event.currentTarget)} >
              <AddCircleOutlineIcon color={isAuthenticated ? "primary" : "error"} fontSize="large" />
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
