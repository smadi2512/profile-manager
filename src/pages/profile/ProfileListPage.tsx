import { useMemo, useCallback } from "react";
import {
  useProfileContext,
  ProfileCard,
  Profile,
  Role,
  ProfileForm,
} from "@/features/profile";
import {
  SmartList,
  PageHeader,
  Toggle,
  Card,
  Button,
  LoadingIndicator,
} from "@/shared/components";
import { FilterConfig, SearchConfig } from "@/shared/types";
import {
  ListBulletIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function ProfileListPage() {
  const { state, isLoading, isError, isSuccess } = useProfileContext();

  const profiles = state.profiles;

  //search config
  const searchConfig: SearchConfig<Profile> = useMemo(
    () => ({
      keys: ["name", "email", "interests"],
      placeholder: "Search profiles by name, email, or interests...",
    }),
    []
  );

  //filter config
  const filterConfig: FilterConfig<Profile> = useMemo(
    () => ({
      role: {
        type: "select",
        options: ["admin", "editor", "viewer", "user"] as Role[],
        label: "Filter by Role",
        placeholder: "All Roles",
      },
      interests: {
        type: "checkbox",
        options: ["Web Development", "AI/ML", "Cloud", "Automation"],
        label: "Interests",
      },
    }),
    []
  );

  const renderProfile = useCallback(
    (profile: Profile) => <ProfileCard key={profile.id} profile={profile} />,
    []
  );

  if (isLoading) {
    return (
      <div className="container-pm py-8">
        <PageHeader
          icon={<ListBulletIcon className="h-10 w-10 text-white" />}
          title="Manage Profiles"
          subtitle="Loading profiles..."
          size="xl"
        />
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-pm py-8">
        <PageHeader
          icon={<ListBulletIcon className="h-10 w-10 text-white" />}
          title="Manage Profiles"
          subtitle="Error loading profiles"
          size="xl"
        />
        <div className="alert alert-error mt-4">
          Failed to load profiles. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container-pm py-8">
      <PageHeader
        icon={<ListBulletIcon className="h-10 w-10 text-white" />}
        title="Manage Profiles"
        subtitle="Create, view, and manage all user profiles in one place.
          Use search and filters to find specific profiles quickly."
        size="xl"
      />
      <Toggle>
        {({ on, toggle }) => (
          <section className="mb-6">
            <div className="flex justify-center">
              <Button
                onClick={toggle}
                className="mx-auto transition-all duration-300 my-4"
                variant={on ? "outline" : "primary"}
                startIcon={
                  on ? (
                    <XMarkIcon className="h-4 w-4" />
                  ) : (
                    <PlusIcon className="h-4 w-4" />
                  )
                }
              >
                {on ? "Cancel" : "Quick Add Profile"}
              </Button>
            </div>
            {on && (
              <Card className="animate-pm-slide-up shadow-lg border border-pm-border/50">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-pm-border">
                  <h3 className="text-lg font-semibold text-pm-foreground">
                    Add New Profile
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggle}
                    className="p-1"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </Button>
                </div>
                <ProfileForm onSuccess={toggle} />
              </Card>
            )}
          </section>
        )}
      </Toggle>
      {isSuccess && (
        <SmartList<Profile>
          items={profiles}
          itemKey={(profile: Profile) => profile.id}
          renderItem={renderProfile}
          pagination={{ pageSize: 9 }}
          search={searchConfig}
          filter={filterConfig}
        />
      )}
    </div>
  );
}
