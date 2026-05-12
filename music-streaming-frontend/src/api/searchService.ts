import apiClient from "./apiClient";
import type { Track } from "../types";

export interface SearchResponse {
  data: Track[];
}

export const searchService = {
  search: async (query: string) => {
    const res = await apiClient.get<SearchResponse>(`/search?q=${encodeURIComponent(query)}`);
    return res.data.data;
  },
};
