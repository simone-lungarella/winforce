import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box, Button, FormControl, Grid, IconButton, OutlinedInput, TextField, Select, MenuItem, Typography
} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import eventService from "./services/appService";


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

const AddUserForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [errorMsg, setErrorMsg] = useState('');
    const [okMsg, setOkMsg] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = async () => {

        eventService.createUser(username, password, role).then(() => {
            setOkMsg('Utente creato con successo');
            setErrorMsg('');

            setUsername('');
            setPassword('');
            setRole('USER');
        }).catch((error) => {
            if (error.response?.status === 409) {
                const msg = 'Username ' + username + ' già utilizzato';
                console.log(msg);
                setErrorMsg(msg);
            } else {
                setErrorMsg('Errore durante la creazione');
            }
            setOkMsg('');
        });
    }
    return (
        <Box sx={formStyle} >
            <Grid container direction="column" justifyContent="center" alignItems="center" rowGap={2} >

                {errorMsg &&
                    <Typography color="error" variant="overline">{errorMsg}</Typography>
                }

                {
                    okMsg &&
                    <Typography color="success" variant="overline">{okMsg}</Typography>
                }

                <TextField style={{ width: 250, height: 50 }}
                    required
                    id="username-input"
                    name="username"
                    label="Nome utente"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormControl variant="outlined" style={{ width: 250, height: 50 }}>
                    <InputLabel>Password *</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        label="Password"
                        name="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    edge="end"
                                >
                                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Select style={{ width: 250, height: 50 }}
                    name="userRole" value={role} onChange={(e) => { setRole(e.target.value) }}>
                    <MenuItem key="1" value="USER">Utente</MenuItem>
                    <MenuItem key="2" value="ADMIN">Amministratore</MenuItem>
                </Select>
                <Button
                    disabled={username === "" || password === ""}
                    variant="contained"
                    endIcon={<PersonAddAltIcon />}
                    onClick={handleSubmit}
                >
                    AGGIUNGI
                </Button>
            </Grid>
        </Box >
    );
}

export default AddUserForm;
