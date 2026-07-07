export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  date: string;
  category?: string;
  source?: "youtube" | "vimeo" | "other";
}

/** Delivered talks are speaking topics only — not listed as browseable site videos. */
export const videos: VideoItem[] = [];
