export type StepCallback = () => boolean | Promise<boolean>; //Can be sync or async

export interface FormWizardContextType<TState, TAction> {
  state: TState;
  dispatch: React.Dispatch<TAction>;
  currentStep: number;
  totalSteps: number;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  goToStep: (step: number) => void;
  registerStepCallback: (step: number, callback: StepCallback) => void;
  finalSubmit: () => Promise<boolean>;
  isSubmitting: boolean;
  submissionResult: "success" | "error" | null;
}
