import CloseIcon from "@mui/icons-material/Close";
import EventIcon from '@mui/icons-material/Event';
import SaveIcon from "@mui/icons-material/Save";
import {
    Box,
    Button, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { default as React, useState } from 'react';

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
    turbineNumber: "XXXX",
    description: "",
    power: "MEGAWATT",
    operation: ["Asta pitch"],
    turbineState: "In marcia",
    startingDateEEMM: null,
    startingDateOOCC: null,
};

const CreationForm = (props) => {

    const [formValues, setFormValues] = useState(defaultEvent)
    const [dateEMValue, setEMDateValue] = useState(null);
    const [dateOCValue, setOCDateValue] = useState(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));

    const [isEMOpen, setIsEMOpen] = useState(false);
    const [isOCOpen, setIsOCOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        if (name === "power") {
            if (value === "MEGAWATT") {
                setOCDateValue(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
            } else {
                setOCDateValue(new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000));
            }
        }
    };

    const handleSubmit = () => {

        formValues.startingDateEEMM = dateEMValue;
        formValues.startingDateOOCC = dateOCValue;

        props.onAddedWindfarm(formValues);
        setEMDateValue(null);
        setOCDateValue(null);
        setFormValues(defaultEvent);
    }

    return (
        <Box sx={formStyle} >
            <Typography align="center" id="modal-modal-title" variant="h6" >
                CREA NUOVO INTERVENTO
            </Typography>
            <Box pt={3} />
            <Grid container direction="column" alignItems="center" rowSpacing={2}>

                <Grid item >
                    <TextField style={{ width: 180, height: 50 }}
                        required
                        error={formValues.turbineName === ""}
                        id="turbine-input"
                        name="turbineName"
                        label="Aerogeneratore"
                        type="text"
                        value={formValues.turbineName}
                        onChange={handleInputChange}
                    />
                    <TextField style={{ width: 70, height: 50}}
                        disabled
                        id="turbine-number"
                        name="turbineNumber"
                        type="text"
                        value={formValues.turbineNumber}
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
                    <Select style={{ width: 250, height: 50 }}
                        name="operation" value={formValues.operation} onChange={handleInputChange} multiple >
                        <MenuItem key="1" value="Asta pitch">Asta pitch</MenuItem>
                        <MenuItem key="2" value="Riparazione pale">Riparazione pale</MenuItem>
                        <MenuItem key="3" value="Pulizia tubolare">Pulizia tubolare</MenuItem>
                    </Select>
                </Grid>
                <Grid item >
                    <Select style={{ width: 250, height: 50 }}
                        name="turbineState" value={formValues.turbineState} onChange={handleInputChange}>
                        <MenuItem key="1" value="In marcia">In marcia</MenuItem>
                        <MenuItem key="2" value="Ferma">Ferma</MenuItem>
                        <MenuItem key="3" value="Limitata">Limitata</MenuItem>
                    </Select>
                </Grid>
                <Grid item >
                    <Select style={{ width: 250, height: 50 }}
                        name="power" value={formValues.power} onChange={handleInputChange}>
                        <MenuItem key="1" value="MEGAWATT">Megawatt</MenuItem>
                        <MenuItem key="2" value="KILOWATT">Kilowatt</MenuItem>
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

export default CreationForm;
