import AutoModeIcon from "@mui/icons-material/AutoMode";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";

const states = {
  ok: "OK",
  warning: "WARNING",
  error: "ERROR",
};

const Turbine = (props) => {
  const stepsNames = props.steps.map((filtered) => filtered.name);
  let reachedStep =
    stepsNames.length > 0
      ? stepsNames[props.turbine.completedSteps]
      : "No step found";
  if (props.turbine.completedSteps === stepsNames.length) {
    reachedStep = "COMPLETATO";
  }
  let percentage = 0;
  if (stepsNames.length > 0) {
    percentage = Math.round(
      (props.turbine.completedSteps / stepsNames.length) * 100
    );
  }

  let status = states.ok;
  if (props.turbine.turbineState === "Limitata") {
    status = states.warning;
  } else if (props.turbine.turbineState === "Ferma") {
    status = states.error;
  }

  const isOvertime =
    props.turbine.permittingDate + 90 * 24 * 60 * 60 * 1000 >
    new Date().getTime();

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color={
          percentage === 100
            ? "success"
            : percentage < 80 && isOvertime
            ? "error"
            : "primary"
        }
        onClick={props.handleOpenDetail}
        sx={{
          width: 280,
          height: 100,
        }}
      >
        <Grid container direction="row" justifyContent="left">
          <Grid
            item
            sx={{
              // Lock position
              position: "absolute",
              top: "5%",
              left: "2%",
              zIndex: 1,
            }}
          >
            {status === states.ok && (
              <AutoModeIcon
                color={percentage === 100 ? "secondary" : "success"}
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: "50%",
                  p: 0.5,
                }}
                fontSize="large"
              />
            )}
            {status === states.warning && (
              <WarningIcon
                color={percentage === 100 ? "secondary" : "warning"}
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  p: 0.5,
                }}
                fontSize="large"
              />
            )}
            {status === states.error && (
              <ErrorIcon
                color={percentage === 100 ? "secondary" : "error"}
                sx={{
                  // Dark grey bg color
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: "50%",
                  p: 0.5,
                }}
                fontSize="large"
              />
            )}
          </Grid>
          <Box sx={{ flexGrow: 0.5 }} />
          <Grid item>
            <Grid container direction="column" justifyContent="right">
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: "bold",
                  width: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "wrap",
                }}
              >
                <b>
                  {props.turbine.turbineName} {props.turbine.turbineNumber}
                  {" ("}
                  {props.turbine.description}
                  {")"}
                </b>
              </Typography>
              <Typography variant="body2"> {reachedStep}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Button>
      <Box sx={{ mr: 1, width: 280 }}>
        <LinearProgress
          color={percentage === 100 ? "secondary" : "success"}
          variant="determinate"
          value={percentage}
          sx={{
            borderRadius: 5,
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default Turbine;
