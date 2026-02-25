import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase/client";

export function useUserDataOnClient() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserData(user);
    });
  }, []);

  return userData;
}
