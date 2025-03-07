export interface DarkModeState {
  theme: "light" | "dark";
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

