export type profileStatus = "idle" | "active" | "inactive";
export type Role = "admin" | "editor" | "viewer" | "user";

export interface Profile {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  status?: profileStatus;
  role: Role;
  interests: string[];
}

//----------------------------------------------------

export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "user", label: "User" },
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "idle", label: "Idle" },
];
