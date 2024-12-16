import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "@/store/textanalysis";
import { appSelector } from "@/store";

export const useStepHandler = () => {
  const dispatch = useDispatch();
  const {
    textanalysis: { activeStep },
  } = useSelector(appSelector);

  const handleNext = useCallback(() => {
    dispatch(setActiveStep(activeStep + 1));
  }, [dispatch, activeStep]);

  const handleBack = useCallback(() => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
    }
  }, [dispatch, activeStep]);

  return { activeStep, handleNext, handleBack };
};
