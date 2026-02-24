import { useTransition } from "react";
import { supabase } from "../_lib/supabase/client";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function signOutAction() {
    startTransition(async () => {
      await supabase.auth.signOut();
      router.push("/");
    });
  }

  return { isPending, signOutAction };
}
