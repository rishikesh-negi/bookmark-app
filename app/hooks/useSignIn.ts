import { useState } from "react";
import { supabase } from "../_lib/supabase/client";

export function useSignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function signInAction() {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return { isLoading, signInAction };
}
