import { useEffect } from "react";
import { supabase } from "../_lib/supabase";
import { useRouter } from "next/navigation";

export function useSyncBookmarks() {
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
