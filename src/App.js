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

import {
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
  MenuItem, Popover,
  Snackbar,
  ThemeProvider,
  Typography
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
      main: "#4a7ec0",
      dark: "#3c6baa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#39621d",
      dark: "#ba000d",
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
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

const App = () => {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [turbinesReady, setTurbinesReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);

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
          setTurbinesReady(true);
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
    eventService
      .alterTurbine(updateTurbine)
      .then((response) => {
        if (response.status === 200) {
          setTurbines(
            turbines.map((t) => (t.id === updateTurbine.id ? updateTurbine : t))
          );
          setCurrentTurbine(null);
          setCurrentSteps([]);
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
            backgroundColor: "#98acdc",
          },
          "*::-webkit-scrollbar": {
            width: "0.4em",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        }}
      />
      <AppBar
        position="relative"
        style={{
          backgroundColor: "#132F4D",
          color: "#fff",
          backgroundImage: `linear-gradient(to bottom, #132F4A, #132F4F)`,
          opacity: 0.9,
        }}
      >
        <ToolBar
          sx={{
            height: 80,
          }}
        >
          {/* Logo app */}
          <img
            src={logo}
            alt="logo"
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
            }}
          />

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
                  <Typography variant="overline" sx={{ fontSize: 18 }}>
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
                  <Typography variant="overline" sx={{ fontSize: 18 }}>
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
              fontSize: 48,
            }}
          >
            <MenuIcon
              color={isAuthenticated ? "success" : "error"}
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
        open={isDeleted || isAltered || isCreated || isExported || userAdded}
        autoHideDuration={3000}
        onClose={() => {
          setIsDeleted(false);
          setIsAltered(false);
          setIsCreated(false);
          setIsExported(false);
          setUserAdded(false);
        }}
        action={snackbarAction}
      >
        <Alert
          onClose={() => {
            setIsDeleted(false);
            setIsAltered(false);
            setIsCreated(false);
            setIsExported(false);
            setUserAdded(false);
          }}
          severity={
            isDeleted
              ? "error"
              : isAltered || isCreated || userAdded
              ? "success"
              : "info"
          }
        >
          {isDeleted
            ? "Intervento eliminato!"
            : isAltered
            ? "Intervento modificato!"
            : isCreated
            ? "Intervento creato!"
            : isExported
            ? "Esportazione completata!"
            : "Utente creato!"}
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
            direction="column"
            alignItems="center"
            spacing={3}
            sx={{
              marginTop: "1rem",
              marginBottom: "5rem",
            }}
          >
            {turbines.map((turbine) => {
              const turbineSteps = steps.filter(
                (step) => step.eventId === turbine.id
              );
              return (
                <Grid item key={turbine.id}>
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
        />
      )}

      {!openCreation && !openModification && (
        <BottomNavigation
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 1,
            backgroundColor: "#98acdc",
            borderTop: "1px solid #e0f1f8",
            borderBottom: "1px solid #e0f1f8",
            boxShadow:
              "0px -1px 0px 0px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 2px 0px 0px rgba(0,0,0,0.12)",
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
              icon={<ArrowBackIosIcon sx={{ fontSize: 46 }} color="primary" />}
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
                  sx={{ fontSize: 48 }}
                  color={
                    isAuthenticated
                      ? turbines && turbines.length > 0
                        ? "primary"
                        : "#fff"
                      : "error"
                  }
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
                  sx={{ fontSize: 48 }}
                  color={isAuthenticated ? "primary" : "error"}
                />
              }
            />
          )}
          {currentTurbine && !openModification && (
            <BottomNavigationAction
              label="delete"
              onClick={() => setDeletionModalOpen(true)}
              icon={<DeleteIcon sx={{ fontSize: 42 }} color="primary" />}
            />
          )}
          {currentTurbine && !openModification && (
            <BottomNavigationAction
              label="edit"
              onClick={() => {
                setOpenModification(true);
              }}
              icon={<EditIcon sx={{ fontSize: 46 }} color="primary" />}
            />
          )}
          {!openCreation && !currentTurbine && !consoleOpen && (
            <BottomNavigationAction
              label="refresh"
              onClick={() => {
                window.location.reload(false);
              }}
              icon={<CachedIcon color="primary" sx={{ fontSize: 48 }} />}
            />
          )}
        </BottomNavigation>
      )}
    </ThemeProvider>
  );
};

export default App;
