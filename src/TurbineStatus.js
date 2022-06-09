import AutoModeIcon from '@mui/icons-material/AutoMode';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import {
    Box, IconButton, Popover, Typography
} from "@mui/material";
import { default as React } from 'react';

const states = {
    ok: "OK",
    warning: "WARNING",
    error: "ERROR"
}

const TurbineStatus = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopup = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let status = states.ok;
    if (props.turbineState === "Limitata") {
        status = states.warning;
    } else if (props.turbineState === "Ferma") {
        status = states.error;
    }

    return (
        <Box>
            {status === states.ok &&
                <IconButton onClick={handlePopup} >
                    <AutoModeIcon color="success" fontSize='large'/>
                </IconButton>
            }
            {status === states.warning &&
                <IconButton onClick={handlePopup} >
                    <WarningIcon color="warning" fontSize='large'/>
                </IconButton>
            }
            {status === states.error &&
                <IconButton onClick={handlePopup} >
                    <ErrorIcon color="error" fontSize='large'/>
                </IconButton>
            }
            <Popover
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Typography variant="overline" p={1}>
                    Turbina: {props.turbineState}
                </Typography>
            </Popover>
        </Box >
    );
}

export default TurbineStatus;