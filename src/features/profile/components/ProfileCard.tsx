import {
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Profile } from "../profile.types";
import { Button, Grid, Toggle, Card, Badge } from "@/shared/components";
import { memo } from "react";

function ProfileCard({ profile }: { profile: Profile }) {
  const getRoleVariant = (role?: string) => {
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
  return (
    <Card className="card-hover" padding="sm">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="bg-pm-primary/10 p-2 rounded-full shrink-0">
            <UserIcon className="h-5 w-5 text-pm-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-pm-foreground capitalize truncate">
              {profile.name}
            </h3>
            <p className="text-sm text-pm-muted truncate">{profile.email}</p>
          </div>
        </div>
        {/* Role */}
        {profile.role && (
          <Badge
            variant={getRoleVariant(profile.role)}
            className="shrink-0 ml-2"
            size="sm"
          >
            {profile.role}
          </Badge>
        )}
      </div>
      {/* Basic Info */}
      <div className="space-y-2 mb-3">
        {profile.age && (
          <div className="flex items-center gap-2 text-sm text-pm-foreground">
            <CalendarIcon className="h-4 w-4 text-pm-muted shrink-0" />
            <span>{profile.age} years old</span>
          </div>
        )}
        {profile.phone && (
          <div className="flex items-center gap-2 text-sm text-pm-foreground">
            <PhoneIcon className="h-4 w-4 text-pm-muted shrink-0" />
            <span className="truncate">{profile.phone}</span>
          </div>
        )}
      </div>
      {/* Toggle Section */}
      <Toggle>
        {({ on, toggle }) => (
          <div className="space-y-3">
            {on && (
              <div className="border-t border-pm-border pt-3 animate-pm-fade-in">
                {profile.interests && profile.interests.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-pm-foreground mb-2">
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="inline-block bg-pm-primary/10 text-pm-primary px-2 py-1 rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <Grid columns={2} gap="xs" maxWidth="full" className="text-sm">
                  <div className="text-pm-muted">ID:</div>
                  <div className="text-pm-foreground font-mono text-xs truncate">
                    {profile.id}
                  </div>
                </Grid>
              </div>
            )}
            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-pm-border">
              <Link
                to={`/profiles/profile/${profile.id}`}
                className="btn btn-primary btn-sm flex-1 text-center"
              >
                View Profile
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggle}
                className="px-3 flex items-center gap-1"
                title={on ? "Show less" : "Show more"}
              >
                {on ? (
                  <>
                    <ChevronUpIcon className="h-4 w-4" />
                    <span className="sr-only">Show less</span>
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    <span className="sr-only">Show more</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Toggle>
    </Card>
  );
}

export default memo(ProfileCard);
