import React from "react";
import { Step, Stepper } from "@material-tailwind/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Container } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Step1Checkout from "../components/Shop/Step1Checkout";
import Step2Checkout from "../components/Shop/Step2Checkout";
import Step3Checkout from "../components/Shop/Step3Checkout";
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
