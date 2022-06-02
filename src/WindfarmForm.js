import SaveIcon from "@mui/icons-material/Save";
import {
    Box,
    Button, Grid, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { default as React, useState } from 'react';

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #284871',
    boxShadow: 24,
    p: 4,
};

const WindfarmForm = (props) => {

    const defaultEvent = {
        turbinName: "",
        description: "",
        operation: "Sost. Generatore",
        startEEMM: null,
        startOOCC: null,
    };

    const [formValues, setFormValues] = useState(defaultEvent)
    const [dateEMValue, setEMDateValue] = useState(null);
    const [dateOCValue, setOCDateValue] = useState(null);

    const handleInputChange = (e) => {
        console.log(formValues);
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = () => {

        // Validate form
        setEMDateValue(null);
        setOCDateValue(null);
        // Post to the server and get back the entity
        // Updated the data with the received entity and add to local state
        const newTurbine = {
            ...formValues,
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // TODO: remove generated id and use the one coming from the server
        };
        props.onAddedWindfarm(newTurbine);
        setFormValues(defaultEvent);
    }

    return (
        <Box sx={formStyle} >
            <Typography align="center" id="modal-modal-title" variant="h6" >
                CREA NUOVO INTERVENTO
            </Typography>
            <Box pt={3} />
            <Grid container direction="column" justifyContent="center" alignItems="center" rowSpacing={2}>

                <Grid item xs={12}>
                    <TextField style={{ width: 250, height: 50 }}
                        id="turbine-input"
                        name="turbinName"
                        label="Impianto Eolico"
                        type="text"
                        value={formValues.turbinName}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField style={{ width: 250, height: 50 }}
                        id="description-input"
                        name="description"
                        label="Aerogeneratore"
                        type="text"
                        value={formValues.description}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select style={{ width: 250, height: 50 }}
                        name="operation" value={formValues.operation} onChange={handleInputChange}>
                        <MenuItem key="1" value="Sost. Generatore">Sost. Generatore</MenuItem>
                        <MenuItem key="2" value="Sost. Gearbox">Sost. Gearbox</MenuItem>
                        <MenuItem key="3" value="Root Joint">Root Joint</MenuItem>
                        <MenuItem key="4" value="Pitch Rod">Pitch Rod</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} >
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            label="Avvio attività OOCC"
                            value={dateOCValue}
                            inputFormat="dd-MM-yyyy"
                            onChange={(newValue) => {

                                setOCDateValue(newValue);
                                setFormValues({
                                    ...formValues,
                                    startOOCC: newValue.getDate() + '-' + (newValue.getMonth() + 1) + '-' + newValue.getFullYear(),
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} >
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            label="Avvio attività EEMM"
                            value={dateEMValue}
                            inputFormat="dd-MM-yyyy"
                            onChange={(newValue) => {

                                setEMDateValue(newValue);
                                setFormValues({
                                    ...formValues,
                                    startEEMM: newValue.getDate() + '-' + (newValue.getMonth() + 1) + '-' + newValue.getFullYear(),
                                })
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Box pt={3} />
                <Grid item xs={12} >
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                    >
                        SALVA
                    </Button>
                </Grid>
            </Grid>
        </Box >
    );
}

export default WindfarmForm;
