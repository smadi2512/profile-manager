import { Profile, Role, profileStatus } from "../../profile.types";

export const initialProfileState = {
  profile: {
    id: "",
    name: "",
    email: "",
    phone: "",
    age: 0,
    role: "user" as Role,
    status: "active" as profileStatus,
    interests: [],
  },
};

export type ProfileWizardState = {
  profile: Profile;
};

export type ProfileWizardAction =
  | {
      type: "SET_FIELD";
      payload: { field: keyof Profile; value: Profile[keyof Profile] };
    }
  | { type: "SET_SECTION"; payload: Partial<Profile> }
  | { type: "RESET" };

export function ProfileWizardReducer(
  state: ProfileWizardState,
  action: ProfileWizardAction
): ProfileWizardState {
  switch (action.type) {
    case "SET_FIELD": {
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case "SET_SECTION": {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };
    }
    case "RESET": {
      return { ...initialProfileState };
    }
    default:
      return state;
  }
}
