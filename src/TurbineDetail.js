import LabelIcon from "@mui/icons-material/Label";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { default as React } from "react";
import Header from "./Header";
import Subheader from "./Subheader";
import TurbineSteps from "./TurbineSteps";

const TurbineDetail = (props) => {
  let orderedSteps = [];
  if (Array.isArray(props.stepList)) {
    orderedSteps = props.stepList.sort((a, b) => a.id - b.id);
  }

  let turbineName = props.turbineMaster.turbineName.toUpperCase();
  if (turbineName.length > 8) {
    turbineName = turbineName.substring(0, 8) + "...";
  }

  return (
    <Box
      sx={{
        marginTop: "80px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "20px",
      }}
    >
      <Header title={turbineName + " - " + props.turbineMaster.turbineNumber} />
      <Grid container direction="column" alignItems="center">
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="overline"> Parco eolico </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ textAlign: "right" }}>
              {" "}
              {props.turbineMaster.description}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="overline"> Stato turbina </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ textAlign: "right" }}>
              {" "}
              {props.turbineMaster.turbineState}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="overline"> Creazione </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ textAlign: "right" }}>
              {" "}
              {props.turbineMaster.creationDate.substring(0, 10)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="overline"> Inizio att. EEMM </Typography>
          </Grid>
          <Grid item xs={6}>
            {props.turbineMaster.startingDateEEMM && (
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {" "}
                {props.turbineMaster.startingDateEEMM}{" "}
              </Typography>
            )}
            {!props.turbineMaster.startingDateEEMM && (
              <Typography variant="body1" sx={{ textAlign: "right" }}>
                Non assegnato
              </Typography>
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="overline"> Inizio att. OOCC </Typography>
          </Grid>
          <Grid item xs={6}>
            {props.turbineMaster.startingDateOOCC && (
              <Typography variant="body1" sx={{ textAlign: "right" }}>
                {" "}
                {props.turbineMaster.startingDateOOCC}{" "}
              </Typography>
            )}
            {!props.turbineMaster.startingDateOOCC && (
              <Typography variant="body1" sx={{ textAlign: "right" }}>
                {" "}
                Non assegnato{" "}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Subheader title="OPERAZIONI" />
      <Grid item>
        <List component="nav">
          {props.turbineMaster.operation.map((operation) => (
            <ListItem key={operation}>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText>{operation}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Subheader title="STEP" />
      <TurbineSteps
        reachedStep={props.reachedStep}
        steps={orderedSteps}
        stepComplete={props.stepComplete}
        stepIncomplete={props.stepIncomplete}
        completionDate={props.turbineMaster.completionDate}
      />
    </Box>
  );
};

export default TurbineDetail;
