import React from 'react';
import Title from "./ErgTitle.svg";
import Box from "@mui/material/Box";

const ErgLogo = () => {

    return (
        <Box
            component="img"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: 64,
            }}
            padding={1}

            alt="ERG title"
            src={Title}
        />
    )
};

export default ErgLogo;
