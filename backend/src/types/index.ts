export interface AuthTokenPayload {
  id: string;
  username: string;
}

export interface SongDTO {
  id: string;
  title: string;
  artist: string;
  preview: string | null;
  artwork: string | null;
  album: string | null;
  genre: string | null;
  releaseDate: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  total: number;
  data: T[];
}

export interface PublicUserDTO {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  dateOfBirth?: Date;
  location?: string;
}

export interface AuthResponse {
  token: string;
  user: PublicUserDTO;
}
