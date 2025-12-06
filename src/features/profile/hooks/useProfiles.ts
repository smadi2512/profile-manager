import profilesData from "@/data/Profiles";
import { Profile } from "../profile.types";
import { useEffect, useState } from "react";
import { Status } from "@/shared/types";

export function useProfiles() {
  const [status, setStatus] = useState<Status>("idle");
  const [profiles, setProfiles] = useState<Profile[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfiles = async () => {
      setStatus("loading");
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setProfiles(profilesData);
        setStatus("success");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setStatus("error");
        setError("Failed to load profiles!");
      }
    };

    loadProfiles();
  }, []);
  return {
    status,
    profiles,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
