"use client";

import { useSyncBookmarksState } from "../hooks/useSyncBookmarksState";
import useSyncSessionState from "../hooks/useSyncSessionState";

export default function CrossTabAppStateSync() {
  useSyncSessionState();
  useSyncBookmarksState();

  return null;
}
