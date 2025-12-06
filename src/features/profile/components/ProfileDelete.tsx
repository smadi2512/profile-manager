import { useNavigate } from "react-router-dom";
import { useRef, useState, memo } from "react";
import { useProfileContext } from "../context/ProfileContext";
import { Profile } from "../profile.types";
import {
  Button,
  LoadingIndicator,
  Modal,
  ModalRefType,
} from "@/shared/components/ui";

type ProfileDeleteProps = {
  profile: Profile;
};

function ProfileDelete({ profile }: ProfileDeleteProps) {
  const { dispatch } = useProfileContext();
  const navigate = useNavigate();
  const modalRef = useRef<ModalRefType>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCancel = () => {
    if (!isSubmitting) {
      modalRef.current?.closeModal();
    }
  };

  const onConfirm = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch({
        type: "REMOVE_PROFILE",
        payload: { id: profile.id },
      });
      modalRef.current?.closeModal();
      //redirect to the profiles page
      navigate("/profiles");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to delete profile:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const actions = (
    <>
      <Button variant="danger" type="button" onClick={onConfirm}>
        {isSubmitting ? (
          <LoadingIndicator size="sm" text="Deleting..." layout="horizontal" />
        ) : (
          "Delete"
        )}
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
    </>
  );

  function handleDelete() {
    modalRef.current?.openModal();
  }

  return (
    <>
      <Modal ref={modalRef} title="Delete Confirmation" actions={actions}>
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-4">
            <LoadingIndicator
              size="md"
              text="Deleting profile permanently..."
              layout="vertical"
            />
            <p className="text-sm text-pm-muted mt-2">
              This may take a few seconds...
            </p>
          </div>
        ) : (
          <p className="text-pm-foreground">
            Are you sure you want to delete{" "}
            <strong className="text-pm-error">{profile.name}'s</strong> profile?
            <br />
            <span className="text-sm text-pm-muted">
              This action cannot be undone.
            </span>
          </p>
        )}
      </Modal>

      <div className="p-6">
        <p className="mb-8 text-pm-foreground text-lg">
          You are about to delete{" "}
          <strong className="text-pm-error">{profile.name}</strong>'s profile.
          <br />
          <span className="text-pm-muted">This action cannot be undone.</span>
        </p>
        <Button variant="danger" onClick={handleDelete}>
          Delete Profile
        </Button>
      </div>
    </>
  );
}

export default memo(ProfileDelete);
