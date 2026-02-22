"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getBroadcastChannel } from "../_lib/broadcast";
import { useSyncBookmarks } from "../hooks/useSyncBookmarks";

export default function CrossTabSessionSync() {
  const router = useRouter();
  const { data: session } = useSession();
  useSyncBookmarks();

  useEffect(() => {
    const channel = getBroadcastChannel();
    if (!channel) return;

    channel.onmessage = (e) => {
      if (
        e.data.sessionStatus === "authenticated" ||
        e.data.sessionStatus === "unauthenticated"
      )
        router.refresh();
    };
  }, [router, session]);

  return null;
}
