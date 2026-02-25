"use client";

import { useSyncAppState } from "../hooks/useSyncAppState";

export default function CrossTabAppStateSync() {
  useSyncAppState();

  return null;
}
