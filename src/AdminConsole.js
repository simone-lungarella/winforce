import {
    Box
} from "@mui/material";

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

const AdminConsole = (props) => {

    return (
        <Box sx={formStyle} >
            
        </Box >
    );
}

export default AdminConsole;
