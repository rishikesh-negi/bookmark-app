import { type AuthChangeEvent } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { supabase } from "../_lib/supabase/client";

export function useSyncAppState() {
  const router = useRouter();
  const sessionEventRef = useRef<AuthChangeEvent>("INITIAL_SESSION");

  useEffect(() => {
    const bookmarksChannel = supabase.channel("bookmarks-channel");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        if (sessionEventRef.current !== event) {
          sessionEventRef.current = event;
          router.refresh();
        }
      }
    });

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
      subscription.unsubscribe();
    };
  }, [router]);
}
