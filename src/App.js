import { AccountCircle } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./logo.svg";
import ModificationForm from "./ModificationForm";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  BottomNavigationAction,
  Box,
  CircularProgress,
  createTheme,
  GlobalStyles,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import ToolBar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm.js";
import CreationForm from "./CreationForm.js";
import DeletionModal from "./DeletionModal";
import LoginForm from "./LoginForm.js";
import eventService from "./services/appService";
import Turbine from "./Turbine.js";
import TurbineDetail from "./TurbineDetail.js";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#2c6b2c", //#4a7ec0
      dark: "#1e5b2c", //#3c6baa
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#39621d",
      dark: "#333",
      contrastText: "#000",
    },
    success: {
      light: "#ff7961",
      main: "#5fa631",
      dark: "#508929",
      contrastText: "#000",
    },
    error: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#000",
    },
    barColor: {
      main: "#1a392c",
    },
    bottomBarColor: {
      main: "#85a99c",
    },
    backgroundColor: {
      main: "#cfded7",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 660,
      lg: 1200,
      xl: 1920,
    },
  },
});

const App = () => {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [turbinesReady, setTurbinesReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);

  const [oldTurbines, setOldTurbines] = useState([]);
  const [newTurbines, setNewTurbines] = useState([]);

  // Retrieve token from local storage
  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    if (localToken != null) {
      eventService.setToken(localToken);
      setIsAuthenticated(true);

      // Refreshing events after token insertion
      eventService
        .getTurbines()
        .then((response) => {
          setTurbines(response.data);
          setOldTurbines(response.data.filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));
          setNewTurbines(response.data.filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));

          setTurbinesReady(true);

          console.log("OLD:", oldTurbines);
          console.log("NEW", newTurbines);
        })
        .catch((error) => {
          console.log(error);
          setTurbinesReady(false);
        });
    }
  }, []);

  const [openModification, setOpenModification] = React.useState(false);
  const [currentTurbine, setCurrentTurbine] = React.useState(null);
  const [currentSteps, setCurrentSteps] = React.useState(null);

  // Creation modal status
  const [openCreation, setOpenCreation] = React.useState(false);
  const [deletionModalOpen, setDeletionModalOpen] = React.useState(false);

  // Snackbars
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [easterEgg, setEasterEgg] = React.useState(false);
  const [isAltered, setIsAltered] = React.useState(false);
  const [isCreated, setIsCreated] = React.useState(false);
  const [isExported, setIsExported] = React.useState(false);
  const [userAdded, setUserAdded] = useState(false);

  const snackbarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => {
        setIsDeleted(false);
        setIsAltered(false);
        setIsCreated(false);
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleDeletion = (turbineId) => {
    setTurbines(
      turbines.filter(
        (turbine) => turbine.id.toString() !== turbineId.toString()
      )
    );
    setNewTurbines(turbines.filter((turbine) => turbine.id.toString() !== turbineId.toString()).filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));
    setOldTurbines(turbines.filter((turbine) => turbine.id.toString() !== turbineId.toString()).filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));

    setIsDeleted(true);
    setCurrentTurbine(null);
    setDeletionModalOpen(false);
  };

  const handleLogin = (isLogged, data) => {
    setIsAuthenticated(isLogged);

    if (isLogged) {
      window.localStorage.setItem("roles", data.roles);
      window.localStorage.setItem("authorizations", data.authorizations);
      eventService
        .getTurbines()
        .then((response) => {
          setTurbines(response.data);
          setOldTurbines(response.data.filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));
          setNewTurbines(response.data.filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));

          setTurbinesReady(true);
        })
        .catch((error) => {
          console.log(error);
          setTurbinesReady(false);
        });
    } else {
      window.localStorage.removeItem("roles");
      window.localStorage.removeItem("authorizations");
      setTurbinesReady(false);
    }
  };

  const handleExport = () => {
    eventService.getExportdata().then((response) => {
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "export.csv";
      link.click();
      setIsExported(true);
    });
  };

  const handleAddUserFormOpen = () => {
    setAnchorMenuEl(null);
    setOpenCreation(false);
    setOpenModification(false);
    setConsoleOpen(true);
    setCurrentTurbine(null);
    setCurrentSteps([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    window.localStorage.removeItem("authorizations");
    setTurbinesReady(false);
    eventService.setToken(null);
    setIsAuthenticated(false);
    setCurrentTurbine(null);
    setCurrentSteps([]);
    setOpenCreation(false);
    setOpenModification(false);
    setConsoleOpen(false);
    setTurbinesReady(false);
  };

  // Existing windfarms
  const [turbines, setTurbines] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      eventService
        .getTurbines()
        .then((response) => {
          setTurbines(response.data);
          setOldTurbines(response.data.filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));
          setNewTurbines(response.data.filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));

          setTurbinesReady(true);
        })
        .catch((error) => {
          console.log(error);
          setTurbinesReady(false);
        });
    }
  }, [isAuthenticated]);

  // All steps
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    if (isAuthenticated) {
      eventService
        .getSteps()
        .then((response) => {
          setSteps(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  const handleTurbineAdd = (newTurbine) => {
    setIsCreated(true);
    setIsLoading(true);
    setOpenCreation(false);
    eventService.addTurbine(newTurbine).then((response) => {
      if (response.status === 200) {
        eventService.getTurbines().then((turbineResponse) => {
          setTurbines(turbineResponse.data);
          setOldTurbines(turbineResponse.data.filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));
          setNewTurbines(turbineResponse.data.filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));
        });
        eventService.getSteps().then((stepsResponse) => {
          setSteps(stepsResponse.data);
        });
      }
    });
    setIsLoading(false);
  };

  const handleTurbineUpdate = (updateTurbine) => {
    setIsAltered(true);
    setIsLoading(true);
    setOpenModification(false);
    setCurrentTurbine(null);
    setCurrentSteps([]);

    eventService
      .alterTurbine(updateTurbine)
      .then((response) => {
        if (response.status === 200) {
          setTurbines(
            turbines.map((t) => (t.id === updateTurbine.id ? updateTurbine : t))
          );

          setOldTurbines(turbines.map((t) => (t.id === updateTurbine.id ? updateTurbine : t)).filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));
          setNewTurbines(turbines.map((t) => (t.id === updateTurbine.id ? updateTurbine : t)).filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));
        }
      })
      .catch(() => {
        console.log("Error altering turbine");
      });
    setIsLoading(false);
  };

  const handleBack = () => {
    if (openCreation) {
      setOpenCreation(false);
    }

    if (openModification) {
      setOpenModification(false);
    }

    if (consoleOpen) {
      setConsoleOpen(false);
    }

    if (currentTurbine && !openModification) {
      setCurrentTurbine(null);
      setCurrentSteps([]);
    }
  };

  const handleStepComplete = (stepId) => {
    const updatedStep = steps.find(
      (s) => s.id.toString() === stepId.toString()
    );
    updatedStep.complete = true;
    setSteps(
      steps.map((s) =>
        s.id.toString() === stepId.toString() ? updatedStep : s
      )
    );
    setTurbines(
      turbines.map((t) =>
        t.id.toString() === updatedStep.eventId.toString()
          ? { ...t, completedSteps: t.completedSteps + 1 }
          : t
      )
    );

    setOldTurbines(turbines.map((t) => t.id.toString() === updatedStep.eventId.toString() ? { ...t, completedSteps: t.completedSteps + 1 } : t).filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));
    setNewTurbines(turbines.map((t) => t.id.toString() === updatedStep.eventId.toString() ? { ...t, completedSteps: t.completedSteps + 1 } : t).filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));
  };

  const handleStepIncomplete = (stepId) => {
    const updatedStep = steps.find(
      (s) => s.id.toString() === stepId.toString()
    );
    updatedStep.complete = false;
    setSteps(
      steps.map((s) =>
        s.id.toString() === stepId.toString() ? updatedStep : s
      )
    );
    setTurbines(
      turbines.map((t) =>
        t.id.toString() === updatedStep.eventId.toString()
          ? { ...t, completedSteps: t.completedSteps - 1 }
          : t
      )
    );

    setOldTurbines(turbines.map((t) => t.id.toString() === updatedStep.eventId.toString() ? { ...t, completedSteps: t.completedSteps - 1 } : t).filter((t) => new Date(t.creationDate).getFullYear() !== new Date().getFullYear()));
    setNewTurbines(turbines.map((t) => t.id.toString() === updatedStep.eventId.toString() ? { ...t, completedSteps: t.completedSteps - 1 } : t).filter((t) => new Date(t.creationDate).getFullYear() === new Date().getFullYear()));
  };

  // The turbine with minor completedSteps should be on top
  if (isAuthenticated && turbinesReady && turbines.length > 0) {
    try {
      turbines.sort((a, b) => a.completedSteps - b.completedSteps);
    } catch (error) {
      setTurbinesReady(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#fff",
          },
          "::-webkit-scrollbar": {
            webkitOverflowScrolling: "auto",
            width: "0.5em",
          },
          "::-webkit-scrollbar-track": {
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.5)",
            outline: "1px solid slategrey",
          },
        }}
      />
      <AppBar position="fixed" color="barColor">
        <ToolBar
          sx={{
            height: 80,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(45deg)",
              transition: "transform 1s ease-in-out",
              "&:hover": {
                transform: "rotate(360deg) scale(1.1)",
              },
            }}
          >
            <IconButton onClick={() => setEasterEgg(true)}>
              <img
                src={logo}
                alt="logo"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </IconButton>
          </Box>

          <Grid container direction="row" justifyContent={"center"}>
            <Grid item>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
                disabled={!isAuthenticated}
              >
                <ListItemText>
                  <Typography
                    color="primary.contrastText"
                    variant="overline"
                    sx={{ fontSize: 18 }}
                  >
                    Logout
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Grid>
            <Grid item>
              <MenuItem
                onClick={handleAddUserFormOpen}
                disabled={window.localStorage.getItem("roles") !== "ADMIN"}
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              >
                <ListItemText>
                  <Typography
                    color="primary.contrastText"
                    variant="overline"
                    sx={{ fontSize: 18 }}
                  >
                    Sign up
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Grid>
          </Grid>

          <IconButton
            onClick={(event) => {
              setAnchorMenuEl(event.currentTarget);
            }}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0%",
              transform: "translate(-10%, -50%)",
              display: { xs: "flex", md: "none" },
              fontSize: 32,
            }}
          >
            <MenuIcon
              sx={{
                color: isAuthenticated ? "primary.contrastText" : "#f44336",
              }}
              fontSize="inherit"
            />
          </IconButton>

          <Menu
            anchorEl={anchorMenuEl}
            open={anchorMenuEl !== null}
            onClose={() => setAnchorMenuEl(null)}
          >
            {isAuthenticated && (
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <AccountCircle color="error" fontSize="small" />
                </ListItemIcon>
                <Typography variant="overline">Logout</Typography>
              </MenuItem>
            )}

            <MenuItem
              onClick={handleAddUserFormOpen}
              disabled={window.localStorage.getItem("roles") !== "ADMIN"}
            >
              <ListItemIcon>
                <AssignmentIndIcon
                  color={
                    window.localStorage.getItem("roles") !== "ADMIN"
                      ? ""
                      : "primary"
                  }
                  fontSize="medium"
                />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="overline">Sign up</Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </ToolBar>
      </AppBar>

      <Box sx={{ position: "absolute", top: "50%", left: "50%", zIndex: 1 }}>
        {isAuthenticated && (!turbinesReady || isLoading) && (
          <CircularProgress />
        )}
      </Box>

      {consoleOpen && (
        <AddUserForm
          handleUserAdded={() => {
            setUserAdded(true);
            setConsoleOpen(false);
          }}
        />
      )}
      {currentTurbine && !openModification && !consoleOpen && (
        <TurbineDetail
          stepList={currentSteps}
          reachedStep={currentTurbine.completedSteps}
          stepComplete={handleStepComplete}
          stepIncomplete={handleStepIncomplete}
          turbineMaster={currentTurbine}
        />
      )}
      <Snackbar
        open={
          isDeleted ||
          isAltered ||
          isCreated ||
          isExported ||
          userAdded ||
          easterEgg
        }
        autoHideDuration={3000}
        onClose={() => {
          setEasterEgg(false);
          setIsDeleted(false);
          setIsAltered(false);
          setIsCreated(false);
          setIsExported(false);
          setUserAdded(false);
        }}
        action={snackbarAction}
      >
        {/* Custom alert with custom background */}
        <Alert
          onClose={() => {
            setEasterEgg(false);
            setIsDeleted(false);
            setIsAltered(false);
            setIsCreated(false);
            setIsExported(false);
            setUserAdded(false);
          }}
          severity={
            isAltered || isCreated || userAdded || easterEgg
              ? "success"
              : isDeleted
                ? "error"
                : "info"
          }
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" sx={{
              color: "#5fa631",
            }} />,
            error: <ErrorOutlineIcon fontSize="inherit" />,
            info: <InfoOutlinedIcon fontSize="inherit" />,
          }}
        >
          {isDeleted
            ? "Intervento eliminato!"
            : isAltered
              ? "Intervento modificato!"
              : isCreated
                ? "Intervento creato!"
                : isExported
                  ? "Esportazione completata!"
                  : userAdded
                    ? "Utente creato!"
                    : "Let's save the planet!"}
        </Alert>
      </Snackbar>
      {openModification && !consoleOpen && (
        <ModificationForm
          turbine={currentTurbine}
          onUpdatedWindfarm={(data) => handleTurbineUpdate(data)}
          handleClose={() => setOpenModification(false)}
        />
      )}

      {!isAuthenticated && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoginForm setAuthenticated={handleLogin} />
        </Box>
      )}

      {!openCreation &&
        !consoleOpen &&
        !currentTurbine &&
        isAuthenticated &&
        turbinesReady && (

          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{
                  marginTop: "4rem",
                  marginBottom: "4rem",
                }}
              >
                {newTurbines.length === 0 && (
                  <Typography variant="overline" sx={{ textAlign: "center" }}>
                    Nessuna turbina nell'anno corrente
                  </Typography>
                )}
                {newTurbines.length !== 0 && newTurbines.map((turbine) => {
                  const turbineSteps = steps.filter(
                    (step) => step.eventId === turbine.id
                  );
                  return (
                    <Grid item key={turbine.id} >
                      <Turbine
                        turbine={turbine}
                        steps={turbineSteps}
                        completeStep={handleStepComplete}
                        incompleteStep={handleStepIncomplete}
                        handleOpenDetail={() => {
                          setCurrentTurbine(turbine);
                          setCurrentSteps(turbineSteps);
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                  marginBottom: "4rem",
                }}
              >

                <Accordion
                  sx={{
                    width: "90%",
                    maxWidth: "1000px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6">Anni precedenti al {new Date().getFullYear()}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      spacing={3}
                      justifyContent="center"
                      sx={{
                        marginTop: "4rem",
                        marginBottom: "4rem",
                      }}
                    >
                      {oldTurbines.length === 0 && (
                        <Typography variant="overline" sx={{ textAlign: "center" }}>
                          Nessuna turbina negli anni precedenti
                        </Typography>
                      )}
                      {oldTurbines.length !== 0 && oldTurbines.map((turbine) => {
                        const turbineSteps = steps.filter(
                          (step) => step.eventId === turbine.id
                        );
                        return (
                          <Grid item key={turbine.id} >
                            <Turbine
                              turbine={turbine}
                              steps={turbineSteps}
                              completeStep={handleStepComplete}
                              incompleteStep={handleStepIncomplete}
                              handleOpenDetail={() => {
                                setCurrentTurbine(turbine);
                                setCurrentSteps(turbineSteps);
                              }}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        )}
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography variant="overline" p={1}>
          UTENTE NON AUTORIZZATO
        </Typography>
      </Popover>
      {openCreation && (
        <CreationForm
          updateNewTurbine={(data) => {
            handleTurbineAdd(data);
          }}
          handleClose={() => setOpenCreation(false)}
        />
      )}
      {currentTurbine && deletionModalOpen && (
        <DeletionModal
          turbineId={currentTurbine.id}
          turbineName={currentTurbine.turbineName}
          handleTurbineDeletion={(id) => handleDeletion(id)}
          handleClose={() => setDeletionModalOpen(false)}
        />
      )}

      {!openCreation && !openModification && (
        <BottomNavigation
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 1,
            backgroundColor: "bottomBarColor",
            borderTop: "1px solid #e0f1f8",
            borderBottom: "1px solid #e0f1f8",
            boxShadow: "0px -1px 0px 0px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 2px 0px 0px rgba(0,0,0,0.12)",
            padding: "0px",
            margin: "0px",
          }}
        >
          {((currentTurbine && !openModification) || consoleOpen) && (
            <BottomNavigationAction
              label="back"
              onClick={() => {
                handleBack();
              }}
              icon={<ArrowBackIosIcon sx={{ fontSize: 32, color: "#000" }} />}
            />
          )}
          {!openCreation && !currentTurbine && !consoleOpen && (
            <BottomNavigationAction
              label="export"
              onClick={handleExport}
              disabled={
                !isAuthenticated || (turbinesReady && turbines.length === 0)
              }
              icon={
                <DownloadIcon
                  sx={{
                    fontSize: 32,
                    color: isAuthenticated
                      ? turbines && turbines.length > 0
                        ? "#000"
                        : "primary.contrastText"
                      : "#f44336",
                  }}
                />
              }
            />
          )}
          {!openCreation && !currentTurbine && !consoleOpen && (
            <BottomNavigationAction
              label="create"
              onClick={
                isAuthenticated
                  ? () => setOpenCreation(true)
                  : (event) => setAnchorEl(event.currentTarget)
              }
              icon={
                <AddCircleOutlineIcon
                  sx={{
                    fontSize: 32,
                    color: isAuthenticated ? "#000" : "#f44336",
                  }}
                />
              }
            />
          )}
          {currentTurbine && !openModification && (
            <BottomNavigationAction
              label="delete"
              onClick={() => setDeletionModalOpen(true)}
              icon={<DeleteIcon sx={{ fontSize: 42, color: "#000" }} />}
            />
          )}
          {currentTurbine && !openModification && (
            <BottomNavigationAction
              disabled={currentTurbine.completedSteps === currentSteps.length}
              label="edit"
              onClick={() => {
                setOpenModification(true);
              }}
              icon={
                <EditIcon
                  sx={{
                    fontSize: 32,
                    color: "#000"
                  }}
                />
              }
            />
          )}
          {!openCreation && !currentTurbine && !consoleOpen && (
            <BottomNavigationAction
              label="refresh"
              onClick={() => {
                window.location.reload(false);
              }}
              icon={<CachedIcon sx={{ fontSize: 32, color: "#000" }} />}
            />
          )}
        </BottomNavigation>
      )}
    </ThemeProvider>
  );
};

export default App;
