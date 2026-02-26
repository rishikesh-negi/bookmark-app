import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { supabase } from "../_lib/supabase/client";
import { useUserDataOnClient } from "./useUserDataOnClient";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useSyncBookmarksState() {
  const channelRef = useRef<RealtimeChannel>(null);
  const router = useRouter();
  const user = useUserDataOnClient();

  useEffect(() => {
    if (!user || channelRef.current) return;

    const bookmarksChannel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `owner=eq.${user?.id}`,
        },
        () => router.refresh(),
      )
      .subscribe();

    channelRef.current = bookmarksChannel;

    return () => {
      supabase.removeChannel(bookmarksChannel);
      channelRef.current = null;
    };
  }, [router, user]);
}
