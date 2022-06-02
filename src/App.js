import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar,
  Box, Container, GlobalStyles, Grid, IconButton, Modal
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

  // Modal status
  const [open, setOpen] = React.useState(false);

  // Existing windfarms
  const [turbines, setTurbines] = useState(TURBINE_DUMMY_DATA);

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
            return (
              <Grid item xs={8} key={turbine.id}>
                <Turbine turbine={turbine} />
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
