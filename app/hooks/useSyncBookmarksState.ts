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
        (payload) => {
          console.log(payload.eventType);
          router.refresh();
        },
      )
      .subscribe((status, err) => {
        if (err) console.error(err);
        console.log("Supabase realtime WS status: ", status);
      });

    return () => {
      supabase.removeChannel(bookmarksChannel);
    };
  }, [router]);
}
