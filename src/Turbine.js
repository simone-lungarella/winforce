import AutoModeIcon from "@mui/icons-material/AutoMode";
import ConstructionIcon from "@mui/icons-material/Construction";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WarningIcon from "@mui/icons-material/Warning";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
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

  const [bgImage, setBgImage] = React.useState("./image/Turbina.png");

  React.useEffect(() => {
    if (
      props.turbine.operation.includes("Riparazione pale") ||
      props.turbine.operation.includes("Sostituzione Blade Bearing") ||
      props.turbine.operation.includes("Sostituzione Main Bearing") ||
      props.turbine.operation.includes("Sostituzione Pala RJ") ||
      props.turbine.operation.includes("Sostituzione Pala discesa rotore")
    ) {
      setBgImage("./image/Pale.png");
    } else if (
      props.turbine.operation.includes("Sostituzione generatore") ||
      props.turbine.operation.includes("Sostituzione Yaw Gear") ||
      props.turbine.operation.includes("Sostituzione Yaw Gear") ||
      props.turbine.operation.includes("Sostituzione Gearbox") || 
      props.turbine.operation.includes("Ispezione RJ")
    ) {
      setBgImage("./image/Navicella.png");
    } else if (
      props.turbine.operation.includes("Pulizia Tubolare") ||
      props.turbine.operation.includes("Sostituzione Albero lento")
    ) {
      setBgImage("./image/Tubolare.png");
    } else if (
      props.turbine.operation.includes("Sostituzione Stella HUB") ||
      props.turbine.operation.includes("Serraggio bulloni nose cone") ||
      props.turbine.operation.includes("Sostituzione cuscinetto") ||
      props.turbine.operation.includes("Sostituzione Asta Pitch") ||
      props.turbine.operation.includes("Sostituzione Main Bearing") ||
      props.turbine.operation.includes("Sostituzione trafo") ||
      props.turbine.operation.includes("Sostituzione Ralla")
    ) {
      setBgImage("./image/Hub.png");
    } else if (props.turbine.operation.includes("Sostituzione IMS")) {
      setBgImage("./image/Cabina.png");
    } else {
      setBgImage("./image/Turbina.png");
    }
  }, [props.turbine]);

  // Calculating if the deadline is passed
  let date = null;
  if (props.turbine.permittingDate != null) {
    date = new Date(props.turbine.permittingDate);
    date.setDate(date.getDate() + 90);
  }

  const isOvertime = date != null && new Date() > date;

  return (
    <Card
      sx={{
        width: 300,
        backgroundColor:
          percentage === 100
            ? "secondary.main"
            : percentage < 80 && isOvertime
            ? "#f44336"
            : "#555",
        backgroundImage: `url(${require(`${bgImage}`)})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "wrap",
          }}
          color="primary.contrastText"
        >
          <b>
            {props.turbine.turbineName} {props.turbine.turbineNumber}
          </b>
        </Typography>
        <Typography variant="h6" color="primary.contrastText" 
          sx={{
            textTransform: "uppercase",
          }}
        >
          {" "}
          {reachedStep}
        </Typography>
        <Box
          sx={{
            display: "flex",
            padding: { sm: 0, md: 1, lg: 0 },
          }}
        />
        <Grid container direction="row" columnGap={2}>
          <LocationOnIcon sx={{ color: "##000" }} />
          <Typography variant="body2" color="primary.contrastText" gutterBottom>
            {props.turbine.description}
          </Typography>
        </Grid>
        <Grid container direction="row" columnGap={2}>
          {status === states.ok && <AutoModeIcon sx={{ color: "##000" }} />}
          {status === states.warning && <WarningIcon sx={{ color: "##000" }} />}
          {status === states.error && <ErrorIcon sx={{ color: "##000" }} />}
          <Typography variant="body2" color="primary.contrastText" gutterBottom>
            {props.turbine.turbineState}
          </Typography>
        </Grid>
        <Grid container direction="row" columnGap={2}>
          <ConstructionIcon sx={{ color: "##000" }} />
          <Typography variant="body2" color="primary.contrastText" gutterBottom>
            {props.turbine.operation[0]}
          </Typography>
        </Grid>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        onClick={props.handleOpenDetail}
        sx={{
          width: "90%",
          height: 50,
          left: "5%",
          mt: { xs: -1, sm: 0 },
        }}
      >
        <Typography>DETTAGLI</Typography>
      </Button>
      <Box sx={{ mr: 1, width: "100%", mt: 1 }}>
        <LinearProgress
          color={percentage === 100 ? "success" : "success"}
          variant="determinate"
          value={percentage}
          sx={{
            height: 20,
          }}
        />
      </Box>
    </Card>
  );
};

export default Turbine;
