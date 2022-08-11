import React from 'react';
import Logo from "./logo.svg";
import Box from "@mui/material/Box";

const AppLogo = () => {

    return (
        <Box
            component="img"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '0%',
                transform: 'translate(10%, -50%)',
                height: 64,
            }}

            alt="App logo"
            src={Logo}
        />
    )
};

export default AppLogo;
