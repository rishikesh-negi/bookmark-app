import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type AppUser = {
  id?: number;
  userId?: number;
  fullName: string;
  email: string;
};

export interface Bookmark {
  title: string;
  url: string;
}

export interface FetchedBookmark extends Bookmark {
  id: number;
  created_at?: Timestamp;
  user: number;
}
