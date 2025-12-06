import { ReactNode } from "react";
import { useFormWizardContext } from "../context/FormWizardContext";
import { FormWizardContextType } from "../formwizard.types";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import FormWizardProvider from "../context/FormWizardContext";
import { Button, LoadingIndicator } from "@/shared/components";

//FormWizard component => provider
export default function FormWizard<TState, TAction>({
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
  children: React.ReactNode[];
}) {
  return (
    <FormWizardProvider
      context={context}
      reducer={reducer}
      initialState={initialState}
      totalSteps={totalSteps}
    >
      <FormWizard.Inner context={context}>{children}</FormWizard.Inner>
      <FormWizard.Controls context={context} />
    </FormWizardProvider>
  );
}

FormWizard.Inner = function FormWizardInner<TState, TAction>({
  context,
  children,
}: {
  context: React.Context<FormWizardContextType<TState, TAction> | undefined>;
  children: ReactNode[];
}) {
  const { currentStep } = useFormWizardContext<TState, TAction>(context);
  return <>{children[currentStep]}</>;
};

//FormWizard step
FormWizard.Step = function WizardStep({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
};

//FormWizard controls
FormWizard.Controls = function WizardControls<TState, TAction>({
  context,
}: {
  context: React.Context<FormWizardContextType<TState, TAction> | undefined>;
}) {
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    finalSubmit,
    isSubmitting,
  } = useFormWizardContext<TState, TAction>(context);
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between mt-6">
      {!isFirst && (
        <>
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={isFirst}
            startIcon={<ChevronLeftIcon className="h-4 w-4" />}
          >
            Back
          </Button>
        </>
      )}
      {!isLast && (
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={isLast}
          endIcon={<ChevronRightIcon className="h-4 w-4" />}
        >
          Next
        </Button>
      )}
      {isLast && (
        <Button
          variant="success"
          className="min-w-24"
          onClick={finalSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoadingIndicator
              size="sm"
              layout="horizontal"
              text="Submitting..."
            />
          ) : (
            "Submit"
          )}
        </Button>
      )}
    </div>
  );
};
