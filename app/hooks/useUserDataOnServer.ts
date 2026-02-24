import { use } from "react";
import { supabaseServerClient } from "../_lib/supabase/server";

export function useUserDataOnServer() {
  const supabase = use(supabaseServerClient());
  const {
    data: { user },
    error,
  } = use(supabase.auth.getUser());

  if (error) return null;

  return user;
}
