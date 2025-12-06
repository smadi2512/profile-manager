import { Profile } from "../profile.types";

export type ProfileAction =
  | { type: "ADD_PROFILE"; payload: { profile: Profile } }
  | { type: "REMOVE_PROFILE"; payload: { id: string | null } }
  | {
      type: "UPDATE_PROFILE";
      payload: { id: string | undefined; profile: Partial<Profile> };
    }
  | { type: "SET_PROFILES"; payload: Profile[] };

export type ProfileManagerState = {
  profiles: Profile[];
};

export function profileReducer(
  state: ProfileManagerState,
  action: ProfileAction
): ProfileManagerState {
  switch (action.type) {
    case "ADD_PROFILE": {
      const updatedProfiles = [action.payload.profile, ...state.profiles];
      return {
        ...state,
        profiles: updatedProfiles,
      };
    }
    case "REMOVE_PROFILE": {
      let updatedProfiles = [...state.profiles];
      updatedProfiles = updatedProfiles.filter(
        (profile) => profile.id !== action.payload.id
      );
      return {
        ...state,
        profiles: updatedProfiles,
      };
    }
    case "UPDATE_PROFILE": {
      const updatedProfiles = state.profiles.map((profile) => {
        if (profile.id === action.payload.id) {
          return { ...profile, ...action.payload.profile };
        }
        return profile;
      });

      return {
        ...state,
        profiles: updatedProfiles,
      };
    }
    case "SET_PROFILES": {
      return {
        ...state,
        profiles: action.payload,
      };
    }
    default:
      return state;
  }
}
