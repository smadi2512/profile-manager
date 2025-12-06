import { createFormWizardContext } from "@/shared/components";
import {
  ProfileWizardAction,
  ProfileWizardState,
} from "../reducer/profile-reducer";

export const ProfileWizardContext = createFormWizardContext<
  ProfileWizardState,
  ProfileWizardAction
>();
