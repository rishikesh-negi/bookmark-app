import { type AuthChangeEvent } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { supabase } from "@/app/_lib/supabase/client";

export default function useSyncSessionState() {
  const router = useRouter();
  const sessionEventRef = useRef<AuthChangeEvent>("INITIAL_SESSION");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        if (sessionEventRef.current !== event) {
          if (!document.hasFocus()) location.reload();
          sessionEventRef.current = event;
          router.refresh();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);
}
