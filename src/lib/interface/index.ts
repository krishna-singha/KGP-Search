export interface DarkModeState {
  theme: "light" | "dark" | "anonymous";
}

export interface FilterState {
  value: string;
}

export interface AnonymousState {
  anonymous: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

