import { AccountCircle } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar, Box, CircularProgress, Container, createTheme, Fade, GlobalStyles, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Popover, Stack, ThemeProvider, Typography
} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import ToolBar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm.js";
import ErgLogo from "./ErgLogo.js";
import ErgTitle from "./ErgTitle.js";
import LoginForm from "./LoginForm.js";
import eventService from "./services/appService";
import Turbine from "./Turbine.js";
import CreationForm from "./CreationForm.js";

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
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [turbinesReady, setTurbinesReady] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);

  // Retrieve token from local storage
  useEffect(() => {

    const localToken = window.localStorage.getItem("token");
    if (localToken != null) {
      eventService.setToken(localToken);
      setIsAuthenticated(true);

      // Refreshing events after token insertion
      eventService.getTurbines().then(response => {
        setTurbines(response.data);
        setTurbinesReady(true);
      }).catch(error => {
        console.log(error);
        setTurbinesReady(false);
      });
    }
  }, []);

  // Modal status
  const [open, setOpen] = React.useState(false);

  const handleLogin = (isLogged, data) => {
    setLoginFormOpen(!isLogged);
    setIsAuthenticated(isLogged);

    if (isLogged) {
      window.localStorage.setItem("roles", data.roles);
      window.localStorage.setItem("authorizations", data.authorizations);
      eventService.getTurbines().then(response => {
        setTurbines(response.data);
        setTurbinesReady(true);
      }).catch(error => {
        console.log(error);
        setTurbinesReady(false);
      });
    } else {
      window.localStorage.removeItem("roles");
      window.localStorage.removeItem("authorizations");
      setTurbinesReady(false);
    }
  }

  const handleLoginFormOpen = () => {
    setAnchorMenuEl(null);
    setLoginFormOpen(true);
  }

  const handleAddUserFormOpen = () => {
    setAnchorMenuEl(null);
    setConsoleOpen(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    window.localStorage.removeItem("authorizations");
    setTurbinesReady(false);
    eventService.setToken(null);
    setIsAuthenticated(false);
  }

  // Existing windfarms
  const [turbines, setTurbines] = useState([]);
  useEffect(() => {

    if (isAuthenticated) {
      eventService.getTurbines().then(response => {
        setTurbines(response.data);
        setTurbinesReady(true);
      }).catch(error => {
        console.log(error);
        setTurbinesReady(false);
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

    setOpen(false);

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
        }
      });
  };

  const handleTurbineDeletion = (turbineId) => {

    eventService
      .deleteTurbine(turbineId)
      .then(response => {
        if (response.status === 200) {
          setTurbines(turbines.filter(turbine => turbine.id.toString() !== turbineId.toString()));
        }
      });
  }

  const handleTurbineUpdate = (turbine) => {
    eventService.alterTurbine(turbine)
      .then(response => {
        if (response.status === 200) {
          setTurbines(turbines.map(t => t.id === turbine.id ? turbine : t));
        }
      }).catch(() => {
        console.log("Error altering turbine");
      });
  }

  const handleStepComplete = (stepId) => {
    const updatedStep = steps.find(s => s.id.toString() === stepId.toString());
    updatedStep.complete = true;
    setSteps(steps.map(s => s.id.toString() === stepId.toString() ? updatedStep : s));
    setTurbines(turbines.map(t => t.id.toString() === updatedStep.eventId.toString() ? { ...t, completedSteps: t.completedSteps + 1 } : t));
  }

  const handleStepIncomplete = (stepId) => {
    console.log("Step set incomplete");
    const updatedStep = steps.find(s => s.id.toString() === stepId.toString());
    updatedStep.complete = false;
    setSteps(steps.map(s => s.id.toString() === stepId.toString() ? updatedStep : s));
    setTurbines(turbines.map(t => t.id.toString() === updatedStep.eventId.toString() ? { ...t, completedSteps: t.completedSteps - 1 } : t));
  }

  // The turbine with minor completedSteps should be on top
  if (isAuthenticated && turbinesReady) {
    turbines.sort((a, b) => a.completedSteps - b.completedSteps);
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
        <AppBar>
          <ToolBar sx={{ height: 80 }}>
            <ErgLogo />
            <ErgTitle />
            <IconButton
              onClick={(event) => { setAnchorMenuEl(event.currentTarget) }}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '0%',
                transform: 'translate(-10%, -50%)',
                fontSize: 48
              }}>
              <SettingsIcon color={isAuthenticated ? 'success' : 'error'} fontSize="inherit" />
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
                  <Typography variant="overline">Logout</Typography>
                </MenuItem>
              }

              {!isAuthenticated &&
                <MenuItem onClick={handleLoginFormOpen}>
                  <ListItemIcon>
                    <AccountCircle color="primary" fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="overline">Login</Typography>
                  </ListItemText>
                </MenuItem>
              }

              <MenuItem onClick={handleAddUserFormOpen} disabled={window.localStorage.getItem("roles") !== "ADMIN"}><ListItemIcon>
                <AssignmentIndIcon color={window.localStorage.getItem("roles") !== "ADMIN" ? "" : "primary"} fontSize="medium" />
              </ListItemIcon>
                <ListItemText>
                  <Typography variant="overline">Sign up</Typography>
                </ListItemText>
              </MenuItem>
            </Menu>
            <Modal
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              open={loginFormOpen}
              onClose={() => setLoginFormOpen(false)}
            >
              <Fade in={loginFormOpen}>
                <Box>
                  <LoginForm setAuthenticated={handleLogin} />
                </Box>
              </Fade>
            </Modal>
            <Modal
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              open={consoleOpen}
              onClose={() => setConsoleOpen(false)}
            >
              <Fade in={consoleOpen}>
                <Box>
                  <AddUserForm  />
                </Box>
              </Fade>
            </Modal>
          </ToolBar>
        </AppBar>
        <Box pt={16} />
        <Stack direction="column" spacing={2} alignItems="center" justifyContent="top"
          style={{ overflowY: "scroll", height: 450 }}>

          {isAuthenticated && turbinesReady && turbines
            .map((turbine) => {

              const turbineSteps = steps.filter(step => step.eventId === turbine.id);
              return (

                <Grid item key={turbine.id}>
                  <Turbine turbine={turbine} steps={turbineSteps}
                    completeStep={handleStepComplete}
                    incompleteStep={handleStepIncomplete}
                    onDeletedWindfarm={handleTurbineDeletion}
                    onUpdatedWindfarm={handleTurbineUpdate} />
                </Grid>
              )
            })}
          {
            !isAuthenticated && !turbinesReady &&
            <Grid item>
              <Typography variant="overline" align="center"> OFFLINE </Typography>
            </Grid>
          }
          {
            isAuthenticated && !turbinesReady &&
            <Grid item>
              <CircularProgress />
            </Grid>
          }
        </Stack>

        <Grid container justifyContent="center">
          <Grid item >
            <IconButton onClick={isAuthenticated ? () => setOpen(true) : (event) => setAnchorEl(event.currentTarget)}
              sx={{
                fontSize: 48,
              }}>
              <AddCircleOutlineIcon color={isAuthenticated ? "primary" : "error"} fontSize="inherit" />
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
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Fade in={open}>
            <Box>
              <CreationForm onAddedWindfarm={handleTurbineAdd} onClose={() => setOpen(false)} />
            </Box>
          </Fade>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default App;
