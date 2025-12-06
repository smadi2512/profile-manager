import { ReactNode } from "react";
import { Grid } from "../ui";

interface StatsGridProps {
  children: ReactNode;
}

export default function StatsGrid({ children }: StatsGridProps) {
  return (
    <>
      <Grid className="stats-grid" maxWidth="4xl">
        {children}
      </Grid>
    </>
  );
}
