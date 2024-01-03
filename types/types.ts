export interface MusicTrack {
  id: number;
  title: string;
  duration: number;
  artistName: string;
  artistId: number;
  likeStatus: boolean;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  likeBadge: boolean;
}

export interface MessageRequest {
  chatId: number | undefined;
  senderId: number | undefined;
  content: string;
}

export interface MessageResponse {
  id: number;
  content: string;
  senderId: number;
  senderUsername: string;
  chatId: number;
  createdAt: string;
  likeBadge: boolean;
}