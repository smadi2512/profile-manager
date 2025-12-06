import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useNavigate,
} from "react-router-dom";
import { Header, Footer } from "@/shared/layouts";
import { Button, Card } from "@/shared/components/ui";
import {
  ExclamationTriangleIcon,
  HomeIcon,
  ArrowPathIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Oops! Something went wrong";
  let message = "We apologize for the inconvenience. Please try again later.";
  let statusCode = null;
  let errorDetails = "";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;

    switch (error.status) {
      case 404:
        title = "Page Not Found";
        message =
          "The page you're looking for doesn't exist or has been moved.";
        break;
      case 500:
        title = "Server Error";
        message =
          "Our servers are experiencing issues. Please try again later.";
        break;
      case 403:
        title = "Access Denied";
        message = "You don't have permission to access this page.";
        break;
      case 401:
        title = "Unauthorized";
        message = "Please log in to access this page.";
        break;
      default:
        title = "Unexpected Error";
        message = error.data?.message || "An unexpected error occurred.";
    }

    errorDetails = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorDetails = error.message;
  }

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const getErrorIcon = () => {
    if (statusCode === 404) {
      return <FaceFrownIcon className="h-16 w-16 text-pm-warning" />;
    }
    return <ExclamationTriangleIcon className="h-16 w-16 text-pm-error" />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-pm-background to-pm-card/30">
      <Header />
      <main className="grow flex items-center justify-center py-12">
        <div className="container-pm text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">{getErrorIcon()}</div>

          {/* Error Title & Message */}
          <h1 className="text-4xl font-bold text-pm-foreground mb-4">
            {title}
          </h1>

          <p className="text-xl text-pm-muted mb-8 max-w-2xl mx-auto">
            {message}
          </p>

          {/* Status Code */}
          {statusCode && (
            <div className="badge badge-error px-4 py-2 mb-8">
              Error Code: {statusCode}
            </div>
          )}

          {import.meta.env.DEV && errorDetails && (
            <Card className="max-w-2xl mx-auto mb-8 p-4">
              <details className="text-left">
                <summary className="cursor-pointer text-pm-foreground font-medium">
                  Technical Details
                </summary>
                <pre className="mt-2 text-sm text-pm-muted overflow-auto">
                  {JSON.stringify(error, null, 2)}
                </pre>
              </details>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGoHome}
              startIcon={<HomeIcon className="h-5 w-5" />}
              className="min-w-40"
            >
              Go Home
            </Button>

            <Button
              onClick={handleRetry}
              variant="outline"
              startIcon={<ArrowPathIcon className="h-5 w-5" />}
              className="min-w-40"
            >
              Try Again
            </Button>
          </div>

          {/* Additional Help Links */}
          <div className="mt-8 text-sm text-pm-muted">
            <p>
              Need help?{" "}
              <Link
                to="/contact"
                className="text-pm-primary hover:underline font-medium"
              >
                Contact Support{" "}
              </Link>
              or{" "}
              <Link
                to="/help"
                className="text-pm-primary hover:underline font-medium"
              >
                Visit Help Center{" "}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;
