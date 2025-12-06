import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { memo } from "react";

function ProfileQuickActions({ profileId }: { profileId: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/profiles")}
        className="flex items-center gap-2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to profiles
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/profiles/profile/${profileId}/?tab=edit`)}
      >
        Quick Edit
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigator.clipboard.writeText(profileId)}
      >
        Copy ID
      </Button>
    </div>
  );
}

export default memo(ProfileQuickActions);
