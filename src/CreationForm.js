import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { default as React, useState } from "react";
import Header from "./Header";

const formStyle = {
  overflow: "auto",
  padding: "20px",
  marginBottom: "3rem",
};

const defaultEvent = {
  turbineName: "",
  turbineNumber: "XXXX",
  description: "",
  odlNumber: 0,
  power: "MEGAWATT",
  operation: ["Sostituzione Traversa"],
  turbineState: "In marcia",
  startingDateEEMM: null,
  startingDateOOCC: null,
};

const CreationForm = (props) => {
  const [formValues, setFormValues] = useState(defaultEvent);
  const [dateEMValue, setEMDateValue] = useState(null);
  const [dateOCValue, setOCDateValue] = useState(
    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  const [isEMOpen, setIsEMOpen] = useState(false);
  const [isOCOpen, setIsOCOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    formValues.startingDateEEMM = dateEMValue;
    formValues.startingDateOOCC = dateOCValue;

    if (name === "power") {
      if (value === "MEGAWATT") {
        setOCDateValue(
          new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        );
      } else {
        setOCDateValue(
          new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
        );
      }
    }
  };

  const handleTurbineAdd = () => {
    props.updateNewTurbine(formValues);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: "80px",
        }}
      />
      <Header title="CREA INTERVENTO" />

      <Box sx={formStyle}>
        <Grid container direction="column" alignItems="center" rowSpacing={2}>
          <Grid item>
            <TextField
              style={{ width: 180, height: 50 }}
              required
              error={formValues.turbineName === ""}
              id="turbine-input"
              name="turbineName"
              label="Aerogeneratore"
              type="text"
              value={formValues.turbineName}
              onChange={handleInputChange}
            />
            <TextField
              style={{ width: 70, height: 50 }}
              id="turbine-number"
              name="turbineNumber"
              type="text"
              value={formValues.turbineNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: 250, height: 50 }}
              required
              error={formValues.description === ""}
              id="description-input"
              name="description"
              label="Impianto Eolico"
              type="text"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: 250, height: 50 }}
              id="odl-number"
              name="odlNumber"
              label="Numero ODL"
              type="number"
              value={formValues.odlNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Select
              style={{ width: 250, height: 50 }}
              name="operation"
              value={formValues.operation}
              onChange={handleInputChange}
              multiple
              error={formValues.operation.length === 0}
              required
            >
              <MenuItem key="1" value="Sostituzione Traversa">
                Sost. Traversa
              </MenuItem>
              <MenuItem key="2" value="Riparazione pale">
                Riparazione pale
              </MenuItem>
              <MenuItem key="3" value="Sostituzione trafo">
                Sost. trafo
              </MenuItem>
              <MenuItem key="4" value="Sostituzione generatore">
                Sost. generatore
              </MenuItem>
              <MenuItem key="5" value="Sostituzione Ralla">
                Sost. Ralla
              </MenuItem>
              <MenuItem key="6" value="Pulizia Tubolare">
                Pulizia tubolare
              </MenuItem>
              <MenuItem key="7" value="Sostituzione IMS">
                Sost. IMS
              </MenuItem>
              <MenuItem key="8" value="Serraggio bulloni nose cone">
                Serraggio Nose Cone
              </MenuItem>
              <MenuItem key="9" value="Sostituzione Stella HUB">
                Sost. Stella HUB
              </MenuItem>
              <MenuItem key="10" value="Sostituzione Pala discesa rotore">
                Sost. Pala discesa rotore
              </MenuItem>
              <MenuItem key="11" value="Sostituzione cuscinetto">
                Sost. cuscinetto
              </MenuItem>
              <MenuItem key="12" value="Sostituzione Asta Pitch">
                Sost. Asta Pitch
              </MenuItem>
              <MenuItem key="13" value="Sostituzione Yaw Gear">
                Sost. Yaw Gear
              </MenuItem>
              <MenuItem key="14" value="Sostituzione Gearbox">
                Sost. Gearbox
              </MenuItem>
              <MenuItem key="15" value="Sostituzione Pala RJ">
                Sost. Pala RJ
              </MenuItem>
              <MenuItem key="16" value="Sostituzione Albero lento">
                Sost. Albero lento
              </MenuItem>
              <MenuItem key="17" value="Ispezione RJ">
                Ispezione RJ
              </MenuItem>
              <MenuItem key="18" value="Manutenzione ordinaria viabilità">
                Manutenzione ordinaria viabilità
              </MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select
              style={{ width: 250, height: 50 }}
              name="turbineState"
              value={formValues.turbineState}
              onChange={handleInputChange}
            >
              <MenuItem key="1" value="In marcia">
                In marcia
              </MenuItem>
              <MenuItem key="2" value="Ferma">
                Ferma
              </MenuItem>
              <MenuItem key="3" value="Limitata">
                Limitata
              </MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select
              style={{ width: 250, height: 50 }}
              name="power"
              value={formValues.power}
              onChange={handleInputChange}
            >
              <MenuItem key="1" value="MEGAWATT">
                Megawatt
              </MenuItem>
              <MenuItem key="2" value="KILOWATT">
                Kilowatt
              </MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Avvio attività OOCC"
                value={dateOCValue}
                open={isOCOpen}
                onOpen={() => {
                  setIsOCOpen(true);
                }}
                onClose={() => {
                  setIsOCOpen(false);
                }}
                onChange={setOCDateValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setIsOCOpen(true);
                            }}
                          >
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Avvio attività EEMM"
                value={dateEMValue}
                open={isEMOpen}
                onOpen={() => {
                  setIsEMOpen(true);
                }}
                onClose={() => {
                  setIsEMOpen(false);
                }}
                onChange={setEMDateValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setIsEMOpen(true);
                            }}
                          >
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
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
        <BottomNavigationAction
          label="back"
          onClick={props.handleClose}
          icon={<ArrowBackIosIcon sx={{ fontSize: 46 }} color="primary" />}
        />
        <BottomNavigationAction
          label="create"
          onClick={() => {
            handleTurbineAdd();
          }}
          disabled={
            formValues.turbineName === "" ||
            formValues.description === "" ||
            formValues.operation.length === 0
          }
          icon={<SaveIcon sx={{ fontSize: 42 }} color="primary" />}
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default CreationForm;
