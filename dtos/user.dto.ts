

export interface UserRequest {
  username: string;
  email: string;
  phone?: string;
  password: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  statusMessage?: string;
  isOnline: boolean;
  lastSeen?: Date;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

