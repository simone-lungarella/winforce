import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
import { default as React, useEffect, useState } from "react";
import Header from "./Header";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const ModificationForm = (props) => {
  const [formValues, setFormValues] = useState(props.turbine);
  const [dateEMValue, setEMDateValue] = useState(null);
  const [dateOCValue, setOCDateValue] = useState(null);
  const [permittinDateValue, setPermittingDateValue] = useState(null);
  const [prioNotificationValue, setPrioNotificationValue] = useState(null);
  
  const [isEMOpen, setIsEMOpen] = useState(false);
  const [isOCOpen, setIsOCOpen] = useState(false);
  const [isPermittingOpen, setIsPermittingOpen] = useState(false);
  const [isPrioNotificationOpen, setIsPrioNotificationOpen] = useState(false);
  
  useEffect(() => {
    setFormValues(props.turbine);
    if (props.turbine != null && props.turbine.startingDateEEMM != null) {
      setEMDateValue(props.turbine.startingDateEEMM);
    }

    if (props.turbine != null && props.turbine.startingDateOOCC != null) {
      setOCDateValue(props.turbine.startingDateOOCC);
    }

    if (props.turbine != null && props.turbine.permittingDate != null) {
      setPermittingDateValue(props.turbine.permittingDate);
    }

    if (props.turbine != null && props.turbine.priorNotification != null) {
      setPrioNotificationValue(props.turbine.priorNotification);
    }

  }, [props.turbine]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleTurbineUpdate = () => {

    formValues.startingDateEEMM = dateEMValue;
    formValues.startingDateOOCC = dateOCValue;
    formValues.permittingDate = permittinDateValue;
    formValues.prioNotificationDate = prioNotificationValue;

    props.onUpdatedWindfarm(formValues);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: "80px",
        }}
      />
      <Header title="MODIFICA" />
      <Box sx={{
        margin: "3rem",
        marginBottom: "5rem",
        display: "flex",
      }}>
        <Box pt={3} />
        <Grid container rowSpacing={4} alignItems="center" justify="center" alignContent="center" textAlign="center">
          <Grid item xs={12} md={6} lg={4} >
            <TextField
              style={{ width: 180, height: 50 }}
              required
              disabled
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
          <Grid item xs={12} md={6} lg={4}>
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
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              style={{ width: 250, height: 50 }}
              id="odl-number-mod"
              name="odlNumber"
              label="Numero ODL"
              type="text"
              value={formValues.odlNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              style={{ width: 250, height: 50, textAlign: "left" }}
              name="operation"
              value={formValues.operation}
              onChange={handleInputChange}
              multiple
              error={formValues.operation.length === 0}
              required
              MenuProps={MenuProps}
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
              <MenuItem key="18" value="Sostituzione Blade Bearing">
                Sostituzione Blade Bearing
              </MenuItem>
              <MenuItem key="19" value="Sostituzione Main Bearing">
                Sostituzione Main Bearing
              </MenuItem>
              <MenuItem key="20" value="Manutenzione ordinaria viabilità">
                Manutenzione ordinaria viabilità
              </MenuItem>
              <MenuItem key="21" value="Attività Varie">
                Attività Varie
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              style={{ width: 250, height: 50, textAlign: "left" }}
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
          <Grid item xs={12} md={6} lg={4}>
            <Select
              style={{ width: 250, height: 50, textAlign: "left" }}
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
          <Grid item xs={12} md={6} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Notifica preliminare"
                value={prioNotificationValue}
                open={isPrioNotificationOpen}
                onOpen={() => {
                  setIsPrioNotificationOpen(true);
                }}
                onClose={() => {
                  setIsPrioNotificationOpen(false);
                }}
                onChange={setPrioNotificationValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setIsPrioNotificationOpen(true);
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
          <Grid item xs={12} md={6} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Attività Permitting"
                value={permittinDateValue}
                open={isPermittingOpen}
                onOpen={() => {
                  setIsPermittingOpen(true);
                }}
                onClose={() => {
                  setIsPermittingOpen(false);
                }}
                onChange={setPermittingDateValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setIsPermittingOpen(true);
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
          <Grid item xs={12} md={6} lg={4}>
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
          <Grid item xs={12} md={6} lg={4}>
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
          backgroundColor: "#85a99c",
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
          icon={<ArrowBackIosIcon sx={{ fontSize: 32 }} color="primary" />}
        />
        <BottomNavigationAction
          label="edit"
          onClick={() => {
            handleTurbineUpdate();
          }}
          icon={<SaveIcon sx={{ fontSize: 32 }} color="primary" />}
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default ModificationForm;
