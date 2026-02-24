import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../_lib/supabase/client";

export function useSyncBookmarksState() {
  const router = useRouter();

  useEffect(() => {
    const bookmarksChannel = supabase.channel("bookmarks-channel");

    bookmarksChannel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        () => router.refresh(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookmarksChannel);
    };
  }, [router]);
}
