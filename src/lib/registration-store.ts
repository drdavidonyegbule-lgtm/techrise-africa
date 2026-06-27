// Client-side session store for the multi-step enrollment flow.
// Persists the user/registration ids between /register and /payment.

export type StoredRegistration = {
  userId: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  track: "juniors" | "seniors";
};

const KEY = "techrise.registration";

export function saveRegistration(data: StoredRegistration) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function loadRegistration(): StoredRegistration | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredRegistration;
  } catch {
    return null;
  }
}

export function clearRegistration() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
}