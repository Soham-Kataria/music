import apiClient from "./apiClient";
import type { User } from "../types";

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: any) => {
    const res = await apiClient.post<AuthResponse>("/auth/login", credentials);
    return res.data;
  },

  register: async (data: any) => {
    const res = await apiClient.post<AuthResponse>("/auth/register", data);
    return res.data;
  },

  updateProfile: async (userId: string, data: any) => {
    const res = await apiClient.put<User>(`/users/${userId}`, data);
    return res.data;
  },

  deleteAccount: async (userId: string) => {
    await apiClient.delete(`/users/${userId}`);
  },
};
