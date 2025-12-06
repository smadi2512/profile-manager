import { memo } from "react";
import { Profile } from "../profile.types";
import {
  CheckIcon,
  EnvelopeIcon,
  UserCircleIcon,
  PhoneIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Badge, Grid } from "@/shared/components/ui";

interface ProfileDetailsProps {
  profile: Profile;
}

function ProfileDetails({ profile }: ProfileDetailsProps) {
  const getRoleVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "error";
      case "editor":
        return "warning";
      case "viewer":
        return "info";
      default:
        return "success";
    }
  };

  const getStatusVariant = (status?: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "idle":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 text-pm-foreground">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-pm-foreground">
          {profile.name}
        </h2>
        <Badge variant={getStatusVariant(profile.status)}>
          {profile.status?.toUpperCase() || "ACTIVE"}
        </Badge>
      </div>

      <Grid columns={2} maxWidth="full" gap="md" className="mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <EnvelopeIcon className="h-5 w-5 text-pm-muted" />
            <div>
              <p className="text-sm text-pm-muted">Email</p>
              <p className="text-pm-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <PhoneIcon className="h-5 w-5 text-pm-muted" />
            <div>
              <p className="text-sm text-pm-muted">Phone</p>
              <p className="text-pm-foreground">{profile.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserGroupIcon className="h-5 w-5 text-pm-muted" />
            <div className="flex items-center gap-2">
              <p className="text-sm text-pm-muted">Role</p>
              <Badge variant={getRoleVariant(profile.role)} size="sm">
                {profile.role}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserCircleIcon className="h-5 w-5 text-pm-muted" />
            <div>
              <p className="text-sm text-pm-muted">Age</p>
              <p className="text-pm-foreground">{profile.age} years old</p>
            </div>
          </div>
        </div>
      </Grid>

      <div className="border-t border-pm-border pt-6">
        <h3 className="text-lg font-semibold text-pm-foreground mb-4 flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-pm-muted" />
          Interests & Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <Badge
              key={interest}
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <CheckIcon className="h-3 w-3 text-pm-success" />
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ProfileDetails);
