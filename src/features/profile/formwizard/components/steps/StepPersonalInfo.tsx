import { useCallback, useEffect, useRef, useState } from "react";
import { Input, useFormWizardContext } from "@/shared/components";
import {
  ProfileWizardState,
  ProfileWizardAction,
} from "../../reducer/profile-reducer";
import { ProfileWizardContext } from "../../context/ProfileWizardContext";

export default function StepPersonalInfo({ stepIndex }: { stepIndex: number }) {
  const { state, dispatch, registerStepCallback } = useFormWizardContext<
    ProfileWizardState,
    ProfileWizardAction
  >(ProfileWizardContext);

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [error, setError] = useState({
    nameError: "",
    ageError: "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setName(state.profile.name || "");
    setAge(state.profile.age || 0);
  }, [state.profile]);

  const personalInfoStepCallback = useCallback(() => {
    //Validation for the name & age
    if (!name.trim() || Number(age) <= 0) {
      setError({
        nameError: !name.trim() ? "Name is required!" : "",
        ageError: Number(age) <= 0 ? "Valid Age is required!" : "",
      });
      return false;
    }
    //Dispatching
    dispatch({
      type: "SET_SECTION",
      payload: {
        name,
        age,
      },
    });
    return true;
  }, [age, dispatch, name]);

  useEffect(() => {
    registerStepCallback(stepIndex, personalInfoStepCallback);
  }, [personalInfoStepCallback, registerStepCallback, stepIndex]);

  return (
    <div className="space-y-6 text-pm-foreground">
      <h2 className="text-xl font-semibold text-pm-foreground">
        Personal Information
      </h2>
      <Input
        type="text"
        id="name"
        name="name"
        ref={inputRef}
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error.nameError) setError((prev) => ({ ...prev, nameError: "" }));
        }}
        error={error.nameError}
        required
      />

      <Input
        type="number"
        id="age"
        name="age"
        label="Age"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => {
          setAge(Number(e.target.value));
          if (error.ageError) setError((prev) => ({ ...prev, ageError: "" }));
        }}
        error={error.ageError}
        min="18"
        max="100"
        required
      />
    </div>
  );
}
