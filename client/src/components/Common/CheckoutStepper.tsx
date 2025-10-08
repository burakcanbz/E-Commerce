import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import SendIcon from "@mui/icons-material/Send";

interface QontoStepIconProps {
  active?: boolean;
  completed?: boolean;
  className?: string;
}

const QontoStepIconRoot = styled("div")<{ ownerState: { active: boolean } }>(
  ({ theme, ownerState }) => ({
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    ...(ownerState.active && { color: "#784af4" }),
  })
);

const QontoStepIcon: React.FC<QontoStepIconProps> = ({ active = false, completed = false, className }) => (
  <QontoStepIconRoot ownerState={{ active }} className={className}>
    {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
  </QontoStepIconRoot>
);

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundImage:
      "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundImage:
      "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

interface ColorlibStepIconProps {
  active?: boolean;
  completed?: boolean;
  className?: string;
  icon: number;
}

const ColorlibStepIconRoot = styled("div")<{ ownerState: { completed?: boolean; active?: boolean } }>(
  ({ ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  })
);

const ColorlibStepIcon: React.FC<ColorlibStepIconProps> = ({ active, completed, className, icon }) => {
  const icons: Record<number, React.ReactElement> = {
    1: <LocalShippingIcon />,
    2: <PaymentIcon />,
    3: <SendIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[icon]}
    </ColorlibStepIconRoot>
  );
};

interface CheckoutStepperProps {
  activeStep?: number;
}

const steps = ["Shipping", "Payment", "Place Order"];

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ activeStep = 0 }) => (
  <Stack sx={{ width: "100%" }} spacing={4}>
    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel StepIconComponent={(props) => <ColorlibStepIcon {...props} icon={index + 1} />}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  </Stack>
);

export default CheckoutStepper;
