import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { default as React, useState } from 'react';
import { MobileDatePicker } from "@mui/x-date-pickers";
import EventIcon from '@mui/icons-material/Event';

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #284871',
    boxShadow: 24,
    p: 3,
};

const defaultEvent = {
    turbineName: "",
    description: "",
    operation: "",
    turbineState: "MARCHING",
    startingDateEEMM: null,
    startingDateOOCC: null,
};

const WindfarmForm = (props) => {

    const [formValues, setFormValues] = useState(defaultEvent)
    const [dateEMValue, setEMDateValue] = useState(null);
    const [dateOCValue, setOCDateValue] = useState(null);

    const [isEMOpen, setIsEMOpen] = useState(false);
    const [isOCOpen, setIsOCOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = () => {

        if (formValues.name !== "" && formValues.description !== "") {

            formValues.startingDateEEMM = dateEMValue;
            formValues.startingDateOOCC = dateOCValue;

            setEMDateValue(null);
            setOCDateValue(null);
            props.onAddedWindfarm(formValues);
            console.log(formValues);
            setFormValues(defaultEvent);
        }
    }

    return (
        <Box sx={formStyle} >
            <Typography align="center" id="modal-modal-title" variant="h6" >
                CREA NUOVO INTERVENTO
            </Typography>
            <Box pt={3} />
            <Grid container direction="column" alignItems="center" rowSpacing={2}>

                <Grid item >
                    <TextField style={{ width: 250, height: 50 }}
                        required
                        error={formValues.turbineName === ""}
                        id="turbine-input"
                        name="turbineName"
                        label="Aerogeneratore"
                        type="text"
                        value={formValues.turbineName}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item >
                    <TextField style={{ width: 250, height: 50 }}
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
                <Grid item >
                    <TextField style={{ width: 250, height: 50 }}
                        required
                        error={formValues.operation === ""}
                        id="operation-input"
                        name="operation"
                        label="Tipologia intervento"
                        type="text"
                        value={formValues.operation}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item >
                    <Select style={{ width: 250, height: 50 }}
                        name="turbineState" value={formValues.turbineState} onChange={handleInputChange}>
                        <MenuItem key="1" value="MARCHING">In marcia</MenuItem>
                        <MenuItem key="2" value="STANDING">Ferma</MenuItem>
                        <MenuItem key="3" value="LIMITED">Limitata</MenuItem>
                    </Select>
                </Grid>
                <Grid item >
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDatePicker
                            label="Avvio attività OOCC"
                            value={dateOCValue}
                            open={isOCOpen}
                            onOpen={() => { setIsOCOpen(true) }}
                            onClose={() => { setIsOCOpen(false) }}
                            onChange={setOCDateValue}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={() => { setIsOCOpen(true) }}>
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
                <Grid item >
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDatePicker
                            label="Avvio attività EEMM"
                            value={dateEMValue}
                            open={isEMOpen}
                            onOpen={() => { setIsEMOpen(true) }}
                            onClose={() => { setIsEMOpen(false) }}
                            onChange={setEMDateValue}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={() => { setIsEMOpen(true) }}>
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
                <Grid container direction="row" justifyContent="center" alignItems="center"  >
                    <Grid item m={4} xs={2}>
                        <Button
                            variant="contained"
                            startIcon={<CloseIcon />}
                            onClick={props.onClose}>
                            CHIUDI
                        </Button>
                    </Grid>
                    <Grid item xs={4} m={4}>
                        <Button
                            disabled={formValues.name === "" || formValues.description === ""}
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSubmit}
                        >
                            SALVA
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Box >
    );
}

export default WindfarmForm;
