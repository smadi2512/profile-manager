import { useCallback, useEffect, useState, useRef } from "react";
import { Input, useFormWizardContext } from "@/shared/components";
import {
  ProfileWizardState,
  ProfileWizardAction,
} from "../../reducer/profile-reducer";
import { ProfileWizardContext } from "../../context/ProfileWizardContext";

export default function StepInterests({ stepIndex }: { stepIndex: number }) {
  const { state, dispatch, registerStepCallback } = useFormWizardContext<
    ProfileWizardState,
    ProfileWizardAction
  >(ProfileWizardContext);

  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setInterests(state.profile.interests || "");
  }, [state.profile]);

  const interestsStepCallback = useCallback(() => {
    //Validation
    if (!interests.length) {
      setError("Interests are required!");
      return false;
    }
    //Resetting the error
    setError("");
    //Dispatching
    dispatch({
      type: "SET_SECTION",
      payload: {
        interests,
      },
    });
    return true;
  }, [dispatch, interests]);

  useEffect(() => {
    registerStepCallback(stepIndex, interestsStepCallback);
  }, [interestsStepCallback, registerStepCallback, stepIndex]);

  return (
    <div className="space-y-6 text-pm-foreground">
      <h2 className="text-xl font-semibold text-pm-foreground">Interests</h2>
      <Input
        type="text"
        id="interests"
        name="interests"
        ref={inputRef}
        label="Interests (comma-separated)"
        placeholder="Enter your Interests, separated with commas"
        value={interests}
        onChange={(e) => {
          setInterests(e.target.value.split(","));
          if (error) setError("");
        }}
        required
        error={error}
        helperText="Separate interests with commas (e.g., Frontend, Backend, Design)"
      />
    </div>
  );
}
