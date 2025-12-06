import { useState, memo } from "react";
import { Profile, roleOptions, statusOptions } from "../profile.types";
import { useProfileContext } from "../context/ProfileContext";
import {
  Button,
  Grid,
  Input,
  LoadingIndicator,
  Select,
  useTabsContext,
} from "@/shared/components";

interface EditProfileFormProps {
  profile: Profile;
}

function EditProfileForm({ profile }: EditProfileFormProps) {
  const { dispatch } = useProfileContext();
  const { setActiveTab } = useTabsContext();

  const [formData, setFormData] = useState<Omit<Profile, "id" | "role">>({
    name: profile.name,
    age: profile.age,
    email: profile.email,
    phone: profile.phone,
    status: profile.status || "active",
    interests: profile.interests,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const role = profile.role;

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: name === "interests" ? value.trim().split(",") : value,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const updatedProfile: Partial<Profile> = {
        ...formData,
        interests: [...formData.interests],
      };
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { id: profile.id, profile: updatedProfile },
      });
      setActiveTab("details");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to update profile:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setActiveTab("details");
  }

  return (
    <form
      className={`p-6 ${isSubmitting ? "opacity-70" : ""}`}
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-6 text-pm-foreground">
        Edit {profile.name}'s Profile
      </h2>
      <Grid columns={2} maxWidth="full" className="mb-4">
        <Input
          id="name"
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-5"
          required
        />
        <Input
          id="age"
          name="age"
          type="number"
          label="Age"
          value={formData.age}
          onChange={handleChange}
          className="mb-5"
          min="18"
          max="100"
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-5"
          required
        />
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="mb-5"
          required
        />
        <Select
          id="role"
          name="role"
          label="Role"
          value={role}
          options={roleOptions}
          required
          disabled
          helperText="Please contact admin if you want to change your role."
        />

        <Select
          id="status"
          name="status"
          label="Status"
          value={formData.status || "active"}
          onChange={handleChange}
          options={statusOptions}
          required
        />
      </Grid>

      <Input
        id="interests"
        name="interests"
        label="Interests (comma-separated)"
        value={formData.interests.join(",")}
        onChange={handleChange}
        helperText="Separate interests with commas (e.g., Frontend, Backend, Design)"
        placeholder="JavaScript, React, Node.js"
        className="my-5"
      />

      <div className="flex gap-3 justify-end pt-8 border-t border-pm-border">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isSubmitting ? (
            <LoadingIndicator size="sm" text="Saving..." layout="horizontal" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}

export default memo(EditProfileForm);
