import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { router } from "./router";

import { ProfileContextProvider } from "@/features/profile";
import { LoadingIndicator } from "@/shared/components";

function App() {
  return (
    <ProfileContextProvider>
      <Suspense fallback={<AppLoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ProfileContextProvider>
  );
}

export default App;

function AppLoadingFallback() {
  return (
    <div className="min-h-screen bg-pm-background flex items-center justify-center">
      <LoadingIndicator size="lg" text="Loading Profile Manager App" />
    </div>
  );
}
