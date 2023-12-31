export interface MusicTrack {
  id: number;
  title: string;
  duration: number;
  artistName: string;
  artistId: number;
  likeStatus: boolean;
}

export interface Profile {
  username: string;
  email: string;
  likeBadge: boolean;
}