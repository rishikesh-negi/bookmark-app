"use client";

import { useSyncBookmarksState } from "../hooks/useSyncBookmarksState";

export default function CrossTabBookmarksSync() {
  useSyncBookmarksState();
  return null;
}
