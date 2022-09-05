import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import eventService from "./services/appService";

export default function TurbineSteps(props) {
  const [activeStep, setActiveStep] = React.useState(props.reachedStep);

  const handleNext = () => {
    handleStepChange(props.steps[activeStep]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    handleStepChange(props.steps[activeStep - 1]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    if (!step.complete) {
      eventService
        .setStepComplete(step.id, true)
        .then(() => {
          props.stepComplete(step.id);
        })
        .catch(() => {
          console.log("Error setting step complete");
        });
    } else {
      eventService
        .setStepComplete(step.id, false)
        .then(() => {
          props.stepIncomplete(step.id);
        })
        .catch(() => {
          console.log("Error setting step incomplete");
        });
    }
  };

  const isAuthorized = () => {
    if (activeStep >= 0) {
      const auth = window.localStorage.getItem("authorizations");
      return auth.charAt(activeStep) === "1";
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: "1rem",
          marginBottom: "3rem",
          display: { sm: "block", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {props.steps.map((step, index) => (
            <Step key={step.id}>
              <StepLabel
                optional={
                  index === props.steps.length - 1 ? (
                    <Typography variant="caption">Ultimo step</Typography>
                  ) : null
                }
              >
                {step.name}
              </StepLabel>
              <StepContent>
                <Typography
                  sx={{
                    width: {
                      sm: 300,
                      md: 500,
                      lg: 700,
                    },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {step.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      disabled={!isAuthorized}
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === props.steps.length - 1
                        ? "Chiudi cantiere"
                        : "Completa"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Indietro
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === props.steps.length && (
        <Box
          sx={{
            border: "1px solid #eaeaea",
            shadow: "0px 0px 1px #eaeaea",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <Typography variant="overline">
            Tutti gli step sono stati completati.
          </Typography>

          {props.completionDate && (
            <Typography variant="overline">
              <br />
              Cantiere chiuso il giorno <b> {props.completionDate}</b>
            </Typography>
          )}
        </Box>
      )}
    </React.Fragment>
  );
}
