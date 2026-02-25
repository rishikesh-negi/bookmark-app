import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../_lib/supabase/client";
import { useUserDataOnClient } from "./useUserDataOnClient";

export function useSyncBookmarksState() {
  const router = useRouter();
  const user = useUserDataOnClient();

  useEffect(() => {
    if (!user) return;
    const bookmarksChannel = supabase.channel("bookmarks-channel");

    bookmarksChannel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `owner=eq.${user.id}`,
        },
        () => router.refresh(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookmarksChannel);
    };
  }, [router, user]);
}
