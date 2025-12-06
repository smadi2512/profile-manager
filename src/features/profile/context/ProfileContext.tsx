import {
  createContext,
  useMemo,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  ProfileAction,
  ProfileManagerState,
  profileReducer,
} from "../reducer/profile-reducer";
import { Status } from "@/shared/types";
import profilesData from "@/data/Profiles";

type ProfileContextType = {
  state: ProfileManagerState;
  dispatch: React.Dispatch<ProfileAction>;
  status: Status;
  error: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialState: ProfileManagerState = {
  profiles: [],
};

export default function ProfileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfiles = async () => {
      setStatus("loading");
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        dispatch({ type: "SET_PROFILES", payload: profilesData });
        setStatus("success");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setStatus("error");
        setError("Failed to load profiles!");
      }
    };
    loadProfiles();
  }, []);

  const ctxValue = useMemo(
    () => ({
      state,
      dispatch,
      status,
      error,
      isLoading: status === "loading",
      isSuccess: status === "success",
      isError: status === "error",
    }),
    [state, status, error]
  );
  return (
    <ProfileContext.Provider value={ctxValue}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
