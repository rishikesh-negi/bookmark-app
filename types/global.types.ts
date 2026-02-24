import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Bookmark {
  title: string;
  url: string;
}

export interface FetchedBookmark extends Bookmark {
  id: number;
  created_at?: Timestamp;
  owner: string;
}
