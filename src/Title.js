import React from 'react';
import AppTitle from "./Title.svg";
import Box from "@mui/material/Box";

const Title = () => {

    return (
        <Box
            component="img"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: 54,
            }}
            padding={1}

            alt="App title"
            src={AppTitle}
        />
    )
};

export default Title;
