import React from 'react';
import Logo from "./logo.svg";
import Box from "@mui/material/Box";

const ErgLogo = () => {

    return (
        <Box
            component="img"
            sx={{
                height: 64,
            }}
            padding={2}
            alt="ERG logo"
            src={Logo}
        />
    )
};

export default ErgLogo;
