import { Backdrop, Box, Button, Grid, Modal, Typography } from "@mui/material";

import { default as React } from "react";
import eventService from "./services/appService";

const formStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #284871",
  boxShadow: 24,
  p: 3,
};

const DeletionModal = (props) => {
  const handleTurbineDeletion = () => {
    eventService.deleteTurbine(props.turbineId).then((response) => {
      if (response.status === 200) {
        props.handleTurbineDeletion(props.turbineId);
      }
    });
  };

  return (
    <Modal
      open={true}
      title="Eliminazione intervento"
      onClose={() => {
        props.handleClose();
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={formStyle}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowGap={2}
        >
          <Typography variant="h6" component="h2">
            Eliminare intervento?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            L'eliminazione dell'intervento associato alla turbina con nome:{" "}
            <b>{props.turbineName}</b> sarà permanente.
          </Typography>
          <Button variant="contained" onClick={handleTurbineDeletion}>
            ELIMINA
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeletionModal;
