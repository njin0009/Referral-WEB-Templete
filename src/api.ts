import type { Job, Profile } from "@/data/site-data";

export async function getProfile(): Promise<Profile> {
  const response = await fetch("/api/profile");
  if (!response.ok) {
    throw new Error("Unable to load profile");
  }
  return response.json();
}

export async function getJobs(): Promise<Job[]> {
  const response = await fetch("/api/jobs");
  if (!response.ok) {
    throw new Error("Unable to load Bupa jobs");
  }
  return response.json();
}

export async function submitMessage(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to submit message");
  }

  return response.json();
}
