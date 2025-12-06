import { useMemo } from "react";
import { useProfileContext } from "@/features/profile";
import {
  StatsCard,
  StatsGrid,
  PageHeader,
  Grid,
  FeatureItem,
  Card,
} from "@/shared/components";
import {
  PlusIcon,
  UsersIcon,
  UserGroupIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { state } = useProfileContext();
  //Some Stats
  const profilesCount = useMemo(
    () => state.profiles.length,
    [state.profiles.length]
  );
  const activeCount = useMemo(
    () => state.profiles.filter((p) => p.status === "active").length,
    [state.profiles]
  );
  const adminAccounts = useMemo(
    () => state.profiles.filter((p) => p.role === "admin").length,
    [state.profiles]
  );

  return (
    <div className="container-pm py-8">
      <PageHeader
        icon={<UsersIcon className="h-10 w-10 text-white" />}
        title="Profile Manager"
        subtitle="Efficiently manage and organize all your user profiles in one place. Perfect for work, personal, and social contexts."
        size="2xl"
      >
        {/* Stats Cards */}
        <StatsGrid>
          <StatsCard
            icon={<UserGroupIcon />}
            value={profilesCount}
            label="Total Profiles"
          />
          <StatsCard
            icon={<CheckBadgeIcon />}
            value={activeCount}
            label="Active Profiles"
          />
          <StatsCard
            icon={<UsersIcon />}
            value={adminAccounts}
            label="Administrators"
          />
        </StatsGrid>
        {/* CTA Button */}
        <div className="space-y-4">
          <Link
            to="/profiles"
            className="btn btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            <PlusIcon className="h-6 w-6" />
            Get Started - Manage Profiles
          </Link>

          <p className="text-sm text-pm-muted">
            Simple, fast, and completely free to use
          </p>
        </div>
      </PageHeader>

      {/* Features Section */}
      <section className="mt-16 max-w-3xl mx-auto animate-pm-fade-in">
        <Card padding="lg">
          <h2 className="text-2xl font-bold text-pm-foreground mb-6 text-center">
            Everything You Need
          </h2>
          <Grid columns={2} gap="sm" maxWidth="full">
            <FeatureItem id="multiple-profiles">
              Create multiple profile types
            </FeatureItem>
            <FeatureItem id="quick-switch">
              Quick switch between profiles
            </FeatureItem>
            <FeatureItem id="light-dark">Dark/Light mode support</FeatureItem>
            <FeatureItem id="export-data">Export profile data</FeatureItem>
          </Grid>
          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-pm-border">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/profiles/addProfile"
                className="btn btn-outline flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Create New Profile
              </Link>

              <Link
                to="/profiles"
                className="btn btn-ghost flex items-center gap-2"
              >
                <UsersIcon className="h-4 w-4" />
                View All Profiles
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Trust section */}
      <div className="text-center mt-12 animate-pm-fade-in">
        <div className="inline-flex items-center gap-2 text-sm text-pm-muted bg-pm-card px-4 py-2 rounded-full border border-pm-border">
          <div className="w-2 h-2 bg-pm-success rounded-full animate-pm-pulse"></div>
          Trusted by 1,000+ Users • 99.9% Uptime
        </div>
      </div>
    </div>
  );
}
