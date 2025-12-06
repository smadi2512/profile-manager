import { useCallback, useEffect, useState, useRef } from "react";
import { Input, useFormWizardContext } from "@/shared/components";
import {
  ProfileWizardState,
  ProfileWizardAction,
} from "../../reducer/profile-reducer";
import { ProfileWizardContext } from "../../context/ProfileWizardContext";

export default function StepContactInfo({ stepIndex }: { stepIndex: number }) {
  const { state, dispatch, registerStepCallback } = useFormWizardContext<
    ProfileWizardState,
    ProfileWizardAction
  >(ProfileWizardContext);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    emailError: "",
    phoneError: "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setEmail(state.profile.email || "");
    setPhone(state.profile.phone || "");
  }, [state.profile]);

  const contactInfoStepCallback = useCallback(() => {
    //Validation
    if (!email.trim() || !phone.trim()) {
      setError({
        emailError: !email.trim() ? "Email is required!" : "",
        phoneError: !phone.trim() ? "Phone is required!" : "",
      });
      return false;
    }
    //Disptaching
    dispatch({
      type: "SET_SECTION",
      payload: {
        email,
        phone,
      },
    });

    return true;
  }, [dispatch, email, phone]);

  useEffect(() => {
    registerStepCallback(stepIndex, contactInfoStepCallback);
  }, [contactInfoStepCallback, registerStepCallback, stepIndex]);

  return (
    <div className="space-y-6 text-pm-foreground">
      <h2 className="text-xl font-semibold text-pm-foreground">
        Contact Information
      </h2>
      <Input
        type="email"
        id="email"
        name="email"
        ref={inputRef}
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error.emailError)
            setError((prev) => ({ ...prev, emailError: "" }));
        }}
        error={error.emailError}
        required
      />

      <Input
        type="tel"
        id="phone"
        name="phone"
        label="Phone"
        placeholder="Enter your phone"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (error.phoneError)
            setError((prev) => ({ ...prev, phoneError: "" }));
        }}
        error={error.phoneError}
        required
      />
    </div>
  );
}
