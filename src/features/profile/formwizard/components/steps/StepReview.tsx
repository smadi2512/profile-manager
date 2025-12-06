import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Button, useFormWizardContext, Modal } from "@/shared/components";
import {
  ProfileWizardState,
  ProfileWizardAction,
} from "../../reducer/profile-reducer";
import { ProfileWizardContext } from "../../context/ProfileWizardContext";
import { useProfileContext } from "../../../context/ProfileContext";

export default function StepReview({ stepIndex }: { stepIndex: number }) {
  const { state, registerStepCallback, submissionResult } =
    useFormWizardContext<ProfileWizardState, ProfileWizardAction>(
      ProfileWizardContext
    );
  const { dispatch: dispatchProfileContext } = useProfileContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfileId, setNewProfileId] = useState<string | null>(null);

  const reviewStepCallback = useCallback(async () => {
    if (!state.profile.name || !state.profile.email) return false;

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const id = uuidv4();
      const profile = { ...state.profile, id };

      dispatchProfileContext({
        type: "ADD_PROFILE",
        payload: { profile },
      });
      setNewProfileId(id);
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to add profile:", error);
      }
      return false;
    }
  }, [dispatchProfileContext, state.profile]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (submissionResult === "success" && newProfileId) {
      navigate(`/profiles/profile/${newProfileId}`);
    } else {
      navigate("/profiles");
    }
  };

  useEffect(() => {
    registerStepCallback(stepIndex, reviewStepCallback);
  }, [registerStepCallback, reviewStepCallback, stepIndex]);

  useEffect(() => {
    if (submissionResult) {
      setIsModalOpen(true);
    }
  }, [submissionResult]);

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Add Profile Confirmation"
        onClose={handleModalClose}
      >
        <div className="text-center p-4">
          <p className="text-pm-foreground mb-4 text-lg">
            {submissionResult === "success"
              ? `Added ${state.profile.name}'s profile successfully!`
              : "There was something wrong!"}
          </p>
          <Button onClick={handleModalClose}>
            {submissionResult === "success" ? "View Profile" : "Try Again"}
          </Button>
        </div>
      </Modal>
      <div className="space-y-4 text-pm-foreground">
        <h2 className="text-xl font-semibold mb-5 text-pm-foreground">
          Review Your Info
        </h2>
        <div className="space-y-3 text-left">
          <p>
            <strong className="text-pm-primary">Name: </strong>
            {state.profile.name}
          </p>
          <p>
            <strong className="text-pm-primary">Age: </strong>
            {state.profile.age}
          </p>
          <p>
            <strong className="text-pm-primary">Email: </strong>
            {state.profile.email}
          </p>
          <p>
            <strong className="text-pm-primary">Phone: </strong>
            {state.profile.phone}
          </p>
          <p>
            <strong className="text-pm-primary">Interests: </strong>
            {state.profile.interests?.join(", ")}
          </p>
        </div>
      </div>
    </>
  );
}
