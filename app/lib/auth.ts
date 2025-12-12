import { User } from "./types";

export interface AuthToken {
  access_token: string;
  token_type: string;
  user_id: number;
  role: string;
}

export function saveAuthToken(token: AuthToken) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token.access_token);
    localStorage.setItem("user_id", token.user_id.toString());
    localStorage.setItem("role", token.role);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function getUserRole(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role");
  }
  return null;
}

export function clearAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

export function hasRole(allowedRoles: string[]): boolean {
  const userRole = getUserRole();
  return userRole ? allowedRoles.includes(userRole) : false;
}
