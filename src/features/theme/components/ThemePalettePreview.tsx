import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import { memo } from "react";

function ThemePalettePreview() {
  const { theme } = useTheme();

  const colorPalette = [
    {
      name: "Primary",
      light: {
        bg: "bg-pm-primary",
        text: "text-pm-primary-foreground",
        hex: "#0e7490",
      },
      dark: {
        bg: "bg-pm-primary",
        text: "text-pm-primary-foreground",
        hex: "#0f766e",
      },
    },
    {
      name: "Secondary",
      light: { bg: "bg-pm-secondary", text: "text-white", hex: "#7c3aed" },
      dark: { bg: "bg-pm-secondary", text: "text-white", hex: "#a855f7" },
    },
    {
      name: "Accent",
      light: { bg: "bg-pm-accent", text: "text-white", hex: "#06b6d4" },
      dark: { bg: "bg-pm-accent", text: "text-white", hex: "#22d3ee" },
    },
    {
      name: "Background",
      light: {
        bg: "bg-pm-background",
        text: "text-pm-foreground",
        hex: "#ffffff",
      },
      dark: {
        bg: "bg-pm-background",
        text: "text-pm-foreground",
        hex: "#0f172a",
      },
    },
    {
      name: "Foreground",
      light: {
        bg: "bg-pm-foreground",
        text: "text-pm-background",
        hex: "#1f2937",
      },
      dark: {
        bg: "bg-pm-foreground",
        text: "text-pm-background",
        hex: "#f8fafc",
      },
    },
    {
      name: "Card",
      light: { bg: "bg-pm-card", text: "text-pm-foreground", hex: "#f9fafb" },
      dark: { bg: "bg-pm-card", text: "text-pm-foreground", hex: "#1e293b" },
    },
    {
      name: "Muted",
      light: { bg: "bg-pm-muted", text: "text-white", hex: "#6b7280" },
      dark: { bg: "bg-pm-muted", text: "text-white", hex: "#94a3b8" },
    },
    {
      name: "Border",
      light: { bg: "bg-pm-border", text: "text-pm-foreground", hex: "#e5e7eb" },
      dark: { bg: "bg-pm-border", text: "text-pm-foreground", hex: "#334155" },
    },
  ];

  const statusColors = [
    {
      name: "Success",
      bg: "bg-pm-success",
      text: "text-white",
      hex: "#059669",
    },
    {
      name: "Warning",
      bg: "bg-pm-warning",
      text: "text-white",
      hex: "#d97706",
    },
    { name: "Error", bg: "bg-pm-error", text: "text-white", hex: "#dc2626" },
    { name: "Info", bg: "bg-pm-info", text: "text-white", hex: "#0ea5e9" },
  ];

  return (
    <div className="min-h-screen bg-pm-background text-pm-foreground p-6 transition-colors duration-300">
      <div className="container-pm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Profile Manager Theme Preview
            </h1>
            <p className="text-muted mt-2">
              Preview Teal colors for your profile management application
            </p>
          </div>

          {/* Toggle Theme */}
          <ThemeToggle />
        </div>

        {/* Current Theme Indicator */}
        <div className="card p-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${
                theme === "light" ? "bg-pm-primary" : "bg-pm-accent"
              }`}
            ></div>
            <span className="font-medium">
              Current Theme: {theme === "light" ? "Light" : "Dark"}
            </span>
          </div>
        </div>

        {/* Main Color Palette */}
        <section className="profile-section">
          <h2 className="text-2xl font-bold mb-6">Primary Colors</h2>
          <div className="profile-grid">
            {colorPalette.map((color) => {
              const currentColor = theme === "light" ? color.light : color.dark;
              return (
                <ColorCard
                  key={color.name}
                  name={color.name}
                  bgClass={currentColor.bg}
                  textClass={currentColor.text}
                  hexValue={currentColor.hex}
                />
              );
            })}
          </div>
        </section>

        {/* Status Colors */}
        <section className="profile-section mt-12">
          <h2 className="text-2xl font-bold mb-6">Status Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusColors.map((color) => (
              <ColorCard
                key={color.name}
                name={color.name}
                bgClass={color.bg}
                textClass={color.text}
                hexValue={color.hex}
              />
            ))}
          </div>
        </section>

        {/* Component Previews */}
        <section className="profile-section mt-12">
          <h2 className="text-2xl font-bold mb-6">Component Previews</h2>

          {/* Buttons Preview */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary Button</button>
              <button className="btn btn-outline">Outline Button</button>
              <button className="btn btn-ghost">Ghost Button</button>
            </div>
          </div>

          {/* Cards Preview */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4">
                <h4 className="font-semibold mb-2">Regular Card</h4>
                <p className="text-muted text-sm">
                  This is a regular card using .card class
                </p>
              </div>
              <div className="card-hover p-4">
                <h4 className="font-semibold mb-2">Interactive Card</h4>
                <p className="text-muted text-sm">
                  This is an interactive card using .card-hover class
                </p>
              </div>
            </div>
          </div>

          {/* Form Elements Preview */}
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pm-foreground mb-2">
                  Input Field
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter text here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pm-foreground mb-2">
                  Field with Error
                </label>
                <input
                  type="text"
                  className="input input-error"
                  placeholder="This field has an error"
                />
              </div>
            </div>
          </div>

          {/* Badges Preview */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Status Badges</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-success">Success</span>
              <span className="badge badge-warning">Warning</span>
              <span className="badge badge-error">Error</span>
              <span className="badge badge-info">Info</span>
            </div>
          </div>
        </section>

        {/* Profile Manager Mockup */}
        <section className="profile-section mt-12">
          <h2 className="text-2xl font-bold mb-6">Profile Manager Mockup</h2>
          <ProfileManagerMockup />
        </section>
      </div>
    </div>
  );
}

// Color Card Component
const ColorCard = ({
  name,
  bgClass,
  textClass,
  hexValue,
}: {
  name: string;
  bgClass: string;
  textClass: string;
  hexValue: string;
}) => (
  <div className="card overflow-hidden animate-pm-fade-in">
    <div className={`h-20 ${bgClass} flex items-center justify-center`}>
      <span className={`font-medium ${textClass}`}>{name}</span>
    </div>
    <div className="p-3 text-xs bg-pm-card">
      <div className="font-mono text-pm-foreground">{bgClass}</div>
      <div className="font-mono text-muted mt-1">{hexValue}</div>
    </div>
  </div>
);

// Profile Manager Mockup Component
const ProfileManagerMockup = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Profiles</h3>
        <button className="btn btn-primary">Add Profile</button>
      </div>

      <div className="space-y-4">
        {["Personal", "Work", "Social Media"].map((profile, index) => (
          <div
            key={index}
            className="card-hover p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pm-primary flex items-center justify-center">
                <span className="text-pm-primary-foreground font-bold">
                  {profile.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-pm-foreground">{profile}</h4>
                <p className="text-muted text-sm">Last active: 2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline text-sm">Edit</button>
              <button className="btn btn-primary text-sm">Activate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ThemePalettePreview);
