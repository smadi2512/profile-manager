import { Suspense, lazy, useEffect } from "react";
import { FormWizard } from "@/shared/components";
import { ProfileWizard } from "@/features/profile";
import { Card, PageHeader } from "@/shared/components";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { LoadingIndicator } from "@/shared/components";

// lazy-loaded steps
const StepPersonalInfo = lazy(
  () =>
    import("@/features/profile/formwizard/components/steps/StepPersonalInfo")
);
const StepContactInfo = lazy(
  () => import("@/features/profile/formwizard/components/steps/StepContactInfo")
);
const StepInterests = lazy(
  () => import("@/features/profile/formwizard/components/steps/StepInterests")
);
const StepReview = lazy(
  () => import("@/features/profile/formwizard/components/steps/StepReview")
);

export default function AddNewProfilePage() {
  useEffect(() => {
    //Prefetch next steps
    void import(
      "@/features/profile/formwizard/components/steps/StepContactInfo"
    );
    void import("@/features/profile/formwizard/components/steps/StepInterests");
    void import("@/features/profile/formwizard/components/steps/StepReview");
  }, []);

  return (
    <div className="container-pm py-8">
      <PageHeader
        icon={<UserPlusIcon className="h-10 w-10 text-white" />}
        title="Add New Profile"
        subtitle="Create a new profile by filling in the information step by step"
        size="xl"
      />
      <Card className="max-w-2xl mx-auto my-12">
        <ProfileWizard totalSteps={4}>
          <Suspense
            fallback={<LoadingIndicator text="Loading Personal Info Step..." />}
          >
            <FormWizard.Step>
              <StepPersonalInfo stepIndex={0} />
            </FormWizard.Step>
          </Suspense>
          <Suspense
            fallback={<LoadingIndicator text="Loading Contact Info Step..." />}
          >
            <FormWizard.Step>
              <StepContactInfo stepIndex={1} />
            </FormWizard.Step>
          </Suspense>
          <Suspense
            fallback={<LoadingIndicator text="Loading Interests Step..." />}
          >
            <FormWizard.Step>
              <StepInterests stepIndex={2} />
            </FormWizard.Step>
          </Suspense>
          <Suspense
            fallback={
              <LoadingIndicator text="Loading Review and Final Step..." />
            }
          >
            <FormWizard.Step>
              <StepReview stepIndex={3} />
            </FormWizard.Step>
          </Suspense>
        </ProfileWizard>
      </Card>
    </div>
  );
}
