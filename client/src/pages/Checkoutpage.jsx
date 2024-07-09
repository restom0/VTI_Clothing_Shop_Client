import React from "react";
import Banner from "../layouts/Shop/Banner";
import NavbarWithSublist from "../layouts/Shop/NavbarWithSublist";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  List,
  ListItem,
  Radio,
  Step,
  Stepper,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Container, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Step1Checkout from "../components/Step1Checkout";
import Step2Checkout from "../components/Step2Checkout";
import Step3Checkout from "../components/Step3Checkout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "../layouts/Shop/Footer";
const Checkoutpage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <>
      <Container className="mt-5">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            <ShoppingCartIcon className="h-5 w-5" />
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <ReceiptIcon className="h-5 w-5" />
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <CheckCircleIcon className="h-5 w-5" />
          </Step>
        </Stepper>
      </Container>
      {activeStep === 0 && <Step1Checkout handleNext={handleNext} />}
      {activeStep === 1 && (
        <Step2Checkout handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {activeStep === 2 && <Step3Checkout />}
    </>
  );
};

export default Checkoutpage;
