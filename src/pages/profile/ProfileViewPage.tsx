import { useMemo, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileQuickActions, useProfileContext } from "@/features/profile";
import {
  PageHeader,
  Tabs,
  Button,
  LoadingIndicator,
} from "@/shared/components";
import { UserIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// Lazy-loaded components
const ProfileDetails = lazy(
  () => import("@/features/profile/components/ProfileDetails")
);
const EditProfileForm = lazy(
  () => import("@/features/profile/components/EditProfileForm")
);
const ProfileDelete = lazy(
  () => import("@/features/profile/components/ProfileDelete")
);

export default function ProfileView() {
  const { profileId } = useParams<{ profileId: string }>();
  const { state } = useProfileContext();
  const navigate = useNavigate();

  const selectedProfile = useMemo(() => {
    return state.profiles.find((profile) => profile.id === profileId);
  }, [profileId, state.profiles]);

  if (!selectedProfile) {
    return (
      <div className="container-pm py-8">
        <PageHeader
          icon={<UserIcon className="h-10 w-10 text-white" />}
          title="Profile Not found"
          subtitle="The profile you're looking for doesn't exist"
          size="lg"
        >
          <Button
            variant="outline"
            onClick={() => navigate("/profiles")}
            className="mt-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Profiles
          </Button>
        </PageHeader>
      </div>
    );
  }

  return (
    <div className="container-pm py-8">
      <ProfileQuickActions profileId={selectedProfile.id} />

      <PageHeader
        icon={<UserIcon className="h-10 w-10 text-white" />}
        title={`${selectedProfile.name}'s Profile`}
        subtitle={`View and manage ${selectedProfile.name}'s profile information`}
        size="lg"
      />

      <Tabs defaultTab="details" syncWithUrl={true}>
        <Tabs.List>
          <Tabs.Tab
            tabName="details"
            onMouseEnter={() =>
              import("@/features/profile/components/ProfileDetails")
            }
          >
            Details
          </Tabs.Tab>

          <Tabs.Tab
            tabName="edit"
            onMouseEnter={() =>
              import("@/features/profile/components/EditProfileForm")
            }
          >
            Edit
          </Tabs.Tab>

          <Tabs.Tab
            tabName="delete"
            onMouseEnter={() =>
              import("@/features/profile/components/ProfileDelete")
            }
          >
            Delete
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Container>
          <Tabs.Panel tabName="details">
            <Suspense fallback={<LoadingIndicator />}>
              <ProfileDetails profile={selectedProfile} />
            </Suspense>
          </Tabs.Panel>

          <Tabs.Panel tabName="edit">
            <Suspense fallback={<LoadingIndicator />}>
              <EditProfileForm profile={selectedProfile} />
            </Suspense>
          </Tabs.Panel>

          <Tabs.Panel tabName="delete">
            <Suspense fallback={<LoadingIndicator />}>
              <ProfileDelete profile={selectedProfile} />
            </Suspense>
          </Tabs.Panel>
        </Tabs.Container>
      </Tabs>
    </div>
  );
}
