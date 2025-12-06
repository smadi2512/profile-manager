import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { FormWizardContextType, StepCallback } from "../formwizard.types";

// eslint-disable-next-line react-refresh/only-export-components
export function createFormWizardContext<TState, TAction>() {
  return createContext<FormWizardContextType<TState, TAction> | undefined>(
    undefined
  );
}

//Custom hook to use FormWizardContext
// eslint-disable-next-line react-refresh/only-export-components
export function useFormWizardContext<TState, TAction>(
  context: React.Context<FormWizardContextType<TState, TAction> | undefined>
) {
  const ctx = useContext(context);
  if (!ctx) throw new Error("FormWizard must be used within its Provider");
  return ctx;
}

//FormWizard component => provider
export default function FormWizardProvider<TState, TAction>({
  context,
  reducer,
  initialState,
  totalSteps,
  children,
}: {
  context: React.Context<FormWizardContextType<TState, TAction> | undefined>;
  reducer: React.Reducer<TState, TAction>;
  initialState: TState;
  totalSteps: number;
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionResult, setSubmissionResult] = useState<
    "success" | "error" | null
  >(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const stepCallbackRefs = useRef<Map<number, StepCallback>>(new Map());

  const registerStepCallback = (step: number, callback: StepCallback) => {
    stepCallbackRefs.current.set(step, callback); //As key, value pairs.
  };

  const nextStep = useCallback(async () => {
    const callback = stepCallbackRefs.current.get(currentStep); //get the callback that's relatd to currentstep before moving to the next step.
    if (callback) {
      const result = await callback(); //if there is callback then execute it.
      if (!result) return; //Block navigation if there is something wrong.
    }
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1)); //Move to the nextstep
  }, [currentStep, totalSteps]);

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const finalSubmit = useCallback(async () => {
    if (isSubmitting) return false;
    setIsSubmitting(true);
    try {
      const callback = stepCallbackRefs.current.get(currentStep); //get the callback that's relatd to currentstep before moving to the next step.
      if (callback) {
        const result = await callback(); //if there is callback then execute it.
        if (!result) {
          setSubmissionResult("error");
          return false; //Block navigation if there is something wrong.
        }
      }
      setSubmissionResult("success");
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, isSubmitting]);

  const ctxValue: FormWizardContextType<TState, TAction> = useMemo(
    () => ({
      state,
      dispatch,
      currentStep,
      totalSteps,
      nextStep,
      prevStep,
      goToStep,
      registerStepCallback,
      finalSubmit,
      isSubmitting,
      submissionResult,
    }),
    [
      currentStep,
      finalSubmit,
      isSubmitting,
      nextStep,
      state,
      submissionResult,
      totalSteps,
    ]
  );

  return <context.Provider value={ctxValue}>{children}</context.Provider>;
}
