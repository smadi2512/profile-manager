import { ReactElement } from "react";
import { Card } from "../ui";

interface StatsCardProps {
  icon: ReactElement;
  value: string | number;
  label: string;
}

export default function StatsCard({ icon, value, label }: StatsCardProps) {
  return (
    <Card key={label} className="text-center animate-pm-slide-up">
      <div className="h-8 w-8 text-pm-primary mx-auto mb-3">{icon}</div>
      <div className="text-2xl font-bold text-pm-foreground">{value}</div>
      <div className="text-sm text-pm-muted">{label}</div>
    </Card>
  );
}
