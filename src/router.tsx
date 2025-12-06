import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./shared/layouts/RootLayout";
import ThemePreviewPage from "./pages/ThemePreviewPage";
import { LoadingIndicator } from "./shared/components";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/Home"));
const ProfileView = lazy(() => import("@/pages/profile/ProfileViewPage"));
const ProfileListPage = lazy(() => import("@/pages/profile/ProfileListPage"));
const AddNewProfilePage = lazy(() => import("@/pages/profile/AddProfilePage"));
const ErrorPage = lazy(() => import("@/pages/Error"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profiles",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ProfileListPage />
          </Suspense>
        ),
      },
      {
        path: "profiles/profile/:profileId",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ProfileView />
          </Suspense>
        ),
      },
      {
        path: "profiles/addProfile",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <AddNewProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/theme-preview",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ThemePreviewPage />
          </Suspense>
        ),
      },
    ],
  },
]);
