import { FormWizard } from "@/shared/components";
import { ProfileWizardContext } from "../context/ProfileWizardContext";
import { ProfileWizardReducer, initialProfileState } from "../reducer/profile-reducer";
import { ProfileWizardState, ProfileWizardAction } from "../reducer/profile-reducer";

type ProfileWizardProps = {
  totalSteps: number;
  children: React.ReactNode[];
};

export default function ProfileWizard({ totalSteps, children }: ProfileWizardProps) {
  return (
    <FormWizard<ProfileWizardState, ProfileWizardAction>
      context={ProfileWizardContext}
      reducer={ProfileWizardReducer}
      initialState={initialProfileState}
      totalSteps={totalSteps}
    >
      {children}
    </FormWizard>
  );
}