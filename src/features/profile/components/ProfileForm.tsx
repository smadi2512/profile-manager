import { useEffect, useRef, useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Profile,
  Role,
  profileStatus,
  roleOptions,
  statusOptions,
} from "../profile.types";
import { useProfileContext } from "../context/ProfileContext";
import { Button, Input, Grid, Select } from "@/shared/components";
import LoadingIndicator from "@/shared/components/ui/LoadingIndicator";

interface ProfileFormProps {
  onSuccess?: () => void;
}

function ProfileForm({ onSuccess }: ProfileFormProps) {
  const { dispatch } = useProfileContext();
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [role, setRole] = useState<Role>("user");
  const [status, setStatus] = useState<profileStatus>("active");
  const nameRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function handleReset() {
    //Resetting for the form fields
    setName("");
    setAge(0);
    setEmail("");
    setPhone("");
    setRole("user");
    setStatus("active");
    setInterests([]);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name || !age || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const id = uuidv4();
      const newProfile: Profile = {
        id,
        name: name.trim(),
        age,
        email: email.trim(),
        phone: phone.trim(),
        role: role as Role,
        status: status as profileStatus,
        interests: interests.map((interest) => interest.trim()).filter(Boolean),
      };

      dispatch({ type: "ADD_PROFILE", payload: { profile: newProfile } });
      handleReset();
      onSuccess?.();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to add profile:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <Grid columns={2} maxWidth="full" className="mb-4">
        <Input
          id="name"
          name="name"
          ref={nameRef}
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-5"
          required
          disabled={isSubmitting}
        />
        <Input
          id="age"
          name="age"
          type="number"
          label="Age"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="mb-5"
          min="18"
          max="100"
          required
          disabled={isSubmitting}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-5"
          required
          disabled={isSubmitting}
        />
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          placeholder="Enter your phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-5"
          required
          disabled={isSubmitting}
        />
        <Select
          id="role"
          name="role"
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          options={roleOptions}
          required
          disabled={isSubmitting}
        />
        <Select
          id="status"
          name="status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as profileStatus)}
          options={statusOptions}
          required
          disabled={isSubmitting}
        />
      </Grid>

      <Input
        id="interests"
        name="interests"
        label="Interests (comma-separated)"
        value={interests.join(", ")}
        onChange={(e) => setInterests(e.target.value.split(","))}
        helperText="Separate interests with commas (e.g., Frontend, Backend, Design)"
        placeholder="JavaScript, React, Node.js"
        className="my-5"
        disabled={isSubmitting}
      />

      <div className="flex gap-3 justify-end pt-8 border-t border-pm-border">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoadingIndicator
              size="sm"
              layout="horizontal"
              text="Adding..."
              className="py-0! text-white"
            />
          ) : (
            "Add Profile"
          )}
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
export default memo(ProfileForm);
