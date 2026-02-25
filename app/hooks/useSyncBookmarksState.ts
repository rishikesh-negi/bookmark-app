import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../_lib/supabase/client";
import { useUserDataOnClient } from "./useUserDataOnClient";

export function useSyncBookmarksState() {
  const router = useRouter();
  const user = useUserDataOnClient();
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

  useEffect(() => {
    return () => {
      supabase.removeChannel(bookmarksChannel);
    };
  }, [bookmarksChannel]);
}
